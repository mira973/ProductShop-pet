
export type Product = {
  id: number;
  name: string;
  description: string;

  category: string;
  subcategory: string;

  price: number;
  oldPrice?: number;

  stock: number;
  isAvailable: boolean;

  value: number;
  unit: "г" | "мл" | "шт";

  image: string;

  ingredients: string;

  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };

  allergens: string[];
  tags: string[];

  storageConditions: string;
  shelfLife: string;
  countryOfOrigin: string;

  ingredientKey: string;
  aiEligible: boolean;
};
