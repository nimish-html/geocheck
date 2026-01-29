import { NextRequest, NextResponse } from "next/server";
import { HttpsProxyAgent } from "https-proxy-agent";

interface GeoResult {
    country: string;
    code: string;
    flag: string;
    status: "accessible" | "blocked" | "timeout";
    responseTime: number | null;
}

const GEOS = [
    { country: "United States", code: "US", flag: "🇺🇸" },
    { country: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { country: "UAE", code: "AE", flag: "🇦🇪" },
    { country: "Canada", code: "CA", flag: "🇨🇦" },
    { country: "Germany", code: "DE", flag: "🇩🇪" },
    { country: "France", code: "FR", flag: "🇫🇷" },
    { country: "Australia", code: "AU", flag: "🇦🇺" },
    { country: "Japan", code: "JP", flag: "🇯🇵" },
];

// Thordata proxy configuration
// Docs: https://doc.thordata.com/doc/proxies/residential-proxies/making-request
const THORDATA_CONFIG = {
    host: process.env.THORDATA_PROXY_HOST || "t.pr.thordata.net",
    port: process.env.THORDATA_PROXY_PORT || "9999",
    user: process.env.THORDATA_USER || "",
    pass: process.env.THORDATA_PASS || "",
};

async function checkFromGeo(
    url: string,
    geo: (typeof GEOS)[0]
): Promise<GeoResult> {
    const startTime = Date.now();

    // If no Thordata credentials, use mock data for demo
    if (!THORDATA_CONFIG.user || !THORDATA_CONFIG.pass) {
        // Simulate network delay
        await new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 2000 + 500)
        );

        // Simulate results - 80% accessible, 10% blocked, 10% timeout
        const random = Math.random();
        let status: GeoResult["status"];
        if (random < 0.8) {
            status = "accessible";
        } else if (random < 0.9) {
            status = "blocked";
        } else {
            status = "timeout";
        }

        return {
            ...geo,
            status,
            responseTime: status !== "timeout" ? Date.now() - startTime : null,
        };
    }

    try {
        // Build proxy URL with geo-targeting
        // Format: USERNAME-country-XX:PASSWORD@host:port
        // Note: THORDATA_USER should already include any required prefix (e.g., td-customer-...)
        const proxyUsername = `${THORDATA_CONFIG.user}-country-${geo.code.toLowerCase()}`;
        const proxyUrl = `http://${proxyUsername}:${THORDATA_CONFIG.pass}@${THORDATA_CONFIG.host}:${THORDATA_CONFIG.port}`;

        // Create proxy agent
        const agent = new HttpsProxyAgent(proxyUrl);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout for proxy requests

        try {
            const response = await fetch(url, {
                method: "HEAD",
                signal: controller.signal,
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
                // @ts-expect-error - agent is valid for Node.js fetch
                agent: agent,
            });

            clearTimeout(timeoutId);

            return {
                ...geo,
                status: response.ok ? "accessible" : "blocked",
                responseTime: Date.now() - startTime,
            };
        } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
    } catch (error) {
        const isTimeout =
            error instanceof Error &&
            (error.name === "AbortError" || error.message.includes("timeout"));

        return {
            ...geo,
            status: isTimeout ? "timeout" : "blocked",
            responseTime: null,
        };
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Validate URL
        try {
            const parsedUrl = new URL(url);
            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                throw new Error("Invalid protocol");
            }
        } catch {
            return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
        }

        // Check from all geos in parallel
        const results = await Promise.all(
            GEOS.map((geo) => checkFromGeo(url, geo))
        );

        const summary = {
            accessible: results.filter((r) => r.status === "accessible").length,
            blocked: results.filter((r) => r.status === "blocked").length,
            timeout: results.filter((r) => r.status === "timeout").length,
        };

        return NextResponse.json({
            results,
            summary,
            checkedUrl: url,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error checking geo accessibility:", error);
        return NextResponse.json(
            { error: "Failed to check accessibility" },
            { status: 500 }
        );
    }
}
