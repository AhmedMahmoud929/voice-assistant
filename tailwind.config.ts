import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#3c4959",
        darkBlue: "#011632",
        midBlue: "#347FC2",
        skyBlue: "#25b4f8",
        babyBlue: "rgba(189, 233, 255, 0.62)",
        success: "#17bf28",
        warning: "#ec942c",
        error: "#e52323",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondaryGray: "#F5F5F5",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "linear-1":
          "linear-gradient(90deg, #25b4f0 0%, rgba(37,180,248,0.47) 51.04%, #25b4f0 100%)",
        "linear-2":
          "linear-gradient(90deg, rgba(37,180,248,0.3) 0%, #25b4f0 100%)",
        "sky-blue-linear":
          "linear-gradient(-45deg, hsl(198deg 46.88% 74.9%), hsl(190deg 10% 76.47%))",
        "sky-blue-linear-2":
          "linear-gradient(-45deg, hsl(183.6deg 21.74% 54.9%), hsl(86.47deg 14.91% 55.29%))",
      },
      fontFamily: {
        sans: ["General Sans", "sans-serif"],
      },
      fontSize: {
        // H1
        h1: [
          "3.875rem",
          {
            // 62px
            lineHeight: "120%",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        // H2
        h2: [
          "2.5rem",
          {
            // 40px
            lineHeight: "125%",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        // H3
        h3: [
          "2.25rem",
          {
            // 36px
            lineHeight: "125%",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        "h3-semibold": [
          "2.25rem",
          {
            // 36px
            lineHeight: "125%",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        "h3-medium": [
          "2.25rem",
          {
            // 36px
            lineHeight: "125%",
            letterSpacing: "0em",
            fontWeight: "500",
          },
        ],
        // H4
        h4: [
          "1.5rem",
          {
            // 24px
            lineHeight: "120%",
            letterSpacing: "0em",
            fontWeight: "700",
          },
        ],
        "h4-semibold": [
          "1.5rem",
          {
            // 24px
            lineHeight: "120%",
            letterSpacing: "0em",
            fontWeight: "600",
          },
        ],
        "h4-medium": [
          "1.5rem",
          {
            // 24px
            lineHeight: "120%",
            letterSpacing: "0em",
            fontWeight: "500",
          },
        ],
      },
      boxShadow: {
        custom: "-84px 41px 250px -40px rgba(0,0,0,0.85)",
        custom2: "-84px 41px 250px -40px red",
        blue: "0 0 15px 5px rgba(59, 90, 255, 0.2)",
      },
      backdropBlur: {
        custom: "20px",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
