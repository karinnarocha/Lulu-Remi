import { Annie_Use_Your_Telescope, Caveat_Brush } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";

const annie = Annie_Use_Your_Telescope({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-annie",
});

const caveat = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat-brush",
});

export const metadata = {
  title: "Lulu & Remi | The sticker coloring book that all kids love!",
  description:
    "Lulu & Remi creates interactive sticker-coloring books that inspire creativity. Fun, educational, and peelable sticker pages kids love!",
  keywords: [
    "kids coloring book",
    "sticker coloring book",
    "interactive sticker book",
    "Lulu & Remi",
    "children’s activity book",
    "Sukkot coloring book",
    "educational kids book",
    "creative kids activities",
  ],
  metadataBase: new URL("https://lulunremi.com"),
  alternates: {
    canonical: "https://lulunremi.com",
  },
  openGraph: {
    title: "Lulu & Remi | Interactive Sticker-Coloring Books for Kids",
    description:
      "Peel it, color it, play! Discover interactive sticker-coloring books kids love.",
    url: "https://lulunremi.com",
    siteName: "Lulu & Remi",
    images: [
      {
        url: "/images/luluRemiBlack.PNG",
        width: 1200,
        height: 630,
        alt: "Lulu & Remi interactive sticker coloring book logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lulu & Remi Sticker-Coloring Books",
    description:
      "Interactive peelable sticker coloring books that spark creativity in kids!",
    images: ["/images/luluRemiBlack.PNG"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="public/png" />

        <Script
          id="ld-json-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lulu & Remi",
              url: "https://lulunremi.com",
              logo: "https://lulunremi.com/images/luluRemiBlack.PNG",
              sameAs: [
                "https://www.instagram.com/lulunremi/",
                "https://www.pinterest.com/lulunremi/",
                "https://www.facebook.com/lulunremibrand",
              ],
            }),
          }}
        />
      </head>

      <body className={`${annie.variable} ${caveat.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
