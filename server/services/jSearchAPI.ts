import type { JobSearchSpecs } from "./geminiAPI.js";

export const jobRetrieval = async function (jobSearchSpecs: JobSearchSpecs) {
  const { jobTitles, location, country, skills, salary, contractType } =
    jobSearchSpecs;
  const url = new URL("https://jsearch.p.rapidapi.com/search-v2");

  const query = `${jobTitles[0]} in ${location}`;

  url.searchParams.set("query", query);

  if (country) url.searchParams.set("country", country);
  if (contractType) url.searchParams.set("employment_types", contractType);

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
