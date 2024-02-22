import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.js";
import session from "express-session";
import bodyParser from "body-parser";
const app = express();

dotenv.config();
app.use(
  session({
    secret: "Our little secret.",
    resave: false,

    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

app.use("/api/users", userRoute);



app.listen(8000, () => {
  connect();
  console.log("Connected to backend");
});
