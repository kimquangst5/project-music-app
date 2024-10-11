"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const home_route_1 = __importDefault(require("./home.route"));
const topic_route_1 = __importDefault(require("./topic.route"));
const songs_route_1 = __importDefault(require("./songs.route"));
const search_route_1 = __importDefault(require("./search.route"));
const index = (app) => {
    app.use('/', home_route_1.default);
    app.use('/topics', topic_route_1.default);
    app.use('/songs', songs_route_1.default);
    app.use('/search', search_route_1.default);
};
exports.index = index;
