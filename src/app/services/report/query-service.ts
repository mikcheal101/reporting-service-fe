// app/services/report/query-service.ts
"use client";

import { AxiosResponse } from "axios";
import api from "../axios";
import { buildUrl } from "@/app/utils/urlBuilder";
import IQueryRequest from "@/types/report/iquery-request";
import IGenerateAiQuery from "@/types/report/igenerate-ai-query";

export const testQueryAsync = async (payload: IQueryRequest) => {
    const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_TEST_QUERY)}`, payload);
    return apiResponse.data;
};

export const executeQueryAsync = async (payload: IQueryRequest) => {
    const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_EXECUTE_QUERY)}`, payload);
    return apiResponse.data;
};

export const generateAiQueryAsync = async (payload: IGenerateAiQuery) => {   
    const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_AI_GENERATE_QUERY)}`, payload);
    return apiResponse.data;
};
