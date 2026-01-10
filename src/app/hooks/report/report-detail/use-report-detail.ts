// app/hooks/report/report-detail/use-report-detail.ts
"use client";

import IReport from "@/types/report/ireport";
import { useEffect, useState } from "react";
import useFetchReport from "../use-fetch-report";

const emptyReportForm: IReport = {
    id: "",
    name: "",
    description: "",
    connectionId: "",
    reportTypeId: "",
};

const useReportDetail = (id?: string) => {
    const [form, setForm] = useState<IReport>(emptyReportForm);
    const { data: report, isLoading, isError } = useFetchReport(Number(id));

    useEffect(() => {
        if (!id) return;

        if (isError) return;
        if (isLoading) return;
        if (!report) return;

        setForm(report);
    }, [id, isError, isLoading, report]);

    return {
        form,
        setForm,
        report,
        isLoading,
    };
};

export default useReportDetail;