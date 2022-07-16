"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
(0, dotenv_1.config)();
const PORT = 3000;
const { DEV: isDev } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/api", router_1.default);
app.listen(PORT, () => {
    if (isDev) {
        console.log(`Server Started! http://localhost:${PORT}`);
    }
});
