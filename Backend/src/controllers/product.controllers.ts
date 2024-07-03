import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
const {
    create,
    getProductById
} = new ProductService();

export default class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const product = await create({ ...req.body, userId: req.params.userId });

            return res.status(200)
                .send({
                    success: true,
                    message: "Product created successfully",
                    product,
                    blink: `/api/v1/action/${product._id}`
                })
        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error occured while ctreating product: ${error.message}`
                })
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const product = await getProductById(req.params.id);

            if(!product) {
                return res.status(404)
                .send({
                    success: false,
                    message: "Product with the Id not found"
                })
            }
            return res.status(200)
                .send({
                    success: true,
                    message: "Product fetched successfully",
                    product,
                    blink: `/api/v1/action/${product._id}`
                })
        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error occured while fetching product: ${error.message}`
                })
        }
    }
}