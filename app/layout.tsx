import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Repositório Acadêmico ADS",
  description: "Repositório de links e documentos do curso de ADS da FMP.",
  icons: { icon: "/fmp-icon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#0a2540]">
        {children}
      </body>
    </html>
  );
}
