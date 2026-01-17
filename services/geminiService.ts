
import { GoogleGenAI, Type } from "@google/genai";
import { DockerContainer, AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getContainerInsights(containers: DockerContainer[]): Promise<AIInsight[]> {
  try {
    const prompt = `
      Analyze these Docker containers and provide operational insights or warnings.
      Data: ${JSON.stringify(containers.map(c => ({
        name: c.name,
        status: c.status,
        cpu: c.cpu,
        memory: c.memory,
        limit: c.memoryLimit,
        image: c.image
      })))}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a senior DevOps SRE. Analyze container metrics and identify issues like high resource usage, unexpected status, or optimization opportunities. Return results in a structured JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ['optimization', 'warning', 'info'] },
              title: { type: Type.STRING },
              message: { type: Type.STRING },
              containerId: { type: Type.STRING, description: 'Optional container name mentioned' }
            },
            required: ['type', 'title', 'message']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Insights Error:", error);
    return [{
      type: 'info',
      title: 'AI Offline',
      message: 'Unable to connect to Gemini for real-time analysis.'
    }];
  }
}
