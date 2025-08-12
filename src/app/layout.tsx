import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant, Sora } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
const geistSans = Bricolage_Grotesque({
  variable: "--font-paragraph",
  subsets: ["latin"],
});

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Modelling Club - KNUST",
  description:
    "Providing local solutions through the use of Computer Aided Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <body
        className={`${geistSans.variable} ${heading.variable} overflow-x-hidden antialiased`}
      >
        <Toaster
          richColors
          position="top-center"
          className="font-(family-name:--font-paragraph)"
          closeButton
        />
        {children}
      </body>
    </html>
  );
}
