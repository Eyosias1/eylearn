import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/providers";
import { cn } from "@/lib/utils";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "EyLearn",
  description: "Study smarter, not harder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={cn(jakarta.variable, mono.variable, "h-full antialiased")}
        suppressHydrationWarning
      >
      <body className={cn("min-h-svh")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
