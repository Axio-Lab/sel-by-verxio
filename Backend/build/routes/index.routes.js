"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_routes_1 = __importDefault(require("./profile.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const action_routes_1 = __importDefault(require("./action.routes"));
const doc_routes_1 = __importDefault(require("./doc.routes"));
const constants_configs_1 = require("../configs/constants.configs");
exports.default = (app) => {
    app.use(`${constants_configs_1.basePath}/profile`, profile_routes_1.default);
    app.use(`${constants_configs_1.basePath}/product`, product_routes_1.default);
    app.use(`${constants_configs_1.basePath}/action`, action_routes_1.default);
    app.use(`${constants_configs_1.basePath}/docs`, doc_routes_1.default);
    app.use(`${constants_configs_1.basePath}/`, (_req, res) => {
        res.send("Welcome to Verxio API");
    });
};
