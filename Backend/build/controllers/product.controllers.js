"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_servicee_1 = __importDefault(require("../services/product.servicee"));
const { create, getProductById, getProductByQuery, getProducts } = new product_servicee_1.default();
const deployedLink = "https://sel-by-verxio.onrender.com";
const devnetBlink = "https://dial.to/devnet?action=solana-action:";
class ProductController {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundProduct = yield getProductByQuery({ name: req.body.name });
                if (foundProduct) {
                    return res.status(409)
                        .send({
                        success: false,
                        message: "Product name already exists"
                    });
                }
                const unlimited = req.body.quantity === 0 ? true : false;
                const product = yield create(Object.assign(Object.assign({}, req.body), { userId: req.params.userId, unlimited }));
                return res.status(200)
                    .send({
                    success: true,
                    message: "Product created successfully",
                    product,
                    blink: `${deployedLink}/api/v1/action/${encodeURIComponent(product.name)}`
                });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error occured while ctreating product: ${error.message}`
                });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield getProductById(req.params.id);
                if (!product) {
                    return res.status(404)
                        .send({
                        success: false,
                        message: "Product with the Id not found"
                    });
                }
                return res.status(200)
                    .send({
                    success: true,
                    message: "Product fetched successfully",
                    product,
                    blink: `${deployedLink}/api/v1/action/${encodeURIComponent(product.name)}`
                });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error occured while fetching product: ${error.message}`
                });
            }
        });
    }
    getUserProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield getProducts({ userId: req.params.userId });
                if (product.length === 0) {
                    return res.status(404)
                        .send({
                        success: false,
                        message: "Product with the userId not found"
                    });
                }
                const products = product.map((one) => {
                    const plainOne = one.toObject();
                    const quantity = one.unlimited ? "Unlimited" : (one.quantity === 0) ? "Sold Out" : one.quantity;
                    return Object.assign(Object.assign({}, plainOne), { quantity, blink: `${deployedLink}/api/v1/action/${encodeURIComponent(plainOne.name)}` });
                });
                return res.status(200)
                    .send({
                    success: true,
                    message: "Products fetched successfully",
                    products
                });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error occured while fetching product: ${error.message}`
                });
            }
        });
    }
}
exports.default = ProductController;
