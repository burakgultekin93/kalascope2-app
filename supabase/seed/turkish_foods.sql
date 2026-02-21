-- supabase/seed/turkish_foods.sql
-- Seed Turkish Foods

INSERT INTO public.food_items (name_tr, name_en, category, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g, common_portion_grams, common_portion_label, is_turkish) VALUES
('Mercimek Çorbası', 'Lentil Soup', 'çorbalar', 46, 2.5, 7.8, 1.2, 1.5, 200, '1 kase', true),
('Lahmacun', 'Lahmacun', 'pide', 200, 8, 25, 7, 2, 120, '1 adet', true),
('İskender Kebap', 'Iskender Kebab', 'kebap', 160, 10, 12, 8, 1, 300, '1 porsiyon', true),
('Karnıyarık', 'Stuffed Eggplant', 'sebze', 110, 4, 6, 8, 2, 180, '1 porsiyon', true),
('Mantı', 'Turkish Dumplings', 'hamur', 180, 5, 25, 6, 1, 200, '1 tabak', true),
('Sütlaç', 'Rice Pudding', 'tatlı', 110, 3, 20, 2, 0.2, 150, '1 kase', true),
('Simit', 'Turkish Bagel', 'hamur', 275, 10, 50, 4, 3, 100, '1 adet', true),
('Ezogelin Çorbası', 'Ezogelin Soup', 'çorbalar', 55, 3, 9, 1.5, 2, 200, '1 kase', true),
('Adana Kebap', 'Adana Kebab', 'kebap', 230, 14, 2, 18, 0.5, 200, '1 porsiyon', true),
('Menemen', 'Menemen (Turkish Omelet)', 'kahvaltı', 90, 4, 3, 7, 1, 200, '1 porsiyon', true),
('Baklava', 'Baklava', 'tatlı', 430, 4, 45, 25, 1, 80, '2 dilim', true),
('Dolma', 'Stuffed Grape Leaves', 'sebze', 140, 2.5, 15, 8, 2.5, 150, '1 porsiyon', true),
('Pide (Kıymalı)', 'Minced Meat Pide', 'pide', 250, 10, 30, 9, 1.5, 150, '1 porsiyon', true),
('Ayran', 'Ayran (Yogurt Drink)', 'içecek', 35, 2, 3, 1.5, 0, 200, '1 bardak', true),
('Döner (Porsiyon)', 'Doner Kebab', 'et', 220, 15, 2, 16, 0, 150, '1 porsiyon', true);
