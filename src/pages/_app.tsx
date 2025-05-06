import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css"; 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <div className={`min-h-screen flex flex-col ${inter.variable}`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
