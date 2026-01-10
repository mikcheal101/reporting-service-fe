// app/hooks/report/report-detail/query-editor/use-load-existing-query.ts
"use client";

import IReport from "@/types/report/ireport";
import { useEffect, useState } from "react";
import useFetchReport from "../../use-fetch-report";

type UseLoadExistingQueryProps = {
    report: IReport;
};

const TEMPLATE = "SELECT * FROM Users WHERE Id = @userId";

const useLoadExistingQuery = ({ report }: UseLoadExistingQueryProps) => {
    const [query, setQuery] = useState<string>(TEMPLATE);

    useEffect(() => {
        setQuery(report?.queryString || TEMPLATE);
    }, [report]);

    return {
        query,
        setQuery,
    }
};

export default useLoadExistingQuery;