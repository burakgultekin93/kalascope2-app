import { openai } from './openai';
import { SYSTEM_PROMPT_TURKISH_FOOD } from './aiPrompts';
import { parseAIResponse } from '@/utils/parseAIResponse';
import type { AnalysisResult } from '@/types/food';

export const analyzeFoodImage = async (base64Image: string): Promise<AnalysisResult> => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            max_tokens: 1500,
            temperature: 0.1,
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT_TURKISH_FOOD
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Please analyze this food image and return the nutritional data as JSON." },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`,
                                detail: "high"
                            }
                        }
                    ]
                }
            ]
        });

        const content = response.choices[0]?.message?.content || null;
        return parseAIResponse(content);
    } catch (error: any) {
        console.error("AI Analysis Error:", error);
        if (error?.status === 429 || error?.status === 401) {
            throw new Error("Geçici bir servis sorunu var. Lütfen biraz bekleyip tekrar deneyin.");
        }
        throw new Error("Fotoğraf analiz edilemedi. Lütfen daha net bir fotoğraf çekin.");
    }
};
