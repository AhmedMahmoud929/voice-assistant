"use client";

import { Poppins, Tajawal } from "next/font/google";
import { useLanguage } from "@/hooks/use-language";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "700"] });

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`antialiased overflow-x-hidden ${
          lang === "en" ? poppins.className : tajawal.className
        }`}
      >
        {children}
      </body>
    </html>
  );
}
