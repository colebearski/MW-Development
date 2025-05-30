"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/80 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center h-20">
                            <img
                                src="/mw_mountain.png"
                                alt="Mountain West Web Development"
                                className="h-16 sm:h-20 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Button asChild>
                            <Link href="#contact">Get a Quote</Link>
                        </Button>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="flex md:hidden">
                        <Button asChild>
                            <Link href="#contact">Get a Quote</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background border-b">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        <Button asChild className="w-full">
                            <Link href="#contact">Get a Quote</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}