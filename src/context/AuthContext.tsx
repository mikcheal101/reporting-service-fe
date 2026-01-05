"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';

interface User {
    firstName: string;
    email: string;
    phone: string;
    tenantId?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const initializeUser = () => {
        try {
            const token = Cookies.get("authToken");
            if (token) {
                const decodedToken: any = jwtDecode(token);
                console.log("Decoded token:", decodedToken); // Debug log to see what's in the token
                const userData: User = {
                    firstName: decodedToken.given_name + " " + decodedToken.family_name,
                    email: decodedToken.email,
                    phone: decodedToken.phoneNumber,
                    tenantId: decodedToken.tenantId || decodedToken.tenant_id || decodedToken.TenantId,
                };
                console.log(userData)
                setUser(userData);
                safeLocalStorage.setItem("user", JSON.stringify(userData));
            } else {
                setUser(null);
                safeLocalStorage.removeItem("user");
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setError("Failed to load user data. Please log in again.");
            setUser(null);
            safeLocalStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeUser();
    }, []);

    useEffect(() => {
        if (user) {
            safeLocalStorage.setItem("user", JSON.stringify(user));
        } else {
            safeLocalStorage.removeItem("user");
        }
    }, [user]);

    const logout = () => {
        setUser(null);
        safeLocalStorage.removeItem("user");
        Cookies.remove("authToken");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading, error }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
