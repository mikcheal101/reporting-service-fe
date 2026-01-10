// app/hooks/report/report-detail/use-report-detail-list.ts
"use client";

import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { useTableData } from "@/context/TableDataContext";
import { useEffect, useState } from "react";
import useConnectionTables from "../../connection/use-connection-tables";

const EXPANDED_TABLES_KEY = "expandedTables";

type useReportDetailListProps = {
    activeConnectionId: number;
};
type Column = {
    columnName: string;
    dataType: string;
};

type Table = {
    tableName: string;
    columns: Column[];
};
const formatTableData = (tables: any[]): Table[] =>
    tables.map((table) => ({
        tableName: table.tableName?.slice(0, 20) || "Unknown Table",
        columns:
            table.columns?.map((col: any) => ({
                columnName: col.columnName?.slice(0, 20) || "Unnamed Column",
                dataType: col.dataType || "Unknown",
            })) || [],
    }));

const useReportDetailList = ({ activeConnectionId }: useReportDetailListProps) => {

    const { tableData, setTableData, isLoading, setIsLoading, error, setError } = useTableData();
    const [expandedTables, setExpandedTables] = useState<{ [key: string]: boolean; }>({});
    const { data: connectionTables } = useConnectionTables(activeConnectionId);

    const fetchTableData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const formattedData = formatTableData(connectionTables || []);
            setTableData(formattedData || []);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!activeConnectionId) {
            setTableData([]);
        }
    }, [activeConnectionId]);

    useEffect(() => {
        if (connectionTables) {
            fetchTableData();
        }
    }, [connectionTables, setTableData]);

    const toggleTable = (tableName: string) => setExpandedTables((prev) => ({ ...prev, [tableName]: !prev[tableName] }));

    const handleDragStart = (
        event: React.DragEvent,
        tableName: string,
        columnName: string
    ) => {
        event.dataTransfer.setData(
            "column",
            JSON.stringify({ tableName, columnName })
        );
    };

    return {
        handleDragStart,
        toggleTable,
        expandedTables,
        tableData,
        isLoading,
        error,
    };
};

export default useReportDetailList;