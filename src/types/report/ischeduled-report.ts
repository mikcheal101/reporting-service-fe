// types/report/ischeduled-report.ts
"use client";

export default interface IScheduledReport {
    id: string;
    name: string;
    description: string;
    status: string;
    fileDownloadPath?: string;
    createdAt: Date,
    report: any;
};
