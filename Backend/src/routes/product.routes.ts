import { Router } from "express";
import ProductController from '../controllers/product.controllers';
import validate from "../middlewares/validate.middleware";
import { createProductSchema } from "../schemas/product.schema";
import validateEmptyString from "../middlewares/validateEmptyString.middleware";
const router = Router();
const {
    createProduct,
    getProductById,
} = new ProductController();

//create a product
router.post("/:userId", validate(createProductSchema), createProduct);

//get product by Id
router.get("/:id", getProductById);

export default router;