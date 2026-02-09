import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getSommelierRecommendation = async (dishName: string): Promise<string> => {
  if (!apiKey) return "Unser Sommelier ist derzeit beschäftigt. Bitte fragen Sie unser Servicepersonal.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Ich bin Gast im Restaurant Grütering. Ich habe mich für folgendes Gericht entschieden: "${dishName}".
      
      Das Restaurant ist geprägt von dunklen, edlen Nuancen, Handwerk und einer ruhigen, selbstbewussten Atmosphäre.
      
      Bitte empfehlen Sie mir als "Virtueller Sommelier" einen passenden Wein. 
      Antworte kurz (max. 3 Sätze), elegant und im Tonfall des Restaurants (souverän, höflich, nicht marktschreierisch). 
      Nenne eine Rebsorte oder einen Weinstil, der dazu passt.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.7,
      }
    });

    return response.text || "Eine exzellente Wahl. Unser Servicepersonal berät Sie gerne zum passenden Wein.";
  } catch (error) {
    console.error("Sommelier Error:", error);
    return "Unser Weinkeller wird gerade neu sortiert. Bitte wenden Sie sich an den Service.";
  }
};