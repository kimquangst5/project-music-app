"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const singerSchema = new Schema({
    fullName: String,
    avatar: String,
    description: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
const Singer = mongoose_1.default.model('Singer', singerSchema, 'singers');
exports.default = Singer;
