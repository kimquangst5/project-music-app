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
exports.uploadSingle = exports.uploadMulti = exports.deleteMulti = exports.deleteSingle = void 0;
const streamUpload_util_1 = __importDefault(require("../../util/streamUpload.util"));
const cloudinary_1 = require("cloudinary");
const deleteSingle = (nameImage) => {
    cloudinary_1.v2.uploader.destroy(nameImage, { invalidate: true }, (result) => {
    });
};
exports.deleteSingle = deleteSingle;
const deleteMulti = (nameImage) => {
    cloudinary_1.v2.api.delete_resources(nameImage, (result) => {
    });
};
exports.deleteMulti = deleteMulti;
const uploadMulti = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = req['files'];
    if (!result.avatar && !result.audio) {
        next();
    }
    else {
        if (result.avatar && !result.audio) {
            if (result.avatar.length > 0) {
                req.body.avatar = [];
                Promise.all(result.avatar.map(avatar => {
                    if (avatar.buffer) {
                        const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
                            let kq = yield (0, streamUpload_util_1.default)(buffer);
                            req.body.avatar.push(kq['url']);
                            next();
                        });
                        uploadToCloudinary(avatar.buffer);
                    }
                }));
            }
        }
        else if (!result.avatar && result.audio) {
            if (result.audio.length > 0) {
                req.body.audio = [];
                Promise.all(result.audio.map(avatar => {
                    if (avatar.buffer) {
                        const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
                            let kq = yield (0, streamUpload_util_1.default)(buffer);
                            req.body.audio.push(kq['url']);
                            next();
                        });
                        uploadToCloudinary(avatar.buffer);
                    }
                }));
            }
        }
        else {
            if (result.avatar.length > 0 && result.audio.length > 0) {
                req.body.avatar = [];
                Promise.all(result.avatar.map(avatar => {
                    if (avatar.buffer) {
                        const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
                            let kq = yield (0, streamUpload_util_1.default)(buffer);
                            req.body.avatar.push(kq['url']);
                        });
                        uploadToCloudinary(avatar.buffer);
                    }
                }));
                req.body.audio = [];
                Promise.all(result.audio.map(avatar => {
                    if (avatar.buffer) {
                        const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
                            let kq = yield (0, streamUpload_util_1.default)(buffer);
                            req.body.audio.push(kq['url']);
                            next();
                        });
                        uploadToCloudinary(avatar.buffer);
                    }
                }));
            }
        }
    }
});
exports.uploadMulti = uploadMulti;
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req['file']) {
        (req['file'].buffer);
        const uploadToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
            let result = yield (0, streamUpload_util_1.default)(buffer);
            req.body[req['file'].fieldname] = result['url'];
            req.body.nameImage = result['public_id'];
            next();
        });
        uploadToCloudinary(req['file'].buffer);
    }
    else {
        next();
    }
});
exports.uploadSingle = uploadSingle;
