import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { text } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(text);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini failed" });
  }
});

export default router;
