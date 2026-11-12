import { GoogleGenAI } from "@google/genai";

export type JobSearchSpecs = {
  jobTitles: string[];
  location: string;
  country?: string;
  skills?: string[];
  salary?: number;
  contractType?: string;
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

export async function structurePrompt(
  prompt: string,
): Promise<JobSearchSpecs | undefined> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from server/.env");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
