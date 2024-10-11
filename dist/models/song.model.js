"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const songsSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    avatar: String,
    singerId: String,
    topicId: String,
    like: {
        type: Number,
        default: 0
    },
    listen: {
        type: Number,
        default: 0
    },
    lyrics: String,
    audio: String,
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
const Song = mongoose_1.default.model('Song', songsSchema, 'songs');
exports.default = Song;
