export interface ChatHistory {
  role: string;
  parts: {
    text: string;
    fullResponse: string;
  }[];
}

export interface CarProperty {
  key: string;
  emoji: string;
  value: string;
}

export interface ModelResponse {
  chatReply?: string;
  carProps?: CarProperty[];
  mongoQuery?: object;
}

export interface Car {
  _id: string;
  bodyType: string;
  color: string;
  dimensions: { length: number; width: number; height: number };
  engine: { capacity: number; horsepower: number; torque: number };
  features: string[];
  fuelType: string;
  images: string[];
  make: string;
  mileage: number;
  model: string;
  price: number;
  transmission: string;
  year: number;
}

export type LanguageOptions = "en" | "ar";
