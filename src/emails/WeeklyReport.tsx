import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface WeeklyReportEmailProps {
    weekRange: string;
    topYields: {
        protocol: string;
        apy: number;
        chain: string;
    }[];
    marketSummary: string;
}

export const WeeklyReportEmail = ({
    weekRange = "Dec 16 - Dec 22",
    topYields = [
        { protocol: "Aave V3", apy: 5.24, chain: "Ethereum" },
        { protocol: "Morpho Blue", apy: 7.45, chain: "Ethereum" },
        { protocol: "Curve", apy: 4.87, chain: "Polygon" },
    ],
    marketSummary = "Euro stablecoin yields have seen a slight uptick across Ethereum mainnet, driven by increased demand for leverage on Morpho Blue. Aave rates remain stable.",
}: WeeklyReportEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Rendite Weekly Intel: {weekRange}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                background: "#020817",
                                foreground: "#f8fafc",
                                primary: "#10b981", // Emerald
                                muted: "#94a3b8",
                                border: "#1e293b",
                                card: "#0f172a",
                            },
                        },
                    },
                }}
            >
                <Body className="bg-background text-foreground font-sans my-auto mx-auto px-2">
                    <Container className="border border-border rounded my-[40px] p-[20px] max-w-[465px] mx-auto bg-card">
                        {/* Header */}
                        <Section className="mt-[32px]">
                            <div className="flex items-center gap-2 mb-4">
                                <Text className="text-2xl font-bold tracking-tight text-white m-0">
                                    Rendite<span className="text-primary">.fi</span>
                                </Text>
                            </div>
                            <Heading className="text-white text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Weekly Intel
                            </Heading>
                            <Text className="text-muted text-[14px] leading-[24px] text-center">
                                {weekRange}
                            </Text>
                        </Section>

                        {/* Market Summary */}
                        <Section className="my-[32px]">
                            <Text className="text-foreground text-[16px] leading-[26px]">
                                {marketSummary}
                            </Text>
                        </Section>

                        {/* Top Yields Table */}
                        <Section className="my-[32px] border border-border rounded overflow-hidden">
                            <div className="w-full">
                                <div className="grid grid-cols-3 bg-border/50 p-2 border-b border-border">
                                    <Text className="text-muted text-[12px] font-bold uppercase m-0">Protocol</Text>
                                    <Text className="text-muted text-[12px] font-bold uppercase m-0 text-center">APY</Text>
                                    <Text className="text-muted text-[12px] font-bold uppercase m-0 text-right">Chain</Text>
                                </div>
                                {topYields.map((yieldItem, index) => (
                                    <div key={index} className="grid grid-cols-3 p-3 border-b border-border last:border-0">
                                        <Text className="text-white text-[14px] font-medium m-0">{yieldItem.protocol}</Text>
                                        <Text className="text-primary text-[14px] font-mono font-medium m-0 text-center">{yieldItem.apy.toFixed(2)}%</Text>
                                        <Text className="text-muted text-[12px] m-0 text-right capitalize">{yieldItem.chain}</Text>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {/* CTA */}
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Link
                                className="bg-primary hover:bg-emerald-400 text-black rounded px-8 py-3 text-[14px] font-semibold no-underline"
                                href="https://rendite.fi"
                            >
                                Launch Terminal
                            </Link>
                        </Section>

                        <Hr className="border-border my-[26px] mx-0 w-full" />

                        {/* Footer */}
                        <Section>
                            <Text className="text-muted text-[12px] leading-[24px]">
                                You are receiving this because you subscribed to Rendite Intelligence.
                                <br />
                                Rendite.fi - European DeFi Analytics
                            </Text>
                            <Link href="https://rendite.fi/settings" className="text-muted underline text-[12px]">
                                Unsubscribe
                            </Link>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WeeklyReportEmail;
