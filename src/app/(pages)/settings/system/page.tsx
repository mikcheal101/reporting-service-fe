"use client";

import { FadeIn } from "@/components/ui/fade-in";

export default function Page() {
    return (
        <FadeIn delay={100} direction="up">
            <div className="p-4 lg:p-6">
                <div className="rounded-xl bg-white dark:bg-card shadow-sm border border-gray-100 dark:border-border p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">System</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">System settings coming soon.</p>
                </div>
            </div>
        </FadeIn>
    )
}