// types/report/ireport.ts
"use client";

import IConnection from "../connection/iconnection";
import IReportType from "../report-type/ireport-type";

export default interface IReport {
    id: string;
    name: string;
    description: string;
    connectionId: string;
    reportTypeId: string;
    connection?: IConnection;
    queryString?: string;
    reportType?: IReportType;
};