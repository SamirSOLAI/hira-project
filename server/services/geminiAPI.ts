import { GoogleGenAI } from "@google/genai";

export type JobSearchSpecs = {
  jobTitles: string[];
  location: string;
  country?: string;
  skills?: string[];
  salary?: number;
  contractType?: string;
};

export type RankedJob = {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  job_publisher: string;
  job_description: string;
  job_employment_type: string;
  job_employment_types: string[];
  job_apply_link: string;
  job_apply_is_direct: boolean;
  job_is_remote: boolean;
  job_posted_at: string | null;
  job_posted_at_datetime_utc: string | null;
  job_location: string;
  job_city: string | null;
  job_country: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_period: string | null;
  relevance_score: number;
};

export type JobMatchingResult = {
  jobs: RankedJob[];
};

const jobSearchSchema = {
  type: "object",
  properties: {
    jobTitles: {
      type: "array",
      items: { type: "string" },
    },
    skills: {
      type: "array",
      items: { type: "string" },
    },
    location: {
      type: "string",
    },
    country: {
      type: "string",
      description:
        "use the format ISO 3166-1 alpha-2 country codes such as fr, us, ca",
    },
    salary: {
      type: "number",
    },
    contractType: {
      type: "string",
      enum: ["FULLTIME", "PARTTIME", "CONTRACTOR", "INTERN"],
      description:
        "Employment type using one of the JSearch employment type values",
    },
  },
  required: ["jobTitles", "location"],
};

const jobMatchingSchema = {
  type: "object",
  properties: {
    jobs: {
      type: "array",
      description: "Jobs ordered from highest relevance score to lowest",
      items: {
        type: "object",
        properties: {
          job_id: { type: "string" },
          job_title: { type: "string" },
          employer_name: { type: "string" },
          employer_logo: { type: ["string", "null"] },
          job_publisher: { type: "string" },
          job_description: { type: "string" },
          job_employment_type: { type: "string" },
          job_employment_types: {
            type: "array",
            items: { type: "string" },
          },
          job_apply_link: { type: "string" },
          job_apply_is_direct: { type: "boolean" },
          job_is_remote: { type: "boolean" },
          job_posted_at: { type: ["string", "null"] },
          job_posted_at_datetime_utc: { type: ["string", "null"] },
          job_location: { type: "string" },
          job_city: { type: ["string", "null"] },
          job_country: { type: "string" },
          job_min_salary: { type: ["number", "null"] },
          job_max_salary: { type: ["number", "null"] },
          job_salary_period: { type: ["string", "null"] },
          relevance_score: {
            type: "integer",
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            description:
              "How well the job matches the user request, where 10 is the best match",
          },
        },
        required: [
          "job_id",
          "job_title",
          "employer_name",
          "job_publisher",
          "job_description",
          "job_employment_type",
          "job_employment_types",
          "job_apply_link",
          "job_apply_is_direct",
          "job_is_remote",
          "job_location",
          "job_country",
          "relevance_score",
        ],
      },
    },
  },
  required: ["jobs"],
};

export async function structurePrompt(
  prompt: string,
): Promise<JobSearchSpecs | undefined> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from server/.env");
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `use the Schema to structure the following job description : ${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: jobSearchSchema,
      },
    });

    console.log(response.text);
    if (typeof response.text === "string") {
      return JSON.parse(response.text) as JobSearchSpecs;
    }

    throw new Error("Gemini returned no text");
  } catch (error) {
    console.error("Gemini API test failed:", error);
  }
}

export async function jobMatching(
  jobs: object[],
  userPrompt: string,
): Promise<JobMatchingResult | undefined> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from server/.env");
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
Compare the following jobs against the user's request.

Rules:
- Give every job a relevance_score from 1 to 10.
- Sort jobs from the highest score to the lowest.
- keep only 7 most relevant posting.
- Preserve all original job field values exactly.
- Do not invent or modify job information.

User request:
${userPrompt}

Jobs:
${JSON.stringify(jobs)}
`,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: jobMatchingSchema,
      },
    });

    console.log(response.text);
    if (typeof response.text === "string") {
      return JSON.parse(response.text) as JobMatchingResult;
    }

    throw new Error("Gemini returned no text");
  } catch (error) {
    console.error("Gemini API test failed:", error);
  }
}
