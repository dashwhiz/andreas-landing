import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renditerechner – Zinseszins",
  description:
    "Fünf Zinseszinsrechner: Endwert einer Einmalanlage, Gegenwartswert, Sparplan-Endwert, monatliche Zahlung und Barwert. Begleitrechner zum Buch von Prof. Dr. Andreas Hackethal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
