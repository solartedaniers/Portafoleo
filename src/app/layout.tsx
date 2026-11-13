import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./components/ThemeLangContext";
import { ContentProvider } from "./components/ContentProvider";
import { CONTENT_BY_LANG, DEFAULT_LANG } from "@/config/content";

const meta = CONTENT_BY_LANG[DEFAULT_LANG].meta as { title: string; description: string };

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LANG} suppressHydrationWarning>
      <body className="antialiased">
        <AppProvider>
          <ContentProvider>{children}</ContentProvider>
        </AppProvider>
      </body>
    </html>
  );
}
