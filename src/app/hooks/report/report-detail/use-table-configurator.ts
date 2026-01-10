// app/hooks/report/report-detail/use-table-configurator.ts
"use client";

import { JoinClause, Table } from "@/@types/types";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useState } from "react";
import useQueryTest from "./query-editor/use-query-test";
import IQueryRequest from "@/types/report/iquery-request";

const useTableConfigurator = () => {
  const { toast } = useToast();
  const { mutate: testQuery } = useQueryTest();

  const reportId = safeLocalStorage.getItem("reportId");

  const [tables, setTables] = useState<Table[]>([
    { tableName: "", alias: "", columns: [{ name: "", alias: "" }] },
  ]);
  const [joins, setJoins] = useState<JoinClause[]>([]);

  // Initialize joins whenever tables change
  useEffect(() => {
    setJoins((prev) =>
      tables.map((table, index) => ({
        table: table.tableName,
        on:
          index > 0
            ? `${tables[index - 1].alias || tables[index - 1].tableName}.${table.tableName
            } = ${table.alias || table.tableName}${table.tableName}`
            : "",
        type: prev[index]?.type || "INNER",
      }))
    );
  }, [tables]);

  const updateTable = useCallback(
    (index: number, field: keyof Table, value: string) => {
      setTables((prev) =>
        prev.map((table, i) =>
          i === index ? { ...table, [field]: value.trim() } : table
        )
      );
    },
    []
  );

  const updateColumn = useCallback(
    (
      tableIndex: number,
      columnIndex: number,
      field: "name" | "alias",
      value: string
    ) => {
      setTables((prev) =>
        prev.map((table, i) =>
          i === tableIndex
            ? {
              ...table,
              columns: table.columns.map((col, j) =>
                j === columnIndex ? { ...col, [field]: value.trim() } : col
              ),
            }
            : table
        )
      );
    },
    []
  );

  const addColumn = useCallback((tableIndex: number) => {
    setTables((prev) =>
      prev.map((table, i) =>
        i === tableIndex
          ? { ...table, columns: [...table.columns, { name: "", alias: "" }] }
          : table
      )
    );
  }, []);

  const removeColumn = useCallback(
    (tableIndex: number, columnIndex: number) => {
      setTables((prev) =>
        prev.map((table, i) =>
          i === tableIndex
            ? {
              ...table,
              columns: table.columns.filter((_, j) => j !== columnIndex),
            }
            : table
        )
      );
    },
    []
  );

  const addTable = useCallback(() => {
    setTables((prev) => [
      ...prev,
      { tableName: "", alias: "", columns: [{ name: "", alias: "" }] },
    ]);
  }, []);

  const removeTable = useCallback((tableIndex: number) => {
    setTables((prev) => prev.filter((_, i) => i !== tableIndex));
  }, []);

  const handleDragOver = (event: React.DragEvent) => event.preventDefault();

  const handleSubmit = async () => {
    for (const table of tables) {
      if (
        !table.tableName.trim() ||
        table.columns.some((c) => !c.name.trim())
      ) {
        toast({ title: "Please provide valid table names and columns." });
        return;
      }
    }

    const payload: IQueryRequest = {
      isFromQueryBuilder: false,
      reportId: `${reportId}`,
      limit: 1,
      joins: joins.map((join) => ({
        tableName: join.table,
        alias: join.table,
        joinType: join.type,
        onCondition: join.on,
      })),
      computedColumns: tables.flatMap((table) =>
        table.columns.map((col) => ({
          alias: col.alias,
          expression: `${table.tableName}.${col.name}`,
        }))
      ),
      filters: [],
      parameters: [],
      queryString: "",
    };

    testQuery(payload);
  };

  return {
    addTable,
    tables,
    updateTable,
    removeTable,
    handleDragOver,
    updateColumn,
    removeColumn,
    handleSubmit,
    addColumn,
  }
};

export default useTableConfigurator;