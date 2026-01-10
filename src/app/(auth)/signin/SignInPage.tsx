"use client";

import Image from "next/image";
import companyLogo from "../../../../public/assets/companylogo.png";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, Loader2 } from "lucide-react";
import useSignin from "@/app/hooks/auth/use-signin";


const SignInPage = () => {
    const hook = useSignin();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-4">
                        <Image 
                            src={companyLogo} 
                            alt="Fortuna" 
                            fill
                            className="object-contain"
                            priority 
                        />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={hook.handleSignIn}>
                    <div className="space-y-5">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                            </div>
                            <input
                                id="username"
                                name="username"
                                type="email"
                                autoComplete="username"
                                required
                                value={hook.formData.username}
                                onChange={hook.handleInputChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white"
                                placeholder="Email address / username"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={hook.showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={hook.formData.password}
                                onChange={hook.handleInputChange}
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => hook.setShowPassword(!hook.showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {hook.showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {hook.error && (
                        <div className="rounded-md bg-red-50 p-4 border border-red-100">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Authentication Error
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{hook.error}</p>
                                        {hook.error.toLowerCase().includes("subscription expired") && (
                                            <p className="mt-2">
                                                <a href="/apply-license" className="font-medium underline hover:text-red-900">
                                                    Apply License Key
                                                </a>
                                                {' '}to restore access.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={hook.isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {hook.isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;