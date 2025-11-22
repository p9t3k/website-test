import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

export const initializeChat = () => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    const session = initializeChat();
    if (!session) {
        // Fallback if no API key is present
        return "I'm currently offline (Missing API Key). Please check your configuration.";
    }
  }

  try {
    if (!chatSession) {
        throw new Error("Failed to initialize chat session");
    }
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a disturbance in the Solana force. Please try again later.";
  }
};