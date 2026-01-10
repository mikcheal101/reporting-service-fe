// types/report/iquery-parameter.ts
"use client";

import { QueryParameterValue } from "./query-parameter-value";

export default interface IQueryParameter {
    id?: string;
    name: string;
    value: QueryParameterValue;
    dataType: string;
    reportId?: string;
    isDetected?: boolean;
};
