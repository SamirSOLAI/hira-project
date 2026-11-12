import { error } from "node:console";
import type { JobSearchSpecs } from "./geminiAPI.js";

const url = null;
export const jobRetrieval = async function (JobSearchSpecs: JobSearchSpecs) {
  const { jobTitles, location, skills, salary, contractType } = JobSearchSpecs;
  const url = new URL("https://jsearch.p.rapidapi.com/search-v2");

  const query = `${jobTitles[0]} in ${location}`;

  url.searchParams.set("query", query);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.JSEARCH_API_KEY ?? "",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new Error("Job retrieval failed");
  }

  const data = await response.json();

  return data;
};
