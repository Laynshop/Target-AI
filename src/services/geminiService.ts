/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { CampaignAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const analyzeAdvertisingContext = async (productName: string, productDescription: string): Promise<CampaignAnalysis> => {
  const prompt = `Analyze the following product and market context to find specific high-converting target audiences and recommend advertising structures (platforms and formats).
  
  Product Name: ${productName}
  Product Description: ${productDescription}
  
  Provide a detailed analysis including audience segments, demographics, behaviors, and specific ad suggestions.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          productDescription: { type: Type.STRING },
          marketContext: { type: Type.STRING, description: "Overview of current market trends and competitive landscape for this product." },
          targetAudiences: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                demographics: {
                  type: Type.OBJECT,
                  properties: {
                    ageRange: { type: Type.STRING },
                    location: { type: Type.STRING },
                    incomeLevel: { type: Type.STRING },
                    occupations: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                },
                interests: { type: Type.ARRAY, items: { type: Type.STRING } },
                behaviors: { type: Type.ARRAY, items: { type: Type.STRING } },
                painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                marketingStrategy: { type: Type.STRING },
                adCopySuggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          recommendedStructures: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                platform: { type: Type.STRING, enum: ["Meta", "Google", "TikTok", "LinkedIn", "X"] },
                structureType: { type: Type.STRING, enum: ["Carousel", "Static Image", "Short-form Video", "Search Ad"] },
                effectivenessScore: { type: Type.NUMBER },
                aiRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        },
        required: ["productName", "productDescription", "targetAudiences", "recommendedStructures", "marketContext"]
      }
    }
  });

  return JSON.parse(response.text) as CampaignAnalysis;
};
