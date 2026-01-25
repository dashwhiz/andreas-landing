import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { TranslationProvider } from "@/contexts/TranslationProvider";
import { ppObjectSans } from "./fonts";

export const metadata: Metadata = {
  title: "Buch-Companion",
  description: "Companion Website für das Buch",
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
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
