"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_configs_1 = require("../configs/constants.configs");
const profileSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        sparse: true,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    }
}, {
    strict: false,
    timestamps: true
});
const Profile = (0, mongoose_1.model)(constants_configs_1.DATABASES.PROFILE, profileSchema);
exports.default = Profile;
