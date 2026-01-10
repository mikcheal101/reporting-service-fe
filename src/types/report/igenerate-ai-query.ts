// types/report/igenerate-ai-query.ts
"use client";

import IReportSchema from "./ireport-schema";

export default interface IGenerateAiQuery {
    reportId: string;
    prompt: string;
    schemas: IReportSchema[];
};