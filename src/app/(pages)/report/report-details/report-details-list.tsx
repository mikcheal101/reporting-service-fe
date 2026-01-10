// app/(pages)/report/report-details/report-details-list.tsx
"use client";

import React from "react";
import { FaFolder, FaFolderOpen, FaFileAlt, FaPlug } from "react-icons/fa";
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
      <div className="flex flex-col items-center justify-center h-full w-full text-center p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-md shadow-md">
        <FaPlug className="text-2xl sm:text-3xl lg:text-4xl text-gray-400 mb-3 sm:mb-4" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">
          No Connection Selected
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Please connect to a data source to view the available tables.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-4 text-center text-sm">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-xs text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-[40vh] sm:h-[45vh] lg:h-[50vh] w-full p-2 sm:p-3 lg:p-4">
      <div className="bg-white shadow-md rounded-md p-3 sm:p-4 w-full h-full overflow-y-auto custom-scrollbar">
        <h2 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 text-gray-600">
          Tables
        </h2>
        <div className="space-y-2">
          {tableData.map((table, index) => (
            <div key={index} className="">
              <div
                onClick={() => toggleTable(table.tableName)}
                className="flex items-center p-2 cursor-pointer text-left font-medium text-gray-700 bg-[#FFF7E8] rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm"
              >
                {expandedTables[table.tableName] ? (
                  <FaFolderOpen className="mr-2 text-[#FDA603] flex-shrink-0" />
                ) : (
                  <FaFolder className="mr-2 text-[#FDA603] flex-shrink-0" />
                )}
                <span className="truncate">{table.tableName}</span>
              </div>
              {expandedTables[table.tableName] && (
                <div className="mt-1 space-y-1 ml-2 sm:ml-4">
                  {table.columns.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, table.tableName, column.columnName)
                      }
                      className="flex items-center p-1.5 sm:p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors text-xs"
                    >
                      <FaFileAlt className="mr-2 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 truncate flex-1">
                        {column.columnName}
                      </span>
                      <span className="ml-2 text-gray-400 text-xs hidden sm:inline">
                        ({column.dataType})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailList;
