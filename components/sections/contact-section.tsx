"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import FadeIn from "@/components/animation/fade-in";
import AnimatedText from "@/components/animation/animated-text";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    company: z.string().optional(),
    phone: z.string().optional(),
    service: z.string().min(1, { message: "Please select a service." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
    bot_field: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            phone: "",
            service: "",
            message: "",
            bot_field: ""
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            if (data.bot_field && data.bot_field.trim() !== "") {
                // Looks like spam
                throw new Error("Invalid request.");
            }

            // Remove bot field
            const { bot_field, ...cleanData } = data;

            const { error } = await supabase.from("contact_submissions").insert([
                {
                    ...cleanData
                },
            ]);

            if (error) throw error;

            toast({
                title: "Message sent!",
                description: "We'll get back to you as soon as possible.",
            });

            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <FadeIn>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            Get In Touch
                        </span>
                    </FadeIn>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        <AnimatedText text="Ready to start your" className="block" />
                        <AnimatedText text="digital journey?" className="block" delay={0.2} />
                    </h2>
                    <FadeIn delay={0.4}>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Tell me about your project.
                        </p>
                    </FadeIn>
                </div>
                <div className="flex justify-center">
                    <FadeIn direction="right">
                        <Card className="w-full max-w-4xl border border-border px-6 py-8 mx-auto">
                            <CardHeader>
                                <CardTitle>Send Us a Message</CardTitle>
                                <CardDescription>
                                    Fill out the form below.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Your name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="your.email@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="company"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Company</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Your company (optional)" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Your phone (optional)" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="service"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Service</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a service" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="web-design">Web Design</SelectItem>
                                                            <SelectItem value="web-development">Web Development</SelectItem>
                                                            <SelectItem value="api-integration">API Integration</SelectItem>
                                                            <SelectItem value="seo">SEO</SelectItem>
                                                            <SelectItem value="sem">SEM</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us about your project"
                                                            className="resize-none min-h-[120px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="bot_field"
                                            render={({ field }) => (
                                                <div style={{ display: 'none' }}>
                                                    <input type="text" autoComplete="off" {...field} />
                                                </div>
                                            )}
                                        />
                                        <Button type="submit" className="w-full" disabled={isSubmitting} variant="outline" style={{ cursor: "pointer" }}>
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}