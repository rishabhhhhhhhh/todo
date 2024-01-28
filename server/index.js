import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const serverStartMessage = async (req, res) => {
  try {
    res.status(200).json({ message: "Server started successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

app.get("/", serverStartMessage);

/* ROUTES */
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

console.log("PORT:" + process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
