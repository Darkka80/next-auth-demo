'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Dashboard.module.scss';
import Button from '@/components/Button/Button';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAuthContext } from '@/Context/AuthContext';

export default function DashboardPage() {
    const router = useRouter();
    const { logout } = useAuthContext();
    const { user, isLoading } = useAuthGuard('/auth');

    if (isLoading || !user) return null;

    return (
        <main className={styles.container}>
            <div className={styles.detailSection}>
                <Image
                    src={user.picture.thumbnail}
                    alt="avatar"
                    width={80}
                    height={80}
                    className={styles.avatar}
                    unoptimized
                />
                <div>
                    <h1>به داشبورد خوش آمدید</h1>
                    <p>👋 {user.name.first} {user.name.last} سلام</p>
                </div>
            </div>

            <div className={styles.buttonWrapper}>
                <Button
                    text="خروج"
                    onClick={() => {
                        logout();
                        router.replace('/auth');
                    }}
                />
            </div>
        </main>
    );
}
