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
exports.changeListen = exports.changeLike = exports.detail = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const topic = yield topic_model_1.default.findOne({
            slug: slug,
            deleted: false
        });
        const songs = yield song_model_1.default.find({
            status: 'active',
            deleted: false,
            topicId: topic === null || topic === void 0 ? void 0 : topic.id
        });
        for (const it of songs) {
            const singer = yield singer_model_1.default.findOne({
                _id: it.singerId
            });
            it['singer'] = singer.fullName;
        }
        res.render(`client/pages/songs/index.pug`, {
            songs: songs
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const song = yield song_model_1.default.findOne({
            slug: slug
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId
        });
        song['singer'] = singer.fullName;
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId
        });
        song['topic'] = topic.title;
        song['topicSlug'] = topic.slug;
        res.render(`client/pages/songs/detail.pug`, {
            song: song
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.detail = detail;
const changeLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, liked } = req.body;
    yield song_model_1.default.updateOne({
        _id: id
    }, {
        like: parseInt(liked)
    });
    res.json({
        code: 200,
        message: parseInt(liked)
    });
});
exports.changeLike = changeLike;
const changeListen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const song = yield song_model_1.default.findOne({
            _id: id
        });
        yield song_model_1.default.updateOne({
            _id: id
        }, {
            listen: song.listen + 1
        });
        const songNew = yield song_model_1.default.findOne({
            _id: id
        });
        res.json({
            code: 200,
            numberOfListen: songNew.listen
        });
    }
    catch (error) {
        res.json({
            code: 400
        });
    }
});
exports.changeListen = changeListen;
