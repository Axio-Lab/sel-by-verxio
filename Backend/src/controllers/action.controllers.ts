import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse } from "@solana/actions";
import {
    Authorized,
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    StakeProgram,
    SystemProgram,
    Transaction,
  } from "@solana/web3.js";

const {
    getProductById
} = new ProductService();

const DEFAULT_SOL_ADDRESS: PublicKey = new PublicKey(
    "F6XAa9hcAp9D9soZAk4ea4wdkmX4CmrMEwGg33xD1Bs9", // SEL wallet
  );

const SELLER_SOL_ADDRESS: PublicKey = new PublicKey(
    // This should be the wallet of the user that created the product
    "nick6zJc6HpW3kfBm4xS2dmbuVRyb5F3AnUvj5ymzR5", // seller's wallet
  );

export default class ActionController {
    async getAction(req: Request, res: Response) {
        try {
            const productId = req.originalUrl.split("/").pop();
            const product = await getProductById(productId as unknown as string);

            const payload: ActionGetResponse = {
                icon: product?.image as unknown as string,
                label: `Buy Now (${product?.name} SOL)`,
                description: `${product?.description}`,
                title: `${product?.name}`,
            }

            res.set(ACTIONS_CORS_HEADERS);

            return res.json(payload)

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
            const requestUrl = new URL(req.url);
            const { amount, toPubkey } = validatedQueryParams(requestUrl);

            const body: ActionPostRequest = await req.json();

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
            if (amount * LAMPORTS_PER_SOL < minimumBalance) {
              throw `account may not be rent exempt: ${toPubkey.toBase58()}`;
            }

            const transaction = new Transaction();

            // Transfer 90% of the funds to the seller's address
            transaction.add(
              SystemProgram.transfer({
                fromPubkey: account,
                toPubkey: SELLER_SOL_ADDRESS,
                lamports: Math.floor(amount * LAMPORTS_PER_SOL * 0.9),
              }),
            );

            // Transfer 10% of the funds to the default SOL address
            transaction.add(
              SystemProgram.transfer({
                fromPubkey: account,
                toPubkey: DEFAULT_SOL_ADDRESS,
                lamports: Math.floor(amount * LAMPORTS_PER_SOL * 0.1),
              }),
            );

            // set the end user as the fee payer
            transaction.feePayer = account;

            transaction.recentBlockhash = (
              await connection.getLatestBlockhash()
            ).blockhash;

            const payload: ActionPostResponse = {
              fields: {
                transaction,
                message: `Send ${amount} SOL (90% to seller, 10% to default SOL address)`,
              },
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

function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
  let amount: number = 0; //This should be the price of the product

  try {
    if (requestUrl.searchParams.get("to")) {
      toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: to";
  }

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }

    if (amount <= 0) throw "amount is too small";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return { amount, toPubkey };
}