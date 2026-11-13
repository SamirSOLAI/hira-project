import type { Request, Response } from "express";
import {
  jobMatching,
  structurePrompt,
  type JobSearchSpecs,
} from "../services/geminiAPI.js";
import { jobRetrieval } from "../services/jSearchAPI.js";

export const searchController = async (req: Request, res: Response) => {
  const userPrompt: string = req.body.prompt;
  const structuredPrompt: JobSearchSpecs | undefined =
    await structurePrompt(userPrompt);

  const jobsObject = await jobRetrieval(structuredPrompt!);
  const jobs = jobsObject.data.jobs;
  const filteredJobs = await jobMatching(jobs, userPrompt);
  res.status(200).json({
    gemini: filteredJobs,
    JSearch: jobs,
    structuredPrompt,
  });
  console.log(req.body);
};
