import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "MapGeo",
  description: "Interactive Map",
  viewport: "width=device-width, initial-scale=1",
    keywords: "Map, Interactive Map, POI, Points of Interest, Geo, Baku, Azerbaijan",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
