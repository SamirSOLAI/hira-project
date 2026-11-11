import { GoogleGenAI } from "@google/genai";

export type JobSearch = {
  jobTitles: string[];
  location: string;
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
    salary: {
      type: "number",
    },
    contractType: {
      type: "string",
    },
  },
  required: ["jobTitles", "location"],
};

export async function structurePrompt(
  prompt: string,
): Promise<JobSearch | undefined> {
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
      return JSON.parse(response.text);
    }

    throw new Error("Gemini returned no text");
  } catch (error) {
    console.error("Gemini API test failed:", error);
  }
}
