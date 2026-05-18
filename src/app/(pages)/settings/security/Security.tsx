"use client";

import React from "react";
import { FadeIn } from "@/components/ui/fade-in";

const Security = ()=>{

    return(
        <FadeIn delay={100} direction="up">
            <div className="p-4 lg:p-6">
                <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6 lg:p-8 max-w-3xl mx-auto">
                    <h2 className="text-lg font-semibold text-gray-900 pb-3 border-b border-gray-100">
                        Manage your privacy details and settings.
                        <span className="text-amber-500"> Help &amp; support</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-4">Security settings coming soon.</p>
                </div>
            </div>
        </FadeIn>
    )
};
export default Security;
