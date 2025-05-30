"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Code, Palette, Share2, LineChart, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animation/fade-in";
import AnimatedText from "@/components/animation/animated-text";

const services = [
    {
        id: "web-design",
        title: "Web Design",
        description: "Creating beautiful, user-focused designs that engage your audience and elevate your brand.",
        icon: Palette,
        color: "from-[#FF6B6B] to-[#FF8E8E]",
        features: [
            'Responsive Layouts',
            'Custom Branding',
            'User Centered Experience'
        ]
    },
    {
        id: "web-development",
        title: "Web Development",
        description: "Building fast, responsive, and scalable websites and web applications with modern technologies.",
        icon: Code,
        color: "from-[#4ECDC4] to-[#6BDAD3]",
        features: [
            'Fast Performance',
            'Scalable Architecture',
            'Modern Tech Stack'
        ]
    },
    {
        id: "api-integration",
        title: "API Integration",
        description: "Connecting your systems and applications to streamline workflows and enhance functionality.",
        icon: Share2,
        color: "from-[#FFD166] to-[#FFE066]",
        features: [
            'Seamless Third-Party Connections',
            'Automated Workflows',
            'Custom Middleware & Logic'
        ]
    },
    {
        id: "seo",
        title: "SEO",
        description: "Optimizing your website to increase visibility and drive organic traffic from search engines.",
        icon: Globe,
        color: "from-[#6A0572] to-[#AB83A1]",
        features: [
            'Keyword & Content Optimization',
            'Technical SEO',
            'Authority Building'
        ]
    },
    {
        id: "sem",
        title: "SEM",
        description: "Strategic paid advertising to reach your target audience and drive conversions.",
        icon: LineChart,
        color: "from-[#1A936F] to-[#88D498]",
        features: [
            'Targeted Ad Campaigns',
            'Landing Page Optimization',
            'Real-Time Analytics'
        ]
    },
];

export default function ServicesSection() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section id="services" className="py-24 bg-background flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <FadeIn>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            Services
                        </span>
                    </FadeIn>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        <AnimatedText text="Transforming ideas" className="block" />
                        <AnimatedText text="into" className="block" delay={0.2}/>
                        <AnimatedText text="digital reality" className="block" delay={0.4} />
                    </h2>
                    <FadeIn delay={0.4}>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A single, powerful digital service to help you thrive online.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <FadeIn key={service.id} delay={0.1 * index} distance={30}>
                            <motion.div
                                onMouseEnter={() => setHoveredId(service.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="h-full border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group relative">
                                    <div
                                        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${service.color}`}
                                    />
                                    <CardHeader>
                                        <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10">
                                            <service.icon className="h-7 w-7 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{service.title}</CardTitle>
                                        <CardDescription className="text-muted-foreground">
                                            {service.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {service.features.map((item) => (
                                                <li key={item} className="flex items-center text-sm text-muted-foreground">
                                                    <ChevronRight className="h-4 w-4 text-primary mr-2" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" className="group" asChild>
                                            <Link href="#contact">
                                                Learn More
                                                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}