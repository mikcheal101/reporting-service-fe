"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Column {
  columnName: string;
  dataType: string;
}

interface TableData {
  tableName: string;
  columns: Column[];
}

interface TableDataContextType {
  tableData: TableData[];
  setTableData: (data: TableData[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const TableDataContext = createContext<TableDataContextType | undefined>(undefined);

export const TableDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <TableDataContext.Provider 
      value={{ 
        tableData, 
        setTableData, 
        isLoading, 
        setIsLoading, 
        error, 
        setError 
      }}
    >
      {children}
    </TableDataContext.Provider>
  );
};

export const useTableData = (): TableDataContextType => {
  const context = useContext(TableDataContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider');
  }
  return context;
};