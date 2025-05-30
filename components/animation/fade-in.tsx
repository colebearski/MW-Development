"use client";

import { useRef, useEffect, ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
}

export default function FadeIn({
    children,
    className,
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 20,
    once = true,
}: FadeInProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const getTransform = () => {
            switch (direction) {
                case "up":
                    return `translateY(${distance}px)`;
                case "down":
                    return `translateY(-${distance}px)`;
                case "left":
                    return `translateX(${distance}px)`;
                case "right":
                    return `translateX(-${distance}px)`;
                default:
                    return `translateY(${distance}px)`;
            }
        };

        const resetStyles = () => {
            element.style.opacity = "0";
            element.style.transform = getTransform();
        };

        const animateIn = () => {
            element.style.transition = `opacity ${duration}s ease, transform ${duration}s ease`;
            element.style.transitionDelay = `${delay}s`;
            element.style.opacity = "1";
            element.style.transform = "translate(0, 0)";
        };

        // Initial setup
        resetStyles();

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && (!once || !hasAnimated.current)) {
                    hasAnimated.current = true;
                    requestAnimationFrame(animateIn);
                } else if (!entry.isIntersecting && !once) {
                    hasAnimated.current = false;
                    requestAnimationFrame(resetStyles);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [direction, delay, duration, distance, once]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}