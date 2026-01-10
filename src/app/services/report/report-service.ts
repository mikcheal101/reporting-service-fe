// app/services/report/report-service.ts
"use client";

import { buildUrl } from "@/app/utils/urlBuilder";
import api from "../axios";
import IReport from "@/types/report/ireport";
import IQueryParameter from "@/types/report/iquery-parameter";
import IScheduleReport from "@/types/report/ischedule-report";
import { AxiosResponse } from "axios";
import IScheduledReport from "@/types/report/ischeduled-report";

export const saveReportAsync = async (form: IReport): Promise<IReport> => {
    const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_REPORTS)}`, form);
    return apiResponse.data;
};

export const deleteReportAsync = async (id: number): Promise<boolean> => {
    const apiResponse: AxiosResponse = await api.delete(`${buildUrl(process.env.NEXT_PUBLIC_REPORTS)}/${id}`);
    return apiResponse.data;
};

export const updateReportAsync = async (form: IReport): Promise<IReport> => {
    const apiResponse: AxiosResponse = await api.put(`${buildUrl(process.env.NEXT_PUBLIC_REPORTS)}/${form.id}`, form);
    return apiResponse.data;
};

export const fetchReportAsync = async (id: number): Promise<IReport> => {
    const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_REPORTS)}/${id}`);
    return apiResponse.data;
};

export const fetchReportsAsync = async (): Promise<IReport[]> => {
    const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_REPORTS)}`);
    return apiResponse.data;
};

export const fetchReportParametersAsync = async (id: number): Promise<IQueryParameter[]> => {
    const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_REPORT_PARAMETERS)}/${id}`);
    return apiResponse.data;
};

export const scheduleReportAsync = async (payload: IScheduleReport): Promise<boolean> => {
    const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_GENERATE_REPORT)}`, payload);
    return apiResponse.data;
};

export const fetchGeneratedReportsAsync = async (): Promise<IScheduledReport[]> => {
    const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_SCHEDULED_REPORT)}`);
    return apiResponse.data;
};

export const fetchPendingReportsAsync = async (): Promise<IScheduledReport[]> => {
    const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_PENDING_REPORT)}`);
    return apiResponse.data;
};

export const downloadReportAsync = async (id: string): Promise<{ blob: Blob; filename: string; }> => {
    const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_DOWNLOAD_REPORT)}/${id}`, { responseType: 'blob' });
    // read header
    const contentDisposition = apiResponse.headers["content-disposition"];

    let filename = "download";

    if (contentDisposition) {
        // try UTF-8 filename first
        const utfMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
        if (utfMatch?.[1]) {
            filename = decodeURIComponent(utfMatch[1]);
        } else {
            // fallback to normal filename=
            const normalMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
            if (normalMatch?.[1]) {
                filename = normalMatch[1];
            }
        }
    }

    return {
        blob: apiResponse.data,
        filename
    };
};
