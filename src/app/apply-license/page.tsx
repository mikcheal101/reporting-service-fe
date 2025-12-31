"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { buildUrl } from "@/app/utils/urlBuilder";

export default function ApplyLicensePage() {
  const { toast } = useToast();
  const [licenseKey, setLicenseKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_APPLY_LICENSE;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!endpoint) {
        toast({
          variant: "destructive",
          title: "No license endpoint configured",
          description: "Please contact support to configure license endpoint.",
        });
        return;
      }

      const url = buildUrl(endpoint);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });

      if (!res.ok) {
        const msg = (await res.text()) || "Failed to apply license";
        toast({ variant: "destructive", title: "Apply failed", description: msg });
        return;
      }

      toast({ title: "License applied", description: "You can now log in." });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Apply failed",
        description: "Unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Apply License Key</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="licenseKey"
              placeholder="Enter license key"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-[#131313] rounded-lg hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !licenseKey.trim()}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Applying...
              </span>
            ) : (
              "Apply License Key"
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-700">
          <Link href="/signin" className="text-blue-600 underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

