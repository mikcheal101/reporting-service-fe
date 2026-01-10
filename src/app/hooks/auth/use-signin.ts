// app/hooks/auth/use-signin.ts
"use client";
// import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import IUseSignInHook from "@/types/auth/iuse-signin.hook";
import { useAuth } from "./use-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const useSignin = (): IUseSignInHook => {

    const { login } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [formData, setFormData] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
            await login(formData.username, formData.password, () => {
                toast({
                    variant: "default",
                    title: "Login successful",
                    description: "Welcome back!",
                });
                router.push('/dashboard');
            });
        } catch (error: unknown) {
            console.log(error);
            // console.log(error.response.data)
            // const message = error.response?.data?.error || "Something went wrong. Please try again.";
            // setError(message);
            // toast({
            //     variant: "destructive",
            //     title: "Login failed",
            //     description: message,
            // }); 
        } finally {
            setIsLoading(false);
        }
    };

    return {
        error,
        formData,
        showPassword,
        isLoading,
        setShowPassword,
        handleInputChange,
        handleSignIn,
    };
};

export default useSignin;