"use client";

import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

const Notifications = ()=>{

    return (
        <FadeIn delay={100} direction="up">
            <div className="p-4 lg:p-6">
                <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6 lg:p-8 max-w-3xl mx-auto">
                    <h1 className="text-xl font-bold text-gray-900 mb-6">Update your notification preferences.</h1>

                    <section className="mb-8">
                        <h2 className="text-base font-semibold text-gray-800 mb-4">Notify me when</h2>
                        <div className="space-y-3">
                            {[
                                "Task is assigned to me",
                                "A loan is created",
                                "A loan is approved for payout",
                                "Borrower is due for payment",
                            ].map((label) => (
                                <label key={label} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                    <span className="text-sm text-gray-700">{label}</span>
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                                </label>
                            ))}
                        </div>
                    </section>

                    <hr className="border-t border-gray-100 mb-8"/>

                    <section>
                        <h2 className="text-base font-semibold text-gray-800 mb-4">Medium</h2>
                        <div className="space-y-4">
                            {[
                                { title: "Email notification", desc: "Receive email notifications whenever your attention is required" },
                                { title: "Mobile push Notification", desc: "Receive mobile notifications whenever your attention is required" },
                                { title: "Desktop Notification", desc: "Receive desktop notifications whenever your attention is required" },
                                { title: "In-app notification", desc: "Show notifications in-app" },
                            ].map(({ title, desc }) => (
                                <label key={title} className="flex justify-between items-start py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                                    </div>
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"/>
                                </label>
                            ))}
                        </div>
                    </section>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
export default Notifications;
