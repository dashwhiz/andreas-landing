import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { TranslationProvider } from "@/contexts/TranslationProvider";
import { Analytics } from "@vercel/analytics/react";
import { ppObjectSans } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "Dein Financial Lifestyle Code – Prof. Dr. Andreas Hackethal",
    template: "%s – Financial Lifestyle Code",
  },
  description:
    "Begleitwebsite zum Buch ›Dein Financial Lifestyle Code‹ von Prof. Dr. Andreas Hackethal (Campus Verlag). Renditerechner, Rentenprognose, Globales Marktportfolio und KI-Prompts für stressfreies Sparen und smartes Investieren.",
  keywords: [
    "Financial Lifestyle Code",
    "Andreas Hackethal",
    "Goethe-Universität Frankfurt",
    "Renditerechner",
    "Zinseszinsrechner",
    "Rentenprognose",
    "Globales Marktportfolio",
    "ETF",
    "Finanzplanung",
    "Altersvorsorge",
    "Vermögensaufbau",
    "Seasn",
    "SAFE Institut",
    "Campus Verlag",
  ],
  authors: [{ name: "Prof. Dr. Andreas Hackethal" }],
  openGraph: {
    title: "Dein Financial Lifestyle Code – Prof. Dr. Andreas Hackethal",
    description:
      "Renditerechner, Rentenprognose, Globales Marktportfolio und KI-Prompts – die interaktive Begleitwebsite zum Buch von Prof. Dr. Andreas Hackethal.",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dein Financial Lifestyle Code – Prof. Dr. Andreas Hackethal",
    description:
      "Renditerechner, Rentenprognose, Globales Marktportfolio und KI-Prompts – die interaktive Begleitwebsite zum Buch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={ppObjectSans.variable}>
      <body>
        <StyledComponentsRegistry>
          <TranslationProvider>
            {children}
          </TranslationProvider>
          <Analytics />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
