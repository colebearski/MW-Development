"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setHidden(false);
        };

        const handleMouseDown = () => setClicked(true);
        const handleMouseUp = () => setClicked(false);

        const handleMouseLeave = () => setHidden(true);
        const handleMouseEnter = () => setHidden(false);

        const handleLinkHoverStart = () => setLinkHovered(true);
        const handleLinkHoverEnd = () => setLinkHovered(false);

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mouseenter", handleMouseEnter);

        const links = document.querySelectorAll("a, button");
        links.forEach((link) => {
            link.addEventListener("mouseenter", handleLinkHoverStart);
            link.addEventListener("mouseleave", handleLinkHoverEnd);
        });

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mouseenter", handleMouseEnter);

            links.forEach((link) => {
                link.removeEventListener("mouseenter", handleLinkHoverStart);
                link.removeEventListener("mouseleave", handleLinkHoverEnd);
            });
        };
    }, []);

    // Only show custom cursor on desktop
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
        return null;
    }

    return (
        <>
            <div
                className={cn(
                    "fixed z-[9999] pointer-events-none w-6 h-6 rounded-full border-2 border-primary transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2",
                    hidden && "opacity-0",
                    clicked && "scale-90",
                    linkHovered && "scale-150"
                )}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "0.2s, 0.1s",
                }}
            />
            <div
                className={cn(
                    "fixed z-[9999] pointer-events-none w-1 h-1 bg-primary rounded-full transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2",
                    hidden && "opacity-0",
                    linkHovered && "opacity-0"
                )}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
        </>
    );
}