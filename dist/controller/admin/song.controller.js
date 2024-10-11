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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield song_model_1.default.find({
            deleted: false
        });
        for (const song of songs) {
            const singer = yield singer_model_1.default.findOne({
                _id: song.singerId
            });
            song['singerFullName'] = singer.fullName;
            const topic = yield topic_model_1.default.findOne({
                _id: song.topicId
            });
            song['topicTitle'] = topic.title;
        }
        res.render("admin/pages/song/index.pug", {
            pageTitle: "Danh sách bài hát",
            songs: songs
        });
    }
    catch (error) {
        res.redirect('back');
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield topic_model_1.default.find({
            deleted: false,
            status: 'active'
        });
        const singers = yield singer_model_1.default.find({
            deleted: false,
            status: 'active'
        });
        res.render("admin/pages/song/create.pug", {
            pageTitle: "Thêm bài hát",
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
        res.redirect('back');
    }
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        title: req.body.title,
        description: req.body.description,
        avatar: (req.body.avatar ? req.body.avatar[0] : ''),
        singerId: req.body.singer,
        topicId: req.body.topic,
        status: req.body.status,
        audio: (req.body.audio ? req.body.audio[0] : ''),
        lyrics: req.body.lyrics || ''
    };
    const newSong = new song_model_1.default(data);
    yield newSong.save();
    res.redirect('back');
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const song = yield song_model_1.default.findOne({
            _id: id
        });
        const topics = yield topic_model_1.default.find({
            deleted: false,
            status: 'active'
        });
        const singers = yield singer_model_1.default.find({
            deleted: false,
            status: 'active'
        });
        res.render('admin/pages/song/edit.pug', {
            song: song,
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = {
            title: req.body.title,
            description: req.body.description,
            avatar: (req.body.avatar ? req.body.avatar[0] : ''),
            singerId: req.body.singer,
            topicId: req.body.topic,
            status: req.body.status,
            audio: (req.body.audio ? req.body.audio[0] : ''),
            lyrics: req.body.lyrics || ''
        };
        yield song_model_1.default.updateOne({
            _id: id
        }, {
            title: req.body.title,
            description: req.body.description,
            avatar: (req.body.avatar[0] ? req.body.avatar[0] : ''),
            singerId: req.body.singer,
            topicId: req.body.topic,
            status: req.body.status,
            audio: (req.body.audio[0] ? req.body.audio[0] : ''),
            lyrics: (req.body.lyrics ? req.body.lyrics : ''),
        });
        res.redirect('back');
    }
    catch (error) {
        res.redirect('back');
    }
});
exports.editPatch = editPatch;
