// app/hooks/report/report-detail/query-editor/use-query-editor.ts
"use client";

import { useState, useEffect } from "react";
import { useReport } from "@/context/ReportContext";
import { useReportParameter } from "@/context/ParameterContext";
import useQueryParser from "./use-query-parser";
import useQueryActions from "./use-query-actions";
import IReport from "@/types/report/ireport";
import IQueryParameter from "@/types/report/iquery-parameter";
import { QueryParameterValue } from "@/types/report/query-parameter-value";

const sqlToJsTypeMap: Record<string, string> = {
    DATE: "date",
    DECIMAL: "double",
    FLOAT: "double",
    NVARCHAR: "string",
    VARCHAR: "string",
    INT: "string",
};

type UseQueryEditorProps = {
    report: IReport;
};

const useQueryEditor = ({ report }: UseQueryEditorProps) => {

    const [activeTab, setActiveTab] = useState("editor");
    const { currentReportParams } = useReport();
    const { currentParameter } = useReportParameter();

    const { extractParameters, extractParameterTypes } = useQueryParser();
    const {
        query,
        setQuery,
        parameters,
        setParameters,
        setParameterTypes,
        setParameterValues,
        result,
        isLoading,
        isTestSuccessful,
        runExecute,
        runTest,
        parameterTypes,
        addManualParameter,
        getAllParameters,
        updateManualParameter,
        removeManualParameter,
        parameterValues,
    } = useQueryActions({ report });

    // load data when editing an existing report
    useEffect(() => {
        if (!currentReportParams && !currentParameter) return;

        const queryString = currentReportParams?.queryString || "";
        setQuery(queryString);

        const params = extractParameters(queryString);
        const types = extractParameterTypes(queryString);

        setParameters(params);
        setParameterTypes(types);

        const values: Record<string, QueryParameterValue> = {};

        params.forEach((p) => {
            const existing = (currentParameter as IQueryParameter[]).find(
                (x) => x.name === p
            );
            values[p] = existing?.value ?? "";
        });

        setParameterValues(values);
    }, [
        currentReportParams,
        currentParameter,
        extractParameterTypes,
        extractParameters,
        setParameterTypes,
        setParameterValues,
        setParameters,
        setQuery,
    ]);

    // editor change
    const handleEditorChange = (value?: string) => {
        if (!value) return;

        setQuery(value);

        const params = extractParameters(value);
        const types = extractParameterTypes(value);

        setParameters(params);
        setParameterTypes(types);

        setParameterValues((prev) =>
            params.reduce(
                (acc, p) => ({
                    ...acc,
                    [p]: prev[p] ?? "",
                }),
                {}
            )
        );
    };

    // parameter change
    const handleParameterChange = (param: string, value: string) => {
        const type = sqlToJsTypeMap[parameterTypes[param]?.toUpperCase()] || "string";

        let converted: QueryParameterValue = value;

        switch (type) {
            case "double":
                converted = Number.parseFloat(value) || 0;
                break;
            case "date": {
                const d = new Date(value);
                converted = Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
                break;
            }
            default:
                converted = value.trim();
        }

        setParameterValues((prev) => ({
            ...prev,
            [param]: converted,
        }));
    };

    const handleAIQueryGenerated = (generatedQuery: string) => {
        setActiveTab("editor");
        handleEditorChange(generatedQuery);
    };

    return {
        query,
        result,
        activeTab,
        isLoading,
        isTestSuccessful,
        parameters,
        parameterValues,

        setActiveTab,
        handleEditorChange,
        handleParameterChange,
        handleAIQueryGenerated,
        addManualParameter,
        getAllParameters,
        updateManualParameter,
        removeManualParameter,
        sqlToJsTypeMap,

        runTest,
        runExecute,
    };
};

export default useQueryEditor;
