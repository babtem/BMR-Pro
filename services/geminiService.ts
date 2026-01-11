
import { GoogleGenAI } from "@google/genai";
import { UserData, BMRResults, UnitSystem } from "../types";

// Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly.
export const getHealthInsights = async (userData: UserData, results: BMRResults) => {
  // Creating a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Fix: Dynamically set units based on the user's selected unit system
  const weightUnit = userData.unitSystem === UnitSystem.METRIC ? 'kg' : 'lbs';
  const heightUnit = userData.unitSystem === UnitSystem.METRIC ? 'cm' : 'inches';

  const prompt = `
    Based on the following profile, provide a concise health and nutrition summary:
    - Age: ${userData.age}
    - Gender: ${userData.gender}
    - Weight: ${userData.weight}${weightUnit}
    - Height: ${userData.height}${heightUnit}
    - Activity: ${userData.activityLevel}
    - Calculated BMR: ${results.bmr.toFixed(0)} kcal
    - Calculated TDEE: ${results.tdee.toFixed(0)} kcal

    Please include:
    1. A brief explanation of what these numbers mean for their specific profile.
    2. Three actionable diet or lifestyle tips.
    3. Suggested calorie intake for safe weight loss (0.5kg/week).
  `;

  try {
    // Fix: Using gemini-3-flash-preview for basic text tasks (summarization, tips) as recommended.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    // Fix: Directly access the .text property from the GenerateContentResponse object.
    // .text is a getter, not a method.
    return response.text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the health insight engine. Please try again later.";
  }
};
