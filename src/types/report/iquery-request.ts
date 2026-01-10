// types/report/iquery-request.ts
"use client";

import IComputedColumn from "./icomputed-column";
import IJoin from "./ijoin";
import IQueryParameter from "./iquery-parameter";


export default interface IQueryRequest {
    computedColumns: IComputedColumn[];
    filters: string[];
    isFromQueryBuilder: boolean;
    joins: IJoin[];
    limit: number;
    parameters: IQueryParameter[];
    queryString: string;
    reportId: string;
};
