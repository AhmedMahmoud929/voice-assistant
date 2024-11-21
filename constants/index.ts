export type LocaleKeys =
  | "logo"
  | "preHeader"
  | "headerSpan"
  | "postHeader"
  | "inpPlaceholder"
  | "promptSuggestions"
  | "resultsBtn";

export const locales = {
  en: {
    logo: "Brigi",
    preHeader: "Let's find your",
    headerSpan: " Dream ",
    postHeader: "Car",
    inpPlaceholder: "Ask Brigi a question...",
    promptSuggestions: [
      "Suggest a car under 10k",
      "What's on the stock?",
      "I'm looking for an electric car",
    ],
    resultsBtn: "Show Results:",
  },
  ar: {
    logo: "بريجي",
    preHeader: "دعنا نجد سيارة",
    headerSpan: "احلامك",
    postHeader: "الآن",
    inpPlaceholder: "اسأل بريجي سؤالاً...",
    promptSuggestions: [
      "اقترح سيارة أقل من 10 آلاف",
      "ما السيارات الموجودة في المخزون؟",
      "أبحث عن سيارة كهربائية",
    ],
    resultsBtn: ":عرض النتائج",
  },
};
