import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";
import { AllProviders } from "@/components/providers";

const geistSans = Geist({
  weight: ["400", "600", "700", "200"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.title}`,
    default: siteConfig.title
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <AllProviders>
        {children}
        </AllProviders>
      </body>
    </html>
  );
}
