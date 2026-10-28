import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flashings-and-fabrications.co.uk"),
  title: {
    default: "Flashings & Fabrications | Architectural metalwork, Littlehampton",
    template: "%s | Flashings & Fabrications",
  },
  description:
    "Made-to-order metal flashings, rainwater systems, louvres, rainscreen panels and architectural features, fabricated and powder coated in Littlehampton, West Sussex and supplied nationwide.",
  // Design preview: keep out of search until launch on the live domain.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${jost.variable} ${inter.variable}`}>
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
