// app/page.tsx
"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/auth/use-auth";

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.replace('/dashboard');
            } else {
                router.replace('/signin');
            }
        }
    }, [user, loading, router]);

    return null;
}
