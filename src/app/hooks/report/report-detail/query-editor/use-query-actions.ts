// app/hooks/report/report-detail/query-editor/use-query-actions.ts
"use client";

import IQueryParameter from "@/types/report/iquery-parameter";
import IQueryRequest from "@/types/report/iquery-request";
import { useState } from "react";
import useQueryTest from "./use-query-test";
import useQueryExecute from "./use-query-execute";
import useLoadExistingQuery from "./use-load-existing-query";
import IReport from "@/types/report/ireport";
import { QueryParameterValue } from "@/types/report/query-parameter-value";

type UseQueryActionsProps = {
    report: IReport;
}

const useQueryActions = ({ report }: UseQueryActionsProps) => {
    const [parameters, setParameters] = useState<string[]>([]);
    const [parameterValues, setParameterValues] = useState<Record<string, QueryParameterValue>>(
        {}
    );
    const [parameterTypes, setParameterTypes] = useState<Record<string, string>>(
        {}
    );
    const [result, setResult] = useState<string | null>(null);
    const [isTestSuccessful, setIsTestSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { mutate: testQuery } = useQueryTest();
    const { mutate: executeQuery } = useQueryExecute();

    const { query, setQuery } = useLoadExistingQuery({ report });
    const [manualParameters, setManualParameters] = useState<Array<IQueryParameter>>([]);

    const addManualParameter = () => {
        const newParam = {
            name: `@param${manualParameters.length + 1}`,
            value: "",
            dataType: "STRING",
        };
        setManualParameters((prev) => [...prev, newParam]);
    };

    const removeManualParameter = (index: number) => {
        setManualParameters((prev) => prev.filter((_, i) => i !== index));
    };

    const updateManualParameter = (
        index: number,
        field: string,
        value: string
    ) => {
        setManualParameters((prev) =>
            prev.map((param, i) =>
                i === index ? { ...param, [field]: value } : param
            )
        );
    };

    // Combine detected and manual parameters
    const getAllParameters = () => {
        const detectedParams = parameters.map((param) => ({
            name: param,
            value: parameterValues[param]?.toString() || "",
            dataType: parameterTypes[param] || "STRING",
            isDetected: true,
        }));

        const manualParams = manualParameters.map((param) => ({
            ...param,
            isDetected: false,
        }));

        return [...detectedParams, ...manualParams];
    };

    // -------- build payload once --------
    const buildPayload = (): IQueryRequest => ({
        isFromQueryBuilder: true,
        reportId: `${report.id}`,
        limit: 1,
        queryString: query.replaceAll('\n', ' ').trim(),
        joins: [],
        computedColumns: [],
        filters: [],
        parameters: parameters.map<IQueryParameter>((p) => ({
            name: p,
            value: parameterValues[p],
            dataType: parameterTypes[p]?.toUpperCase() || "STRING",
        })),
    });

    // -------- execute query --------
    const runExecute = async () => {
        setIsLoading(true);

        executeQuery(buildPayload(), {
            onSuccess: () => {
                globalThis.location.replace(`${globalThis.location.origin}/report`);
            },
            onError: () => {
                setIsLoading(false);
                setIsTestSuccessful(false);
                setResult("No content returned.");
            },
        });
    };

    // -------- test query --------
    const runTest = () => {
        setIsLoading(true);
        const queryBuilt = buildPayload();
        testQuery(queryBuilt, {
            onSuccess: (data: string) => {
                setResult(JSON.stringify(data, null, 2));
                setIsTestSuccessful(true);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
                setIsTestSuccessful(false);
                setResult("No content returned.");
            },
        });
    };

    return {
        query,
        result,
        isTestSuccessful,
        isLoading,
        parameters,
        parameterValues,
        parameterTypes,

        setParameterTypes,
        setParameterValues,
        setParameters,
        setResult,
        setIsTestSuccessful,
        setQuery,

        runTest,
        runExecute,
        buildPayload,
        addManualParameter,
        updateManualParameter,
        getAllParameters,
        removeManualParameter,
    }
};

export default useQueryActions;