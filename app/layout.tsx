import type { Metadata } from "next";
import { Manrope, Outfit, Playfair_Display } from "next/font/google";
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
      { url: 'https://res.cloudinary.com/du6mjguvb/image/upload/favh_yq5qyc', type: 'image/png' },
    ],
    apple: 'https://res.cloudinary.com/du6mjguvb/image/upload/favh_yq5qyc',
    shortcut: 'https://res.cloudinary.com/du6mjguvb/image/upload/favh_yq5qyc',
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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1507435817260520');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1507435817260520&ev=PageView&noscript=1"/>
            `
          }}
        />
        {/* End Meta Pixel Code */}
        
        {/* Clarity Tracking Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xnterqf6v7");
            `
          }}
        />
        {/* End Clarity Tracking Code */}
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} ${outfit.variable} font-body selection:bg-[#624452] selection:text-[#dbb3c4]`}
      >
        {children}
      </body>
    </html>
  );
}