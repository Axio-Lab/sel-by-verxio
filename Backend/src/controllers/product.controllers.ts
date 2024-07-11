import { Request, Response } from "express";
import ProductService from "../services/product.servicee";
const {
    create,
    getProductById,
    getProductByQuery,
    getProducts
} = new ProductService();
const deployedLink = "https://sel-by-verxio.onrender.com";
const devnetBlink = "https://dial.to/devnet?action=solana-action:";

export default class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const foundProduct = await getProductByQuery({ name: req.body.name });
            if (foundProduct) {
                return res.status(409)
                    .send({
                        success: false,
                        message: "Product name already exists"
                    })
            }
            const product = await create({ ...req.body, userId: req.params.userId });

            return res.status(200)
                .send({
                    success: true,
                    message: "Product created successfully",
                    product,
                    blink: `${deployedLink}/api/v1/action/${encodeURIComponent(product.name)}`
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

            if (!product) {
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
                    blink: `${deployedLink}/api/v1/action/${encodeURIComponent(product.name)}`
                })
        } catch (error: any) {
            return res.status(500)
                .send({
                    success: false,
                    message: `Error occured while fetching product: ${error.message}`
                })
        }
    }

    async getUserProduct(req: Request, res: Response) {
        try {
            const product = await getProducts({ userId: req.params.userId });

            if (product.length === 0) {
                return res.status(404)
                    .send({
                        success: false,
                        message: "Product with the userId not found"
                    })
            }

            const products = product.map((one) => {
                return {
                    ...one,
                    blink: `${deployedLink}/api/v1/action/${encodeURIComponent(one.name)}`
                }
            })
            return res.status(200)
                .send({
                    success: true,
                    message: "Products fetched successfully",
                    products
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