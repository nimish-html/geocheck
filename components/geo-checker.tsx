"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GeoResult {
    country: string;
    code: string;
    flag: string;
    status: "accessible" | "blocked" | "timeout" | "pending";
    responseTime: number | null;
}

const INITIAL_GEOS: GeoResult[] = [
    { country: "United States", code: "US", flag: "🇺🇸", status: "pending", responseTime: null },
    { country: "United Kingdom", code: "GB", flag: "🇬🇧", status: "pending", responseTime: null },
    { country: "UAE", code: "AE", flag: "🇦🇪", status: "pending", responseTime: null },
    { country: "Canada", code: "CA", flag: "🇨🇦", status: "pending", responseTime: null },
    { country: "Germany", code: "DE", flag: "🇩🇪", status: "pending", responseTime: null },
    { country: "France", code: "FR", flag: "🇫🇷", status: "pending", responseTime: null },
    { country: "Australia", code: "AU", flag: "🇦🇺", status: "pending", responseTime: null },
    { country: "Japan", code: "JP", flag: "🇯🇵", status: "pending", responseTime: null },
];

export default function GeoChecker() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<GeoResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    const isValidUrl = (urlString: string): boolean => {
        try {
            const url = new URL(urlString);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    };

    const handleCheck = async () => {
        if (!url.trim()) {
            setError("Please enter a URL");
            return;
        }

        if (!isValidUrl(url)) {
            setError("Please enter a valid URL (starting with http:// or https://)");
            return;
        }

        setError(null);
        setIsLoading(true);
        setResults(INITIAL_GEOS.map(g => ({ ...g, status: "pending" as const, responseTime: null })));

        try {
            const response = await fetch("/api/check-geo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error("Failed to check accessibility");
            }

            const data = await response.json();
            setResults(data.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status: GeoResult["status"]) => {
        switch (status) {
            case "accessible":
                return "✅";
            case "blocked":
                return "❌";
            case "timeout":
                return "⚠️";
            case "pending":
                return "⏳";
        }
    };

    const getStatusColor = (status: GeoResult["status"]) => {
        switch (status) {
            case "accessible":
                return "text-green-500";
            case "blocked":
                return "text-red-500";
            case "timeout":
                return "text-yellow-500";
            case "pending":
                return "text-muted-foreground";
        }
    };

    const accessibleCount = results.filter((r) => r.status === "accessible").length;
    const totalChecked = results.filter((r) => r.status !== "pending").length;

    return (
        <div className="relative justify-center items-center">
            <section className="max-w-(--breakpoint-xl) mx-auto px-4 py-20 gap-12 md:px-8 flex flex-col justify-center items-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0 }}
                    className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
                >
                    <span className="w-fit h-full text-sm bg-card px-3 py-1.5 border border-border rounded-full flex items-center gap-2">
                        🌍 Powered by Thordata
                    </span>
                    <h1 className="text-4xl font-medium tracking-tighter mx-auto md:text-6xl text-pretty bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">
                        Check if your website works worldwide
                    </h1>
                    <p className="max-w-2xl text-lg mx-auto text-muted-foreground text-balance">
                        Instantly verify your website&apos;s accessibility across 8 countries using residential proxies
                    </p>
                </motion.div>

                {/* URL Input Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0 }}
                    className="w-full max-w-2xl"
                >
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <Input
                            type="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 h-12 px-4 text-base"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleCheck}
                            disabled={isLoading}
                            className="h-12 px-8 shadow-lg"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Checking...
                                </span>
                            ) : (
                                "Check Accessibility"
                            )}
                        </Button>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                    )}
                </motion.div>

                {/* Results Grid */}
                {results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl"
                    >
                        {/* Summary */}
                        {totalChecked > 0 && (
                            <div className="text-center mb-6">
                                <span className="text-lg font-medium">
                                    {accessibleCount} of {totalChecked} regions accessible
                                </span>
                            </div>
                        )}

                        {/* Results Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {results.map((result, index) => (
                                <motion.div
                                    key={result.code}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className={`transition-all duration-300 ${result.status === "pending" ? "opacity-60" : ""
                                        }`}>
                                        <CardContent className="p-4 text-center">
                                            <div className="text-4xl mb-2">{result.flag}</div>
                                            <div className="font-medium text-sm mb-1">{result.country}</div>
                                            <div className={`text-2xl ${getStatusColor(result.status)}`}>
                                                {getStatusIcon(result.status)}
                                            </div>
                                            {result.responseTime !== null && (
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    {result.responseTime}ms
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Background glow effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
                className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none"
            >
                <div className="w-3/4 flex justify-center items-center">
                    <div className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl max-sm:rotate-15 sm:rotate-35 will-change-transform"></div>
                </div>
            </motion.div>
        </div>
    );
}
