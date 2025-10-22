import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "vikashsharma.dev | Learn, Build, Share",
    template: "%s | vikashsharma.dev",
  },
  description:
    "A modern blog sharing insights on web development, JavaScript, React, and best practices.",
  applicationName: "vikashsharma.dev",
  authors: [{ name: "vikashsharma.dev" }],
  generator: "Next.js",
  keywords: [
    "blog",
    "web development",
    "javascript",
    "react",
    "nextjs",
    "tutorials",
  ],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "vikashsharma.dev | Learn, Build, Share",
    description:
      "A modern blog sharing insights on web development, JavaScript, React, and best practices.",
    url: "/",
    siteName: "vikashsharma.dev",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "vikashsharma.dev | Learn, Build, Share",
    description:
      "A modern blog sharing insights on web development, JavaScript, React, and best practices.",
    creator: "@your_handle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-locator-target="vscode://file/${projectPath}${filePath}:${line}:${column}"
      lang="en"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
