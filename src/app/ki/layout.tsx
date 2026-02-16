import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KI-Prompts",
  description:
    "Quiz-Prompts und Vorlagen zum Kopieren für ChatGPT, Gemini und Perplexity – Finanz-Prompts aus dem Buch ›Dein Financial Lifestyle Code‹ von Prof. Dr. Andreas Hackethal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
