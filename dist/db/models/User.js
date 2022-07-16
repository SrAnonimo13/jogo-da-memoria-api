"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const UserSchema = new index_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    erros: {
        type: Number,
        required: true,
    },
    dificulty: {
        type: Number,
        required: true,
    }
});
exports.default = index_1.default.model("User", UserSchema);
