import React, { createContext, useState, useContext, ReactNode } from "react";

interface ConnectionContextType {
    selectedConnection: string | null;
    setSelectedConnection: (connection: string | null) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedConnection, setSelectedConnection] = useState<string | null>(null);

    return (
        <ConnectionContext.Provider value={{ selectedConnection, setSelectedConnection }}>
            {children}
        </ConnectionContext.Provider>
    );
};

export const useConnection = (): ConnectionContextType => {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error("useConnection must be used within a ConnectionProvider");
    }
    return context;
};