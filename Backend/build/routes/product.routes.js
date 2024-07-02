"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controllers_1 = __importDefault(require("../controllers/product.controllers"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const product_schema_1 = require("../schemas/product.schema");
const validateEmptyString_middleware_1 = __importDefault(require("../middlewares/validateEmptyString.middleware"));
const router = (0, express_1.Router)();
const { createProduct, getProductById, } = new product_controllers_1.default();
//create a product
router.post("/:userId", validateEmptyString_middleware_1.default, (0, validate_middleware_1.default)(product_schema_1.createProductSchema), createProduct);
//get product by Id
router.get("/get/:id", getProductById);
exports.default = router;
