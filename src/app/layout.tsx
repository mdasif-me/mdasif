import "@/styles/globals.css"

import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import Navigation from "@/components/navigation/navigation"

import { rootMetadata } from "../../config"
import { RootWrapper } from "./root-wrapper"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootWrapper>
          <Navigation />
          <main className="container mx-auto">{children}</main>
        </RootWrapper>
      </body>
    </html>
  )
}

export const metadata: Metadata = { ...rootMetadata }
