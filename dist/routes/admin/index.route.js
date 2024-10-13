"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const system_1 = __importDefault(require("../../config/system"));
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const song_route_1 = __importDefault(require("./song.route"));
const song_category_route_1 = __importDefault(require("./song-category.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const singer_route_1 = __importDefault(require("./singer.route"));
const index = (app) => {
    const admin = system_1.default.admin;
    app.use(`/${admin}/dashboard`, dashboard_route_1.default);
    app.use(`/${admin}/song`, song_route_1.default);
    app.use(`/${admin}/topic`, song_category_route_1.default);
    app.use(`/${admin}/upload-images`, upload_route_1.default);
    app.use(`/${admin}/singer`, singer_route_1.default);
};
exports.index = index;
