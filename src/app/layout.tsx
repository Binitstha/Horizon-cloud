"use client";

// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/sessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import ParentFolderContext, {
  ParentFolderContextType,
} from "@/context/parentFolderContext";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Hrizon-Cloud",
  icons: 'icon.png'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [parentFolderId, setParentFolderId] = useState<string | null>(null);
  return (
    <SessionWrapper>
      <ParentFolderContext.Provider
        value={{ parentFolderId, setParentFolderId }}
      >
        <html lang="en">
          <body className={inter.className + "bg-[#09090b] text-white"}>
            <main>{children}</main>
            <Toaster />
          </body>
        </html>
      </ParentFolderContext.Provider>
    </SessionWrapper>
  );
}
