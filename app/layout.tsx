import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PERSON } from "@/lib/content";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Milind Gauns — Where Engineering Meets Data";
const description =
  "Electrical engineer turned analyst. After-sales operations at Godrej, a grain logistics model in implementation with the Government of Goa, and an incoming PGDM in Big Data Analytics at Goa Institute of Management.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: PERSON.name }],
  keywords: [
    "Milind Gauns",
    "data analytics",
    "Goa Institute of Management",
    "NIT Goa",
    "operations",
    "portfolio",
  ],
  openGraph: {
    title,
    description,
    type: "profile",
    siteName: PERSON.name,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E0E10",
  width: "device-width",
  initialScale: 1,
};

// Hides the intro before first paint on repeat visits in the same session.
const introScript =
  "try{sessionStorage.getItem('mg-intro-seen')==='1'&&document.documentElement.classList.add('intro-seen')}catch(e){}";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-base font-sans text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {children}
      </body>
    </html>
  );
}
