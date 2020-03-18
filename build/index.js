"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
//import { router } from './routes/loginRoutes'  ***deprecated
var AppRouter_1 = require("./AppRouter");
require("./controller/LoginController");
require("./controller/RootController");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_session_1.default({ keys: ['sdfuSD&$jfa7a7FdaH74haa&qgf6EWDg64qr7gy'] }));
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(process.env.PORT || 3000, function () { return console.log('up on http://localhost:3000'); });
