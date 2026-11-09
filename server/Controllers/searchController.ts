import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from server/.env");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

try {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents:
      "structure the following prompt in a json like format : Im looking for a react developer internship in france idieally of 6 months with a salary of 1000 euros",
  });

  console.log(response.text);
} catch (error) {
  console.error("Gemini API test failed:", error);
}

export const searchController = (req: Request, res: Response) => {
  const userPrompt = req.body;
  res.status(200).json({
    message: "the backed received your prompt",
    prompt: req.body,
  });
  console.log(req.body);
};
