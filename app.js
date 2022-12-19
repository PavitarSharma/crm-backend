import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 30001;

// Helemt: API Security
app.use(helmet());

// CORS: Handle CORS Error
app.use(cors());

// MongoDB Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV !== "production") {
  const mDb = mongoose.connection;
  mDb.on("open", () => {
    console.log("MongoDB is conneted");
  });

  mDb.on("error", (error) => {
    console.log(error);
  });

  //Logger
  app.use(morgan("tiny"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Server Started Successfully..." });
});

// Routes
import userRoutes from "./src/routes/user.routes.js";
import ticketRoutes from "./src/routes/ticket.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tickets", ticketRoutes);

//Error handler
import handleError from "./src/utils/errorHandler.js";

app.use((req, res, next) => {
  const error = new Error("Resources not found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  handleError(error, res)
})

app.listen(PORT, () =>
  console.log(`Server started on http://loaclhost:${PORT}`)
);
