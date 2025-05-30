"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
    text: string;
    className?: string;
    once?: boolean;
    delay?: number;
    el?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function AnimatedText({
    text,
    className,
    once = true,
    delay = 0,
    el: Element = "div",
}: AnimatedTextProps) {
    const textRef = useRef<HTMLElement | null>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && (!once || !hasAnimated.current)) {
                    hasAnimated.current = true;

                    const textElement = textRef.current;
                    if (!textElement) return;

                    const letters = text.split("");
                    textElement.innerHTML = "";

                    letters.forEach((letter, index) => {
                        const span = document.createElement("span");
                        span.textContent = letter === " " ? "\u00A0" : letter;
                        span.style.opacity = "0";
                        span.style.transform = "translateY(20px)";
                        span.style.display = "inline-block";
                        span.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
                        span.style.transitionDelay = `${delay + index * 0.03}s`;
                        textElement.appendChild(span);

                        setTimeout(() => {
                            span.style.opacity = "1";
                            span.style.transform = "translateY(0)";
                        }, 10);
                    });
                } else if (!entry.isIntersecting && !once) {
                    hasAnimated.current = false;
                    const textElement = textRef.current;
                    if (textElement) {
                        textElement.innerHTML = text;
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, [text, once, delay]);

    return (
        <Element
            ref={textRef as any}
            className={cn("inline-block", className)}
        >
            {text}
        </Element>
    );
}