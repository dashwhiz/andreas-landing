import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Globales Marktportfolio",
  description:
    "Visualisierung des Globalen Marktportfolios: Aktien, Anleihen, Gold, Private Equity und Bitcoin. Mit KI-Prompt zur ETF-Zusammenstellung – aus dem Buch von Prof. Dr. Andreas Hackethal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
