"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import axios from "axios";
import Image from "next/image";
import companyLogo from "../../../../public/assets/companylogo.png";
import { buildUrl } from "@/app/utils/urlBuilder";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, Loader2 } from "lucide-react";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

interface UserData {
    email: string;
    password: string;
}

interface TokenPayload {
    given_name: string;
    family_name: string;
    role?: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    errors: string[];
    timestamp: string;
    requestId: string;
    data: {
        token: string;
        expiration: string;
    };
}

const SignInPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState<UserData>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const authenticate = process.env.NEXT_PUBLIC_AUNTHENTICATE;
    const baseUrl = buildUrl(authenticate);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post<ApiResponse>(
                baseUrl,
                formData
            );

            console.log(response);

            // Check if the API response indicates success
            if (!response.data.success) {
                setError(response.data.message || "Authentication failed");
                return;
            }

            const { token } = response.data.data;
            const tokenPayload = JSON.parse(atob(token.split(".")[1])) as TokenPayload;

            console.log('token: ', tokenPayload);

            const user = {
                name: `${tokenPayload.given_name} ${tokenPayload.family_name}`,
                role: tokenPayload.role || "User",
            };

            // Set cookie to expire in 10 minutes
            Cookies.set('authToken', token, {
                expires: 10 / (24 * 60),
                secure: true,
                sameSite: 'strict'
            });
            safeLocalStorage.setItem("user", JSON.stringify(user));
            toast({
                variant: "default",
                title: "Login successful",
                description: "Welcome back!",
            });
            
            // Force navigation to dashboard
            window.location.href = "/dashboard";
        } catch (error: any) {
            console.log(error.response.data)
            const message = error.response?.data?.error || "Something went wrong. Please try again.";
            setError(message);
            toast({
                variant: "destructive",
                title: "Login failed",
                description: message,
            }); 
        } finally {
            setIsLoading(false);
        }
    };

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

                <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                    <div className="space-y-5">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white"
                                placeholder="Email address"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-4 border border-red-100">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Authentication Error
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                        {error.toLowerCase().includes("subscription expired") && (
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
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isLoading ? (
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