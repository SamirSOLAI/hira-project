import type { Request, Response } from "express";
import { structurePrompt, type JobSearchSpecs } from "../services/geminiAPI.js";
import { jobRetrieval } from "../services/jSearchAPI.js";

export const searchController = async (req: Request, res: Response) => {
  const userPrompt: string = req.body.prompt;
  const structuredPrompt: JobSearchSpecs | undefined =
    await structurePrompt(userPrompt);

  const jobs = await jobRetrieval(structuredPrompt!);
  res.status(200).json({
    output: jobs,
  });
  console.log(req.body);
};
