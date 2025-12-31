'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeLocalStorage } from '@/app/utils/useLocalStorage';

interface ReportStatusContextType {
  isReportCreated: boolean;
  reportId: string | null;
  markReportAsCreated: (id: string) => void;
  resetReportStatus: () => void;
}

const ReportStatusContext = createContext<ReportStatusContextType | undefined>(undefined);

export const ReportStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReportCreated, setIsReportCreated] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);

  useEffect(() => {
    const storedReportId = safeLocalStorage.getItem('reportId');
    if (storedReportId) {
      setReportId(storedReportId);
      setIsReportCreated(true);
    }
  }, []);

  const markReportAsCreated = (id: string) => {
    setReportId(id);
    setIsReportCreated(true);
    safeLocalStorage.setItem('reportId', id);
  };

  const resetReportStatus = () => {
    setReportId(null);
    setIsReportCreated(false);
    safeLocalStorage.removeItem('reportId');
  };

  return (
    <ReportStatusContext.Provider
      value={{
        isReportCreated,
        reportId,
        markReportAsCreated,
        resetReportStatus
      }}
    >
      {children}
    </ReportStatusContext.Provider>
  );
};

export const useReportStatus = () => {
  const context = useContext(ReportStatusContext);
  if (context === undefined) {
    throw new Error('useReportStatus must be used within a ReportStatusProvider');
  }
  return context;
};