"use client";

import React from "react";
import { Database, FolderOpen, Folder, FileType, Plug, ChevronRight, ChevronDown } from "lucide-react";
import useReportDetailList from "@/app/hooks/report/report-detail/use-report-detail-list";

type ReportDetailListProps = {
  activeConnectionId: number;
};

const ReportDetailList: React.FC<ReportDetailListProps> = ({
  activeConnectionId,
}: ReportDetailListProps) => {
  const {
    handleDragStart,
    toggleTable,
    expandedTables,
    tableData,
    isLoading,
    error,
  } = useReportDetailList({ activeConnectionId });

  if (!activeConnectionId) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-8">
        <Plug className="h-8 w-8 text-gray-300 mb-2" />
        <p className="text-sm font-medium text-gray-500">No Connection Selected</p>
        <p className="text-xs text-gray-400 mt-1 max-w-[180px]">
          Connect to a data source to browse available tables.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-xs text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Database className="h-3.5 w-3.5 text-gray-400" />
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tables</h3>
      </div>
      <div className="space-y-0.5 max-h-[280px] overflow-y-auto">
        {tableData.map((table, index) => (
          <div key={index}>
            <button
              onClick={() => toggleTable(table.tableName)}
              className="flex items-center gap-2 w-full px-2 py-1.5 text-left text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              {expandedTables[table.tableName] ? (
                <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              )}
              {expandedTables[table.tableName] ? (
                <FolderOpen className="h-3.5 w-3.5 text-primary shrink-0" />
              ) : (
                <Folder className="h-3.5 w-3.5 text-primary shrink-0" />
              )}
              <span className="truncate text-xs font-medium">{table.tableName}</span>
            </button>
            {expandedTables[table.tableName] && (
              <div className="ml-5 mt-0.5 space-y-0.5">
                {table.columns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, table.tableName, column.columnName)
                    }
                    className="flex items-center gap-2 px-2 py-1 rounded-md cursor-grab hover:bg-gray-50 transition-colors text-xs"
                  >
                    <FileType className="h-3 w-3 text-gray-400 shrink-0" />
                    <span className="text-gray-600 truncate">{column.columnName}</span>
                    <span className="text-gray-400 text-[10px] ml-auto hidden 2xl:inline">
                      {column.dataType}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportDetailList;
