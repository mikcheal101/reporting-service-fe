"use client";

import { FadeIn } from "@/components/ui/fade-in";

export default function Page() {
    return (
        <FadeIn delay={100} direction="up">
            <div className="p-4 lg:p-6">
                <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-800">Audit Logs</h2>
                    <p className="text-sm text-gray-500 mt-1">Audit log functionality coming soon.</p>
                </div>
            </div>
        </FadeIn>
    )
}