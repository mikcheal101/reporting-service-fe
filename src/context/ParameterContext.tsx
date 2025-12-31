"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface ReportContextType {
    currentParameter: any; // Replace `any` with a more specific type if possible
    setCurrentParameter: React.Dispatch<React.SetStateAction<any>>; // Use a specific type for the state
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

interface ReportProviderProps {
    children: ReactNode;
}

export const ReportProviderParameter = ({ children }: ReportProviderProps) => {
    const [currentParameter, setCurrentParameter] = useState<any>(null); // Replace `any` with a specific type if possible

    return (
        <ReportContext.Provider value={{ currentParameter, setCurrentParameter }}>
            {children}
        </ReportContext.Provider>
    );
};

export const useReportParameter = () => {
    const context = useContext(ReportContext);
    if (context === undefined) {
        throw new Error("useReport must be used within a ReportProvider");
    }
    return context;
};
