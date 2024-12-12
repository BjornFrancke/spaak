import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "./components/ModalProvider";

export const metadata: Metadata = {
  title: "Proposal Overview",
  description: "Be ajour on danish law proposals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body>
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
