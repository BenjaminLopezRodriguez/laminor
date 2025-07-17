import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Laminor",
  description: "AI infrastructure services for real-world mobility.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} font-sans antialiased dark`}>
      <body className="bg-background text-foreground">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
