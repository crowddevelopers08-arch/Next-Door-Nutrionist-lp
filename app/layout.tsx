import type { Metadata } from "next";
import { Manrope, Outfit, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Next Door Nutritionist | Hormone Nutrition Clinic",
  description:
    "Personalized nutrition care for hormonal health, PCOS, fertility, and sustainable wellness with Next Door Nutritionist.",
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/du6mjguvb/image/upload/favh_yq5qyc",
        type: "image/png",
      },
    ],
    apple:
      "https://res.cloudinary.com/du6mjguvb/image/upload/favh_yq5qyc",
    shortcut:
      "https://res.cloudinary.com/du6mjguvb/image/upload/favh_yq5qyc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>

      <body
        className={`${manrope.variable} ${playfair.variable} ${outfit.variable} font-body selection:bg-[#624452] selection:text-[#dbb3c4]`}
      >
        {/* Facebook Pixel NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2105034277099832&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}