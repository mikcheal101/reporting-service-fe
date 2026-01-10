// app/services/report-type/report-type-service.ts
"use client";

import IReportType from "@/types/report-type/ireport-type";
import api from "../axios";
import { buildUrl } from "@/app/utils/urlBuilder";
import { AxiosResponse } from "axios";

export const saveReportTypeAsync = async (payload: IReportType): Promise<IReportType> => {
  const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_REPORT_TYPES)}`, payload);
  return apiResponse.data;
};

export const updateReportTypeAsync = async (payload: IReportType): Promise<IReportType> => {
  const apiResponse: AxiosResponse = await api.put(`${buildUrl(process.env.NEXT_PUBLIC_REPORT_TYPES)}/${payload.id}`, payload);
  return apiResponse.data;
};

export const deleteReportTypeAsync = async (id: string): Promise<boolean> => {
  const apiResponse: AxiosResponse = await api.delete(`${buildUrl(process.env.NEXT_PUBLIC_REPORT_TYPES)}/${id}`);
  return apiResponse.data;
};

export const fetchReportTypesAsync = async (): Promise<IReportType[]> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_REPORT_TYPES)}`);
  return apiResponse.data;
};

export const fetchReportTypeAsync = async (id: string): Promise<IReportType> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_REPORT_TYPES)}/${id}`);
  return apiResponse.data;
};