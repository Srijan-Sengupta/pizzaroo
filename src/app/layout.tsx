import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Pizzaroo - Voice-Powered Pizza Ordering",
    description: "Order your favorite pizzas using voice commands with Ollie, your pizza buddy!",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark h-full">
        <body className={`${inter.className} h-full`}>
        <div className="absolute bg-gradient-to-r from-gradStart to-gradEnd w-full h-full bg-cover">
            <Navbar/>
            {children}
        </div>
        </body>
        </html>
    )
}


import './globals.css'
import {Navbar} from "@/components/navbar";