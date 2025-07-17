import "~/styles/globals.css";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { type Metadata } from "next";
import { Sora } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { Special_Gothic_Expanded_One } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Manrope } from "next/font/google";

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Laminor",
  description: "AI infrastructure services for real-world mobility.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const specialGothicExpanded = Special_Gothic_Expanded_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-gothic-expanded",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} dark font-sans antialiased`}
    >
      <body className="bg-background text-foreground">
        <AuthKitProvider>
          <ThemeProvider attribute="class">
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </AuthKitProvider>
      </body>
    </html>
  );
}
