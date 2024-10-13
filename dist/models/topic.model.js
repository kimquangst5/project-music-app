"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const { Schema } = mongoose_1.default;
const topicSchema = new Schema({
    title: String,
    avatar: String,
    description: String,
    status: String,
    slug: {
        type: String,
        slug: "title"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
}).plugin(mongoose_slug_updater_1.default);
const Topic = mongoose_1.default.model('Topic', topicSchema, 'topics');
exports.default = Topic;
