import { Resend } from 'resend';
import { WeeklyReportEmail } from '@/emails/WeeklyReport';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendReportParams {
    to: string;
    weekRange: string;
    topYields: {
        protocol: string;
        apy: number;
        chain: string;
    }[];
    marketSummary: string;
}

export async function sendWeeklyReport({ to, weekRange, topYields, marketSummary }: SendReportParams) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Skipping email send.");
        return { success: false, error: "Missing API Key" };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Rendite Intelligence <intel@rendite.fi>',
            to: [to],
            subject: `Weekly Yield Intel: ${weekRange}`,
            react: React.createElement(WeeklyReportEmail, {
                weekRange,
                topYields,
                marketSummary
            }),
        });

        if (error) {
            console.error('Error sending email:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Exception sending email:', error);
        return { success: false, error };
    }
}
