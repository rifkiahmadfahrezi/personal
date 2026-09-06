import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";
import { AllProviders } from "@/components/providers";
import { VersionChecker } from "@/components/version-checker";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s — ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.title, url: siteConfig.url }],
  creator: siteConfig.title,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 630,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rifki Ahmad Fahrezi",
              url: siteConfig.url,
              image: `${siteConfig.url}/me.png`,
              jobTitle: "Front-end Developer",
              worksFor: {
                "@type": "Organization",
                name: "Ganesha Operation",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bandung",
                addressCountry: "ID",
              },
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.linkedin,
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AllProviders>{children}</AllProviders>
        <VersionChecker />
      </body>
    </html>
  );
}
