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
exports.index = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    let { key } = req.query;
    let keySlug = key.trim().replace(/\s+/g, '-');
    keySlug = (0, unidecode_1.default)(keySlug);
    const regexTitle = new RegExp(key, 'i');
    let regexSlug = new RegExp(keySlug, 'i');
    const songs = yield song_model_1.default.find({
        $or: [
            { title: regexTitle },
            { slug: regexSlug }
        ],
        deleted: false,
        status: 'active'
    });
    let songsFinal = [];
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId
        });
        let items = {
            title: song.title,
            avatar: song.avatar,
            slug: song.slug,
            singer: singer.fullName
        };
        songsFinal.push(items);
    }
    if (type == 'result') {
        res.render("client/pages/songs/search.pug", {
            key: key,
            songs: songs
        });
    }
    else if (type == 'suggest') {
        res.json({
            code: 200,
            songs: songsFinal
        });
    }
});
exports.index = index;
