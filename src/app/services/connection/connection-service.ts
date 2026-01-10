// app/services/connection/connection-service.ts
"use client";
import IConnection from "@/types/connection/iconnection";
import api from "../axios";
import { buildUrl } from "@/app/utils/urlBuilder";
import { AxiosResponse } from "axios";

export const saveConnectionAsync = async (payload: IConnection): Promise<IConnection> => {
  const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT)}`, payload);
  return apiResponse.data;
};

export const testConnectionAsync = async (payload: IConnection): Promise<boolean> => {
  const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT)}${process.env.NEXT_PUBLIC_APP_TEST_CONNECTION_ENDPOINT}`, payload);
  return apiResponse.data;
};

export const fetchConnectionsAsync = async (): Promise<IConnection[]> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT)}`);
  return apiResponse.data;
};

export const updateConnectionAsync = async (payload: IConnection) => {
  const apiResponse: AxiosResponse = await api.put(`${buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT)}/${payload.id}`, payload);
  return apiResponse.data;
};

export const fetchConnectionAsync = async (id: number): Promise<IConnection> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT)}/${id}`);
  return apiResponse.data;
};

export const deleteConnectionAsync = async (id: number): Promise<boolean> => {
  const apiResponse: AxiosResponse = await api.delete(`${buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT)}/${id}`);
  return apiResponse.data;
};

export const fetchConnectionTablesAsync = async (id: number): Promise<string[]> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT)}/${id}/tables`);
  return apiResponse.data;
};