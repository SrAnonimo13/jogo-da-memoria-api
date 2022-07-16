import express from "express";

import User from "./db/models/User";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { name, erros, dificulty } = req.body;

  if (await User.exists({ name })) {
    return res.status(400).send("User Allayers exist!");
  }

  if (!name) return res.status(400).send("Name not informed!");
  if (!erros) return res.status(400).send("Erros not informed!");
  if (!dificulty) return res.status(400).send("Dificulty not informed!");

  const user = await User.create({ name, erros, dificulty });

  return res
    .status(200)
    .send({ name: user.name, erros: user.erros, dificulty: user.dificulty });
});

router.post("/modify:name", async (req, res) => {
  try {
    const name = req.params.name.substring(1) as string;
    const { erros, dificulty } = req.body;

    if (!erros) return res.status(400).send("Erros not informed!");

    const user = await User.findOneAndUpdate({ name }, { erros, dificulty });

    if (!user) return res.status(400).send("User not Found");

    return res.status(200).json(user);
  } catch {
    return res.status(400).send("User not exist!");
  }
});

router.get("/get", async (req, res) => {
  try {
    const { offset = 0, size = 4 } = req.query;

    const users = await User.find({}, { _id: 0, __v: 0 })
      .sort({ erros: 1 })
      .skip(Number(offset))
      .limit(Number(size));

    return res.json(users);
  } catch (e) {
    console.error(e);
    return res.sendStatus(400).send("Internal Error!");
  }
});

export default router;
