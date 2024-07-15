import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
import TransactionService from "../services/transaction.service";
import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse } from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  TransactionInstruction,
  SystemProgram,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { Helius } from "helius-sdk";

const {
  getProductByQuery
} = new ProductService();

const {
  create
} = new TransactionService();

const DEFAULT_SOL_ADDRESS: PublicKey = new PublicKey(
  "F6XAa9hcAp9D9soZAk4ea4wdkmX4CmrMEwGg33xD1Bs9"
);

const helius = new Helius("d7aa98e6-4f1e-420d-be26-231d5a586b93");

export default class ActionController {
  async getAction(req: Request, res: Response) {
    try {
      const baseHref = new URL(
        `${req.protocol}://${req.get('host')}${req.originalUrl}`
      ).toString();

      const productName = decodeURIComponent(req.params.name);
      const product = await getProductByQuery({
        name: productName
      });

      if (!product) {
        return res.status(404).json("Invalid product name")
      }
      const disabled = (product?.quantity! <= 0) ? true : false;

      let payload: ActionGetResponse;
      if (product?.payAnyPrice) {
        payload = {
          title: `${product?.name}`,
          icon: product?.image as unknown as string,
          description: `${product?.description}`,
          label: `Buy Now`,
          disabled,
          links: {
            actions: [
              {
                label: `Buy Now`,
                href: `${baseHref}?amount={amount}`,
                parameters: [
                  {
                    name: "amount",
                    label: "Enter a custom USD amount"
                  }
                ]
              }
            ]
          }
        }
      } else {
        payload = {
          icon: product?.image as unknown as string,
          label: `Buy Now (${product?.price} SOL)`,
          description: `${product?.description}`,
          title: `${product?.name}`,
          disabled
        }
      }

      res.set(ACTIONS_CORS_HEADERS);

      return res.json(payload);

    } catch (error: any) {
      return res.status(500)
        .send({
          success: false,
          message: `Error: ${error.message}`
        })
    }
  }

  async postAction(req: Request, res: Response) {
    try {
      const productName = decodeURIComponent(req.params.name);
      const product = await getProductByQuery({
        name: productName
      });

      if (!product) {
        return res.status(404).json("Invalid product name")
      }

      const body: ActionPostRequest = req.body;
      
      // Validate the client-provided input
      let account: PublicKey;
      try {
        account = new PublicKey(body.account);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'Invalid "account" provided',
        });
      }

      const connection = new Connection(
        "https://devnet.helius-rpc.com/?api-key=d7aa98e6-4f1e-420d-be26-231d5a586b93"
      );

      // Ensure the receiving account will be rent exempt
      const minimumBalance = await connection.getMinimumBalanceForRentExemption(
        0 // Note: simple accounts that just store native SOL have `0` bytes of data
      );

      let price;
      if (product?.payAnyPrice) {
        price = parseFloat(req.query.amount as any);
        if (price <= 0) throw new Error("amount is too small");
      } else {
        price = product?.price!;
      }

      if (price * LAMPORTS_PER_SOL < minimumBalance) {
        throw `account may not be rent exempt: ${DEFAULT_SOL_ADDRESS.toBase58()}`;
      }

      const sellerPubkey: PublicKey = new PublicKey(
        product?.userId as string
      );

      const instructions: TransactionInstruction[] = [
      // Transfer 90% of the funds to the seller's address
        SystemProgram.transfer({
          fromPubkey: account,
          toPubkey: sellerPubkey,
          lamports: Math.floor(price * LAMPORTS_PER_SOL * 0.9),
        }),
      // Transfer 10% of the funds to the default SOL address
        SystemProgram.transfer({
          fromPubkey: account,
          toPubkey: DEFAULT_SOL_ADDRESS,
          lamports: Math.floor(price * LAMPORTS_PER_SOL * 0.1),
        }),

      ];
      
      const transaction = new Transaction().add(...instructions);
      // Set the end user as the fee payer
      transaction.feePayer = account;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      const signedTransaction = transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: true,
      })

      // After sending the transaction and getting the signature
      const signature = await connection.sendRawTransaction(signedTransaction);

      console.log("Transaction sent with signature:", signature);

      // Confirm the transaction using the new method
      const latestBlockHash = await connection.getLatestBlockhash();

      const confirmationStrategy = {
        signature: signature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      };

    let payload;
      try {
        const confirmation = await connection.confirmTransaction(confirmationStrategy);
        if (confirmation){
          const payload: ActionPostResponse = {
            transaction: signedTransaction.toString('base64'),
            message: `You've successfully purchased ${product?.name} for ${price} SOL 🎊`,
          };
    
          console.log("Payload:", payload)

          // Update product details
          product.quantity = product.quantity - 1;
          product.sales = product.sales + 1;
          product.revenue = product.revenue + price;
      
          await product.save();
      
          // Create transaction record
          await create({
            buyerId: account.toString(), 
            productId: product._id,
            price: product.price
          });

        }
      } catch (error) {
        console.error("Error confirming transaction:", error);
      }

      res.set(ACTIONS_CORS_HEADERS);
      return res.status(200).json(payload);

    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  }

}