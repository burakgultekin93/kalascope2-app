export interface DetectedFood {
    id: string;
    name_tr: string;
    name_en: string;
    estimated_grams: number;
    confidence: number;
    calories_per_100g: number;
    protein_per_100g: number;
    carbs_per_100g: number;
    fat_per_100g: number;
    fiber_per_100g: number;
    calories_total: number;
    protein_total: number;
    carbs_total: number;
    fat_total: number;
    fiber_total: number;
}

export interface AnalysisResult {
    foods: DetectedFood[];
    totals: { calories: number; protein: number; carbs: number; fat: number; fiber: number };
}
