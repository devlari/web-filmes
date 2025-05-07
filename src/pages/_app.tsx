import "@/app/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/auth/auth.context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <AuthProvider>
        <div className={`min-h-screen flex flex-col ${inter.variable}`}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}