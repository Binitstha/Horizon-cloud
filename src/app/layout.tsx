// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/sessionWrapper";
import SideNav from "@/components/sideNav";
import Storage from "./storage/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hrizon-Cloud",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className + "bg-[#09090b] text-white"}>
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
