import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
    res.send("Ticket routes")
});

export default router;