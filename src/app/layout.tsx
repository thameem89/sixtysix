import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StudioProvider } from "@/components/StudioProvider";
import { salonConfig } from "@/data/salon";
export const metadata: Metadata = {
  metadataBase: new URL(salonConfig.siteUrl || "http://127.0.0.1:3000"),
  title: {
    default: "SIXTY SIX — Men’s Grooming Lounge | Ajman",
    template: "%s | SIXTY SIX, Ajman",
  },
  description:
    "Premium men’s grooming in Ajman. Explore precision haircuts, beard grooming, shaving rituals and men’s skincare. Opening January 2027.",
  ...(salonConfig.siteUrl
    ? {
        metadataBase: new URL(salonConfig.siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    title: "SIXTY SIX — Men’s Grooming Lounge",
    description: "Precision. Presence. You. Opening in Ajman, January 2027.",
    images: [{ url: "/images/launch-poster.png", width: 1050, height: 600 }],
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/launch-poster.png"],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: salonConfig.name,
    description:
      "Premium men’s grooming lounge. Scheduled to open January 2027.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Helio 2, Al Zahia",
      addressLocality: "Ajman",
      addressCountry: "AE",
    },
    ...(salonConfig.siteUrl ? { url: salonConfig.siteUrl } : {}),
    ...(salonConfig.phone ? { telephone: salonConfig.phone } : {}),
    image: salonConfig.logo,
  };
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <StudioProvider>
          <Header />
          {children}
          <Footer />
        </StudioProvider>
      </body>
    </html>
  );
}
