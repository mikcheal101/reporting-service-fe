"use client";

import Image from "next/image";
import companyLogo from "../../../../public/assets/companylogo.png";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSignin from "@/app/hooks/auth/use-signin";

const SignInPage = () => {
    const hook = useSignin();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-2xl shadow-xl border border-border">
                <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-4">
                        <Image 
                            src={companyLogo} 
                            alt="Alcestis Reporting" 
                            fill
                            className="object-contain"
                            priority 
                        />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-card-foreground">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={hook.handleSignIn}>
                    <div className="space-y-5">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="username"
                                name="username"
                                type="email"
                                autoComplete="username"
                                required
                                value={hook.formData.username}
                                onChange={hook.handleInputChange}
                                className="pl-10"
                                placeholder="Email address / username"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="password"
                                name="password"
                                type={hook.showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={hook.formData.password}
                                onChange={hook.handleInputChange}
                                className="pl-10 pr-10"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => hook.setShowPassword(!hook.showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {hook.showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={hook.isLoading}
                        className="w-full"
                        size="lg"
                    >
                        {hook.isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin h-5 w-5" />
                                Signing in...
                            </span>
                        ) : (
                            "Sign in"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;