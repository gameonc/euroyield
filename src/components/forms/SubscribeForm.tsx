'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface SubscribeFormProps {
    className?: string;
    placeholder?: string;
    buttonText?: string;
}

export function SubscribeForm({
    className,
    placeholder = 'Enter your email',
    buttonText = 'Subscribe',
}: SubscribeFormProps) {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<FormState>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setState('error');
            setErrorMessage('Please enter an email address');
            return;
        }

        setState('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setState('error');
                setErrorMessage(data.error || 'Failed to subscribe');
                return;
            }

            setState('success');
            setEmail('');

            // Reset to idle after 3 seconds
            setTimeout(() => setState('idle'), 3000);
        } catch {
            setState('error');
            setErrorMessage('Network error. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn('space-y-2', className)}>
            <div className="flex gap-2">
                <Input
                    type="email"
                    placeholder={placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={state === 'loading' || state === 'success'}
                    className={cn(
                        'flex-1',
                        state === 'error' && 'border-red-500 focus-visible:ring-red-500'
                    )}
                    aria-label="Email address"
                    aria-invalid={state === 'error'}
                    aria-describedby={state === 'error' ? 'subscribe-error' : undefined}
                />
                <Button
                    type="submit"
                    disabled={state === 'loading' || state === 'success'}
                    className={cn(
                        'min-w-[120px]',
                        state === 'success' && 'bg-emerald-600 hover:bg-emerald-600'
                    )}
                >
                    {state === 'loading' && (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Joining...
                        </>
                    )}
                    {state === 'success' && (
                        <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Subscribed!
                        </>
                    )}
                    {(state === 'idle' || state === 'error') && buttonText}
                </Button>
            </div>

            {/* Error message */}
            {state === 'error' && errorMessage && (
                <p
                    id="subscribe-error"
                    className="flex items-center gap-1.5 text-sm text-red-500"
                    role="alert"
                >
                    <AlertCircle className="h-4 w-4" />
                    {errorMessage}
                </p>
            )}

            {/* Success message */}
            {state === 'success' && (
                <p className="text-sm text-emerald-500">
                    Welcome to Rendite Intelligence! Check your inbox soon.
                </p>
            )}
        </form>
    );
}
