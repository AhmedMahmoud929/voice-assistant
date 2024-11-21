"use client";

import { LocaleKeys, locales } from "@/constants";
import { LanguageOptions } from "@/lib/types";
import { useState, useEffect } from "react";

export function useLanguage() {
  const [lang, setLang] = useState<LanguageOptions>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as LanguageOptions;
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const handleLangChange = () => {
    const newLang = lang === "en" ? "ar" : "en";
    localStorage.setItem("language", newLang);
    location.reload();
  };

  const t = (key: LocaleKeys): string | string[] => {
    return locales[lang][key];
  };

  return { lang, handleLangChange, t };
}
