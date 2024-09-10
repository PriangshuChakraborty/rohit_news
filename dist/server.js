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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const circular_json_1 = __importDefault(require("circular-json"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: 'src/config/.env'
    });
}
app.use(express_1.default.json());
const port = process.env.PORT;
//
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.BASE_URL}?q=football&apiKey=${process.env.API_KEY}`);
        const str = circular_json_1.default.stringify(response);
        const data = JSON.parse(str);
        res.status(200).json(data.data); // return the data from the api to the user
    }
    catch (error) {
        next(new Error(error));
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
