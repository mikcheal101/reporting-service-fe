// app/hooks/report/report-detail/use-report-form-section.ts
"use client";

import { useEffect, useState } from "react";
import useConnection from "../../connection/use-connection";
import useReportType from "../../report-type/use-report-type";
import { useRouter } from "next/navigation";
import IReport from "@/types/report/ireport";
import useSaveReport from "../use-save-report";

type UseReportFormSectionProps = {
    form: IReport;
    setForm: React.Dispatch<React.SetStateAction<IReport>>;
};

const useReportFormSection = ({ form, setForm }: UseReportFormSectionProps) => {
    const router = useRouter();

    // Queries
    const { data: connections, isLoading: isLoadingConnections } = useConnection();
    const { data: reportTypes, isLoading: isLoadingReportTypes } = useReportType();

    // Mutations
    const { mutate: saveReport, isPending: isSavingReport } = useSaveReport();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => {
       const name = "target" in e ? e.target.name : e.name;
        const value = "target" in e ? e.target.value : e.value;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement> | { name: string; value: number }) => {
        const name = "target" in e ? e.target.name : e.name;
        const value = "target" in e ? e.target.value : e.value;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        saveReport(form, {
            onSuccess: (savedReport) => {
                setForm(savedReport);
            }
        });
    };

    const isFilledString = (v?: string) =>
        (v ?? "").trim() !== "";

    const isFilledNumber = (v?: number) => v !== undefined && v !== null && v > 0;

    const isFormValid = (): boolean => {
        return (
            isFilledString(form.name)
            && isFilledString(form.description)
            && isFilledNumber(Number(form.connectionId))
            && isFilledNumber(Number(form.reportTypeId))
        );
    };

    const handleViewReport = async () => router.push("/report");

    return {
        form,
        handleInput,
        handleSelect,
        handleSave,
        handleViewReport,
        isFormValid,

        connections,
        reportTypes,

        isSavingReport,
        isLoadingConnections,
        isLoadingReportTypes,
    };
};

export default useReportFormSection;