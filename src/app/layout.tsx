"use client";

// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/sessionWrapper";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import ParentFolderContext from "@/context/parentFolderContext";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Hrizon-Cloud",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [parentFolderId, setParentFolderId] = useState<string>('');
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
