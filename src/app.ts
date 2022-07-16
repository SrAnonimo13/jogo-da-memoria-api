import express from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./router";

config();

const PORT = 3000;
const { DEV: isDev } = process.env;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", router);

app.listen(PORT, () => {
  if (isDev) {
    console.log(`Server Started! http://localhost:${PORT}`);
  }
});
