import mongoose from "mongoose";
import { config } from "dotenv";

config();

mongoose.connect(process.env.DbURL);

export default mongoose;
