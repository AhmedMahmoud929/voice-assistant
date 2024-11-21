import { SchemaType } from "@google/generative-ai";

export const geminiSystemInstructions =
  "For the duration of this conversation, act as an English teacher. use emojies and keep your reply very short";

export const geminiModel = "gemini-1.5-flash";

const SpecificPromptDetails =
  "Add it both lowercase and uppercase only in English, like Red or red, not RED or حمراء";

export const geminiResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    chatReply: {
      type: SchemaType.STRING,
      description:
        "The chatbot's response to the user's query, written in a friendly and humorous tone.",
    },
    carProps: {
      type: SchemaType.ARRAY,
      description: "An array of extracted car properties.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          key: { type: SchemaType.STRING, description: "The property name." },
          emoji: {
            type: SchemaType.STRING,
            description: "The property emoji.",
          },
          value: {
            type: SchemaType.STRING,
            description: "The property value.",
          },
        },
        required: ["key", "emoji", "value"],
      },
    },
    mongoQuery: {
      type: SchemaType.OBJECT,
      description:
        "A structured query for MongoDB based on the extracted car properties.",
      properties: {
        make: {
          type: SchemaType.OBJECT,
          description:
            "The manufacturer or brand of the car. " + SpecificPromptDetails,
          properties: {
            $in: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
        },
        model: {
          type: SchemaType.OBJECT,
          description:
            "The specific model of the car. " + SpecificPromptDetails,
          properties: {
            $in: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
        },
        year: {
          type: SchemaType.OBJECT,
          description:
            "The manufacturing year of the car. " + SpecificPromptDetails,
          properties: {
            $gte: { type: SchemaType.NUMBER },
            $lte: { type: SchemaType.NUMBER },
          },
        },
        price: {
          type: SchemaType.OBJECT,
          description: "The price range of the car. " + SpecificPromptDetails,
          properties: {
            $gte: { type: SchemaType.NUMBER },
            $lte: { type: SchemaType.NUMBER },
          },
        },
        mileage: {
          type: SchemaType.OBJECT,
          description:
            "The mileage range of the car in kilometers. " +
            SpecificPromptDetails,
          properties: {
            $gte: { type: SchemaType.NUMBER },
            $lte: { type: SchemaType.NUMBER },
          },
        },
        fuelType: {
          type: SchemaType.OBJECT,
          description:
            "The type of fuel the car uses. " + SpecificPromptDetails,
          properties: {
            $in: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
        },
        transmission: {
          type: SchemaType.OBJECT,
          description: "The car's transmission type. " + SpecificPromptDetails,
          properties: {
            $in: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
        },
        bodyType: {
          type: SchemaType.OBJECT,
          description: "The car's body type. " + SpecificPromptDetails,
          properties: {
            $in: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
        },
        color: {
          type: SchemaType.OBJECT,
          description: "The color of the car. " + SpecificPromptDetails,
          properties: {
            $in: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
        },
        features: {
          type: SchemaType.OBJECT,
          description: "The car's features (e.g., Bluetooth, Airbags).",
          properties: {
            $all: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
          },
        },
        engine: {
          type: SchemaType.OBJECT,
          description:
            "Details about the car's engine. " + SpecificPromptDetails,
          properties: {
            capacity: {
              type: SchemaType.OBJECT,
              properties: {
                $gte: { type: SchemaType.NUMBER },
                $lte: { type: SchemaType.NUMBER },
              },
            },
            horsepower: {
              type: SchemaType.OBJECT,
              properties: {
                $gte: { type: SchemaType.NUMBER },
                $lte: { type: SchemaType.NUMBER },
              },
            },
            torque: {
              type: SchemaType.OBJECT,
              properties: {
                $gte: { type: SchemaType.NUMBER },
                $lte: { type: SchemaType.NUMBER },
              },
            },
          },
        },
        dimensions: {
          type: SchemaType.OBJECT,
          description: "The car's dimensions.",
          properties: {
            length: {
              type: SchemaType.OBJECT,
              properties: {
                $gte: { type: SchemaType.NUMBER },
                $lte: { type: SchemaType.NUMBER },
              },
            },
            width: {
              type: SchemaType.OBJECT,
              properties: {
                $gte: { type: SchemaType.NUMBER },
                $lte: { type: SchemaType.NUMBER },
              },
            },
            height: {
              type: SchemaType.OBJECT,
              properties: {
                $gte: { type: SchemaType.NUMBER },
                $lte: { type: SchemaType.NUMBER },
              },
            },
          },
        },
      },
    },
  },
  required: ["chatReply"],
};
