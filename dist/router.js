"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./db/models/User"));
const router = express_1.default.Router();
router.post("/add", async (req, res) => {
    const { name, erros, dificulty } = req.body;
    if (await User_1.default.exists({ name })) {
        return res.status(400).send("User Allayers exist!");
    }
    if (!name)
        return res.status(400).send("Name not informed!");
    if (!erros)
        return res.status(400).send("Erros not informed!");
    if (!dificulty)
        return res.status(400).send("Dificulty not informed!");
    const user = await User_1.default.create({ name, erros, dificulty });
    return res
        .status(200)
        .send({ name: user.name, erros: user.erros, dificulty: user.dificulty });
});
router.post("/modify:name", async (req, res) => {
    try {
        const name = req.params.name.substring(1);
        const { erros, dificulty } = req.body;
        if (!erros)
            return res.status(400).send("Erros not informed!");
        const user = await User_1.default.findOneAndUpdate({ name }, { erros, dificulty });
        if (!user)
            return res.status(400).send("User not Found");
        return res.status(200).json(user);
    }
    catch {
        return res.status(400).send("User not exist!");
    }
});
router.get("/del", async (_req, res) => {
    const user = await User_1.default.find({}).remove();
    res.send(user);
});
router.get("/get", async (req, res) => {
    try {
        const { offset = 0, size = 3 } = req.query;
        const users = await User_1.default.find({}, { _id: 0, __v: 0 })
            .sort({ erros: 1 })
            .skip(Number(offset))
            .limit(Number(size));
        return res.json(users);
    }
    catch (e) {
        console.error(e);
        return res.sendStatus(400).send("Internal Error!");
    }
});
exports.default = router;
