import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ReduxProvider from "./lib/services/StoreProvider";
import InitialDataLoader from "./lib/services/InitialDataLoader";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STEAMLAND.RU - Интернет магазин недорогих ключей Steam",
  description:
    "Купите ключи для игр Steam по выгодным ценам в нашем магазине. Большой выбор игр для различных платформ. Моментальная доставка после оплаты. Гарантия качества и надежности.",
  keywords:
    "магазин ключей Steam, купить ключи игр, дешевые ключи Steam, акционные предложения игр, онлайн магазин игровых ключей, купить игры по скидке",
  authors: [{ name: "https://t.me/RSallaz" }],
  other: {
    "yandex-verification": "7ae03fc6241f32df",
    "google-site-verification": "TapoQYaW6HYEZhpwylWp-vR7tDaSDKz59LfjR8Fp-ps",
    "msapplication-TileColor": "#da532c",
    "theme-color": "#da532c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <ReduxProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
        <InitialDataLoader />
      </ReduxProvider>
    </html>
  );
}
