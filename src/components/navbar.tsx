'use client'
import Link from "next/link"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import Hamburger from 'hamburger-react'
import React from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b bg-opacity-75z">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="pizza-icon.svg"
                        alt="Pizza slice"
                        width={32}
                        height={32}
                    />
                    <span
                        className="text-transparent text-xl font-bold bg-clip-text bg-gradient-to-r from-primary to-secondary neon-glow">Pizzaroo</span>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link href="mailto:contact@pannalabs.ai" className="text-foreground/80 hover:text-foreground">
                        Contact Us
                    </Link>

                    <Button variant="default" className="bg-primary hover:bg-primary/90">
                        Start Voice Call
                    </Button>
                </div>
                <div className="md:hidden flex items-center space-x-6">
                    <Hamburger toggled={isOpen} toggle={setIsOpen}/>
                    {isOpen && (
                        <div className="z-10 absolute w-fit h-fit mt-16 top-0 right-0 pr-2 flex flex-col justify-center items-center space-y-2 backdrop-blur-lg bg-opacity-0">
                            <Link href="mailto:contact@pannalabs.ai"
                                  className="text-foreground/80 hover:text-foreground">
                                Contact Us
                            </Link>

                            <Button variant="default" className="bg-primary hover:bg-primary/90">
                                Start Voice Call
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

