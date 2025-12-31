"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface ReportContextType {
    currentReportParams: any; // Replace `any` with a more specific type if possible
    setCurrentReportParams: React.Dispatch<React.SetStateAction<any>>; // Use a specific type for the state
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

interface ReportProviderProps {
    children: ReactNode;
}

export const ReportProvider = ({ children }: ReportProviderProps) => {
    const [currentReportParams, setCurrentReportParams] = useState<any>(null); // Replace `any` with a specific type if possible

    return (
        <ReportContext.Provider value={{ currentReportParams, setCurrentReportParams }}>
            {children}
        </ReportContext.Provider>
    );
};

export const useReport = () => {
    const context = useContext(ReportContext);
    if (context === undefined) {
        throw new Error("useReport must be used within a ReportProvider");
    }
    return context;
};
