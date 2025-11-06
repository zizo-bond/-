
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      word: {
        type: Type.STRING,
        description: "الكلمة من الجملة الأصلية.",
      },
      analysis: {
        type: Type.STRING,
        description: "الإعراب المفصل للكلمة.",
      },
    },
    required: ["word", "analysis"],
  },
};

export const analyzeArabicText = async (text: string): Promise<AnalysisResult[]> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `أعرب الجملة التالية: "${text}"`,
      config: {
        systemInstruction: "أنت خبير في النحو وقواعد اللغة العربية. مهمتك هي إعراب الجمل العربية إعراباً تفصيلياً ودقيقاً. قم بتحليل كل كلمة على حدة. يجب أن تكون النتيجة على هيئة JSON فقط بدون أي نص إضافي أو علامات.",
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonString = response.text;
    const parsedResult = JSON.parse(jsonString);
    
    if (!Array.isArray(parsedResult)) {
        throw new Error("Invalid response format from API.");
    }

    return parsedResult as AnalysisResult[];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
