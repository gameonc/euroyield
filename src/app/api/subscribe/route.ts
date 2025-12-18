import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Service role client bypasses RLS for anonymous subscriptions
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const subscribeSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = subscribeSchema.parse(body);

        // Check if already subscribed to avoid unique constraint errors
        // or just upsert if we want to update metadata
        const { error } = await supabaseAdmin
            .from('subscribers')
            .upsert(
                {
                    email,
                    source: 'website',
                    is_active: true
                },
                { onConflict: 'email' }
            );

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to subscribe. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to Rendite Intelligence',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        console.error('Subscribe error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
