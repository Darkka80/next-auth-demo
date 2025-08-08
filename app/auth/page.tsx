'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/validators/loginSchema';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useAuthContext } from '@/Context/AuthContext';
import styles from './AuthPage.module.scss';
import Image from 'next/image';
import { mapRandomUser } from '@/lib/mapRandomUser';
import { randomUserSchema } from '@/validators/randomUserSchema';

export default function AuthPage() {
    const router = useRouter();
    const { login, ready, user } = useAuthContext();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        if (ready && user) router.replace('/dashboard');
    }, [ready, user, router]);

    const onSubmit = async () => {
        setError(null);

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 10000);

        try {
            const res = await fetch('https://randomuser.me/api/?results=1&nat=us', {
                cache: 'no-store',
                signal: controller.signal,
            });
            if (!res.ok) throw new Error('request_failed');

            const data = await res.json();

            const parsed = randomUserSchema.safeParse(data);
            if (!parsed.success) throw new Error('invalid_payload');

            const u = mapRandomUser(parsed.data);

            login(u);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err?.name === 'AbortError'
                ? 'اتصال کند است. لطفاً دوباره تلاش کنید'
                : 'مشکلی در ورود پیش آمد. لطفاً دوباره تلاش کنید');
        } finally {
            clearTimeout(id);
        }
    };

    if (!ready) return null;

    return (
        <main className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image src="/logo.png" width={150} height={150} alt="Logo" priority />
            </div>

            <div className={styles.header}>
                <h1>خوش آمدید</h1>
                <p className={styles.text}>همین حالا وارد شوید</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Input
                    label="شماره موبایل"
                    placeholder="09xxxxxxxxx"
                    aria-invalid={!!errors.phone || undefined}
                    {...register('phone')}
                    error={errors.phone?.message}
                />

                <div className={styles.buttonWrapper}>
                    <Button
                        text={isSubmitting ? '...در حال ورود' : 'ورود'}
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    />
                </div>

                {error && (
                    <p className={styles.error} role="alert">
                        {error}
                    </p>
                )}
            </form>
        </main>
    );
}
