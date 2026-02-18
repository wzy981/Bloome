
import { GoogleGenAI, Type } from "@google/genai";
import { FoodLog, SymptomLog, FoodItem, TrafficLight, StoolLog, ChatMessage, AssessmentResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * AI 饮食趋势分析
 */
export async function analyzeLogs(
  foodLogs: FoodLog[],
  symptomLogs: SymptomLog[],
  stoolLogs: StoolLog[],
  currentFoodList: FoodItem[]
): Promise<FoodItem[]> {
  const model = "gemini-3-flash-preview";
  const prompt = `分析日志以更新个性化红绿灯。饮食: ${JSON.stringify(foodLogs)} 症状: ${JSON.stringify(symptomLogs)}。`;

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
      return insight ? { ...food, personalizedLight: insight.personalizedLight as TrafficLight, reason: insight.reason } : food;
    });
  } catch (error) {
    return currentFoodList;
  }
}

/**
 * AI 深度复原方案生成
 */
export async function generateImmunePlan(
  assessment: AssessmentResult,
  logs: { foodLogs: FoodLog[]; symptomLogs: SymptomLog[]; stoolLogs: StoolLog[] }
) {
  const model = "gemini-3-pro-preview";
  const prompt = `
    基于 Susan Blum 博士的《免疫功能复原方案》，请为用户生成定制化的 4R 肠道修复计划。
    自测得分（总分 15/项）：
    - 肠道生态失调 (Dysbiosis): ${assessment.dysbiosisScore}
    - 消化问题 (Digestion): ${assessment.digestionScore}
    - 肠漏症 (Leaky Gut): ${assessment.leakyGutScore}
    
    用户历史日志数据摘要：${JSON.stringify(logs.foodLogs.slice(0, 5))}
    
    请输出以下模块：
    1. 现状解析：基于得分说明风险点。
    2. 移除 (Remove)：需要立即停止的食物或触发因素。
    3. 替换 (Replace)：推荐的消化辅助（如盐酸甜菜碱、消化酶等）。
    4. 重新接种 (Reinoculate)：益生菌和益生元选择。
    5. 修复 (Repair)：肠道粘膜修复建议（如 L-谷氨酰胺等）。
  `;

  const result = await ai.models.generateContent({ model, contents: prompt });
  return result.text;
}

/**
 * AI 专家咨询
 */
export async function startHealthConsultation(
  history: ChatMessage[],
  contextData: { foodLogs: FoodLog[]; symptomLogs: SymptomLog[]; stoolLogs: StoolLog[]; lastAssessment?: AssessmentResult }
) {
  const model = "gemini-3-pro-preview";
  const systemInstruction = `
    你是一名顶级临床营养专家，精通《免疫功能90天复原方案》。
    当前用户自测数据：${JSON.stringify(contextData.lastAssessment)}。
    请基于此数据及日志回答。语气要专业、同理。
  `;
  const chat = ai.chats.create({ model, config: { systemInstruction } });
  const result = await chat.sendMessage({ message: history[history.length - 1].text });
  return result.text;
}
