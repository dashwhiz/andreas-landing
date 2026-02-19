import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renten- & Vermögensrechner",
  description:
    "Erstellen Sie Ihre persönliche Vermögensübersicht und Rentenprognose. Berechnen Sie Gesamtvermögen, Risikoeinheiten und Ihr Einkommen in der Rente – basierend auf dem Buch von Prof. Dr. Andreas Hackethal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
