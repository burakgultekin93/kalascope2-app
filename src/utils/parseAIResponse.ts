import type { AnalysisResult, DetectedFood } from '@/types/food';

export const parseAIResponse = (rawContent: string | null): AnalysisResult => {
    if (!rawContent) throw new Error("AI sonucu boş döndü.");

    try {
        let cleaned = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

        // Safety check and extract valid json block
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        if (firstBrace === -1 || lastBrace === -1) {
            throw new Error("Geçerli bir format bulunamadı.");
        }

        cleaned = cleaned.substring(firstBrace, lastBrace + 1);

        const parsed = JSON.parse(cleaned);
        const foodsArray = parsed.foods || parsed.result?.foods || parsed.analysis?.foods || [];

        const processedFoods: DetectedFood[] = foodsArray.map((food: any) => {
            const per100g = {
                calories_per_100g: Number(food.calories_per_100g) || 0,
                protein_per_100g: Number(food.protein_per_100g) || 0,
                carbs_per_100g: Number(food.carbs_per_100g) || 0,
                fat_per_100g: Number(food.fat_per_100g) || 0,
                fiber_per_100g: Number(food.fiber_per_100g) || 0,
            };

            const grams = Number(food.estimated_grams) || 100;
            const multiplier = grams / 100;

            return {
                id: crypto.randomUUID(),
                name_tr: food.name_tr || 'Bilinmeyen Yemek',
                name_en: food.name_en || 'Unknown Food',
                estimated_grams: grams,
                confidence: Number(food.confidence) || 0.5,
                ...per100g,
                calories_total: Math.round(per100g.calories_per_100g * multiplier),
                protein_total: Number((per100g.protein_per_100g * multiplier).toFixed(1)),
                carbs_total: Number((per100g.carbs_per_100g * multiplier).toFixed(1)),
                fat_total: Number((per100g.fat_per_100g * multiplier).toFixed(1)),
                fiber_total: Number((per100g.fiber_per_100g * multiplier).toFixed(1)),
            };
        });

        const totals = processedFoods.reduce((acc, curr) => ({
            calories: acc.calories + curr.calories_total,
            protein: Number((acc.protein + curr.protein_total).toFixed(1)),
            carbs: Number((acc.carbs + curr.carbs_total).toFixed(1)),
            fat: Number((acc.fat + curr.fat_total).toFixed(1)),
            fiber: Number((acc.fiber + curr.fiber_total).toFixed(1)),
        }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

        return {
            foods: processedFoods,
            totals,
        };
    } catch (error) {
        console.error("Parse Error:", error, rawContent);
        throw new Error("Yemek analiz edilemedi. Lütfen tekrar deneyin.");
    }
};
