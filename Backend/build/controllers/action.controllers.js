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
const actions_1 = require("@solana/actions");
const { getProductById } = new product_servicee_1.default();
class ActionController {
    getAction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.originalUrl.split("/").pop;
                const product = yield getProductById(productId);
                const payload = {
                    icon: product === null || product === void 0 ? void 0 : product.image,
                    label: `Buy ${product === null || product === void 0 ? void 0 : product.name}`,
                    description: `${product === null || product === void 0 ? void 0 : product.description}`,
                    title: `Buy ${product === null || product === void 0 ? void 0 : product.name}`,
                };
                res.set(actions_1.ACTIONS_CORS_HEADERS);
                res.header(actions_1.ACTIONS_CORS_HEADERS);
                return res.send({ payload });
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error: ${error.message}`
                });
            }
        });
    }
    postAction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return res.status(500)
                    .send({
                    success: false,
                    message: `Error: ${error.message}`
                });
            }
        });
    }
}
exports.default = ActionController;
