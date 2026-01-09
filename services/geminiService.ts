
import { GoogleGenAI, Type } from "@google/genai";
import { UserData, BMRResults } from "../types";

export const getHealthInsights = async (userData: UserData, results: BMRResults) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Based on the following profile, provide a concise health and nutrition summary:
    - Age: ${userData.age}
    - Gender: ${userData.gender}
    - Weight: ${userData.weight}kg
    - Height: ${userData.height}cm
    - Activity: ${userData.activityLevel}
    - Calculated BMR: ${results.bmr.toFixed(0)} kcal
    - Calculated TDEE: ${results.tdee.toFixed(0)} kcal

    Please include:
    1. A brief explanation of what these numbers mean for their specific profile.
    2. Three actionable diet or lifestyle tips.
    3. Suggested calorie intake for safe weight loss (0.5kg/week).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the health insight engine. Please try again later.";
  }
};
