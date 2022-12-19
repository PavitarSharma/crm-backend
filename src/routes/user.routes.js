import express from "express";
import { signUp } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/", signUp);

export default router;