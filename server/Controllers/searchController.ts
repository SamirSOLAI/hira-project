import type { Request, Response } from "express";
import { structurePrompt, type JobSearch } from "../services/geminiAPI.js";

export const searchController = async (req: Request, res: Response) => {
  const userPrompt: string = req.body.prompt;
  const structuredPrompt: JobSearch | undefined =
    await structurePrompt(userPrompt);
  res.status(200).json({
    prompt: req.body,
    output: structuredPrompt,
  });
  console.log(req.body);
};
