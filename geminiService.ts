
import { GoogleGenAI, Type } from "@google/genai";
import { FoodLog, SymptomLog, FoodItem, TrafficLight } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeLogs(
  foodLogs: FoodLog[],
  symptomLogs: SymptomLog[],
  currentFoodList: FoodItem[]
): Promise<FoodItem[]> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Based on the following food logs and symptom logs, analyze the relationship between specific foods and symptoms (considering a 24-72 hour lag).
    Update the "personalizedLight" for each food in the provided list.
    - RED: Strong correlation with symptoms.
    - YELLOW: Possible correlation or moderate FODMAP.
    - GREEN: High probability of safety.
    
    Food Logs: ${JSON.stringify(foodLogs)}
    Symptom Logs: ${JSON.stringify(symptomLogs)}
    Current Food List: ${JSON.stringify(currentFoodList.map(f => ({ id: f.id, nameZh: f.nameZh, baseLight: f.baseLight })))}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              personalizedLight: { type: Type.STRING, enum: Object.values(TrafficLight) },
              reason: { type: Type.STRING }
            },
            required: ['id', 'personalizedLight', 'reason']
          }
        }
      }
    });

    const results = JSON.parse(response.text);
    return currentFoodList.map(food => {
      const insight = results.find((r: any) => r.id === food.id);
      if (insight) {
        return { ...food, personalizedLight: insight.personalizedLight as TrafficLight, reason: insight.reason };
      }
      return food;
    });
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return currentFoodList;
  }
}
