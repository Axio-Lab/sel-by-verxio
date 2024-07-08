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
const web3_js_1 = require("@solana/web3.js");
const { getProductByQuery } = new product_servicee_1.default();
const DEFAULT_SOL_ADDRESS = new web3_js_1.PublicKey("F6XAa9hcAp9D9soZAk4ea4wdkmX4CmrMEwGg33xD1Bs9");
class ActionController {
    getAction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseHref = new URL(req.originalUrl).toString();
                const productName = req.originalUrl.split("/").pop();
                const product = yield getProductByQuery({
                    name: productName
                });
                let payload;
                if (product === null || product === void 0 ? void 0 : product.payAnyPrice) {
                    payload = {
                        title: `${product === null || product === void 0 ? void 0 : product.name}`,
                        icon: product === null || product === void 0 ? void 0 : product.image,
                        description: `${product === null || product === void 0 ? void 0 : product.description}`,
                        label: `Buy Now (${product === null || product === void 0 ? void 0 : product.price} SOL)`,
                        links: {
                            actions: [
                                {
                                    label: `Buy Now (${product === null || product === void 0 ? void 0 : product.price} SOL)`,
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
                    };
                }
                else {
                    payload = {
                        icon: product === null || product === void 0 ? void 0 : product.image,
                        label: `Buy Now (${product === null || product === void 0 ? void 0 : product.price} SOL)`,
                        description: `${product === null || product === void 0 ? void 0 : product.description}`,
                        title: `${product === null || product === void 0 ? void 0 : product.name}`
                    };
                }
                res.set(actions_1.ACTIONS_CORS_HEADERS);
                return res.json(payload);
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
                const productName = req.originalUrl.split("/").pop();
                const product = yield getProductByQuery({
                    name: productName
                });
                const body = req.body;
                // validate the client provided input
                let account;
                try {
                    account = new web3_js_1.PublicKey(body.account);
                }
                catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid "account" provided',
                    });
                }
                const connection = new web3_js_1.Connection(process.env.SOLANA_RPC || (0, web3_js_1.clusterApiUrl)("devnet"));
                // ensure the receiving account will be rent exempt
                const minimumBalance = yield connection.getMinimumBalanceForRentExemption(0);
                let price;
                if (product === null || product === void 0 ? void 0 : product.payAnyPrice) {
                    if (req.query.amount) {
                        price = parseFloat(req.query.amount);
                    }
                    else {
                        throw "Please provide an amount!";
                    }
                    if (price <= 0)
                        throw "amount is too small";
                }
                else {
                    price = product === null || product === void 0 ? void 0 : product.price;
                }
                if (price * web3_js_1.LAMPORTS_PER_SOL < minimumBalance) {
                    throw `account may not be rent exempt: ${DEFAULT_SOL_ADDRESS.toBase58()}`;
                }
                const sellerPubkey = new web3_js_1.PublicKey(product === null || product === void 0 ? void 0 : product.userId);
                const transaction = new web3_js_1.Transaction();
                // Transfer 90% of the funds to the seller's address
                transaction.add(web3_js_1.SystemProgram.transfer({
                    fromPubkey: account,
                    toPubkey: sellerPubkey,
                    lamports: Math.floor(price * web3_js_1.LAMPORTS_PER_SOL * 0.9),
                }));
                // Transfer 10% of the funds to the default SOL address
                transaction.add(web3_js_1.SystemProgram.transfer({
                    fromPubkey: account,
                    toPubkey: DEFAULT_SOL_ADDRESS,
                    lamports: Math.floor(price * web3_js_1.LAMPORTS_PER_SOL * 0.1),
                }));
                // set the end user as the fee payer
                transaction.feePayer = account;
                transaction.recentBlockhash = (yield connection.getLatestBlockhash()).blockhash;
                const payload = {
                    transaction: transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: true,
                    }).toString('base64'),
                    message: `You've successfully purchased ${product === null || product === void 0 ? void 0 : product.name} for ${price} SOL 🎊`,
                };
                res.set(actions_1.ACTIONS_CORS_HEADERS);
                return res.json(payload);
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
