import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse } from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const {
  getProductByQuery
} = new ProductService();

const DEFAULT_SOL_ADDRESS: PublicKey = new PublicKey(
  "F6XAa9hcAp9D9soZAk4ea4wdkmX4CmrMEwGg33xD1Bs9", // SEL wallet
);

export default class ActionController {
  async getAction(req: Request, res: Response) {
    try {

      const baseHref = new URL(
        req.originalUrl
      ).toString();

      const productName = req.originalUrl.split("/").pop();
      const product = await getProductByQuery({
        name: productName
      });

      let payload: ActionGetResponse;
      if (product?.payAnyPrice) {
        payload = {
          title: `${product?.name}`,
          icon: product?.image as unknown as string,
          description: `${product?.description}`,
          label: `Buy Now (${product?.price} SOL)`,
          links: {
            actions: [
              {
                label: `Buy Now (${product?.price} SOL)`,
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
          title: `${product?.name}`
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
      const productName = req.originalUrl.split("/").pop();
      const product = await getProductByQuery({
        name: productName
      });

      const body: ActionPostRequest = req.body;

      // validate the client provided input
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
        process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
      );

      // ensure the receiving account will be rent exempt
      const minimumBalance = await connection.getMinimumBalanceForRentExemption(
        0, // note: simple accounts that just store native SOL have `0` bytes of data
      );

      let price: number;
      if (product?.payAnyPrice) {
        if (req.query.amount) {
          price = parseFloat(req.query.amount as unknown as any);
        } else {
          throw "Please provide an amount!"
        }
        if (price <= 0) throw "amount is too small";
      } else {
        price = product?.price!;
      }

      if (price * LAMPORTS_PER_SOL < minimumBalance) {
        throw `account may not be rent exempt: ${DEFAULT_SOL_ADDRESS.toBase58()}`;
      }

      const sellerPubkey: PublicKey = new PublicKey(
        product?.userId as string
      );

      const transaction = new Transaction();

      // Transfer 90% of the funds to the seller's address
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: account,
          toPubkey: sellerPubkey,
          lamports: Math.floor(price * LAMPORTS_PER_SOL * 0.9),
        }),
      );

      // Transfer 10% of the funds to the default SOL address
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: account,
          toPubkey: DEFAULT_SOL_ADDRESS,
          lamports: Math.floor(price * LAMPORTS_PER_SOL * 0.1),
        }),
      );

      // set the end user as the fee payer
      transaction.feePayer = account;

      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;


      const payload: ActionPostResponse = {
        transaction: transaction.serialize({
          requireAllSignatures: false,
          verifySignatures: true,
        }).toString('base64'),
        message: `You've successfully purchased ${product?.name} for ${price} SOL 🎊`,
      };

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
}