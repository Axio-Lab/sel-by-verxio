import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
import { ACTIONS_CORS_HEADERS, ActionGetResponse } from "@solana/actions";
const {
    getProductById
} = new ProductService();

export default class ActionController {
    async getAction(req: Request, res: Response) {
        try {
            // const productId = req.originalUrl.split("/").pop;
            const product = await getProductById("6683d1f3990c844d4b56fa06");

            const payload: ActionGetResponse = {
                icon: product?.image as unknown as string,
                label: `Buy ${product?.name}`,
                description: `${product?.description}`,
                title: `Buy ${product?.name}`,
            }

            res.set(ACTIONS_CORS_HEADERS);

            res.header(ACTIONS_CORS_HEADERS);

            return res.send({ payload })

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


        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error: ${error.message}`
                })
        }
    }
}