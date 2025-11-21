import "@/styles/globals.css"

import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Header } from "@/components"

import Navigation from "@/components/navigation/navigation"
import { StructuredData } from "@/components/structured-data"
import Contact from "@/features/contact"
import { FAQ } from "@/features/faq"
import { Reviews } from "@/features/reviews"

import { rootMetadata } from "../../config"
import { RootWrapper } from "./root-wrapper"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
})

export const metadata: Metadata = rootMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="canonical" href="https://muhammadasif.me" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="q67LctONh7flblZgA_hUYpkWdN-7Ne1BFF_Ta1FASMU"
        />
        <meta name="msvalidate.01" content="9BB28E77EF2F809F7199B8319840DC48" />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootWrapper>
          <Navigation />
          <main className="container mx-auto">{children}</main>
          <div className="container mx-auto my-7">
            <div className="mt-20 border-wrapper !border-[#1A1A1A] md:p-5 p-1 md:space-y-10 space-y-3">
              <Header name="REVIEWS" />
              <Reviews />
            </div>
            <div className="mt-28 md:space-y-10 space-y-3">
              <Header name="FREQUENTLY ASKED QUESTIONS" />
              <FAQ />
            </div>
            <div className="mt-28 md:space-y-10 space-y-3">
              <Contact />
            </div>
          </div>
        </RootWrapper>
      </body>
    </html>
  )
}
