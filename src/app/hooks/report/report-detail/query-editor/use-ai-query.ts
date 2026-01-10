// app/hooks/report/report-detail/query-editor/use-ai-query.ts
"use client";

import { useTableData } from "@/context/TableDataContext";
import { useToast } from "@/hooks/use-toast";
import IReport from "@/types/report/ireport";
import { useMemo, useState } from "react";
import useGenerateAiQuery from "./use-generate-ai.query";

type UseAiQueryProps = {
    report: IReport;
    onQueryGenerated: (query: string) => void;
};

const useAiQuery = ({ report, onQueryGenerated }: UseAiQueryProps) => {
    const [prompt, setPrompt] = useState<string>('');
    const [generatedQuery, setGeneratedQuery] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const { toast } = useToast();
    const { tableData } = useTableData();
    const { mutate: generateAiQuery, isPending: isLoading } = useGenerateAiQuery();

    const schemaContext = useMemo(() => tableData.map(table => ({
        table: table.tableName,
        columns: table.columns
            .map(col => `${col.columnName} (${col.dataType})`)
            .join(', ')
    })), [tableData]);

    const generateQuery = async () => {
        if (!prompt.trim()) {
            toast({ title: 'Please enter a query description' });
            return;
        }

        if (!report?.id) {
            toast({ title: "Missing report context" });
            return;
        }

        generateAiQuery({
            reportId: `${report.id}`,
            prompt,
            schemas: schemaContext,
        }, {
            onSuccess: (data) => {
                setGeneratedQuery(data);
            }
        });
    };

    const copyQuery = async () => {
        if (!generatedQuery.trim()) {
            toast({ title: 'No query to copy' });
            return;
        }

        try {
            await navigator.clipboard.writeText(generatedQuery);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            toast({ title: 'Query copied to clipboard!' });
        } catch {
            toast({ title: 'Failed to copy query to clipboard' });
        }
    };

    const useQuery = () => {
        if (!generatedQuery.trim()) {
            toast({ title: 'No query to apply' });
            return;
        }

        onQueryGenerated(generatedQuery);
        toast({ title: 'Query applied to editor!' });
    };

    return {
        prompt,
        setPrompt,
        isLoading,
        generatedQuery,
        isCopied,
        generateQuery,
        copyQuery,
        useQuery,
        tableData,
    };
};

export default useAiQuery;