
// app/page.tsx
"use client";



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        // Check the sign-in status and redirect accordingly
        if (isSignedIn) {
            router.push("/dashboard");
        } else {
            router.push("/signin");
        }
    }, [isSignedIn, router]);

    return null;
}
