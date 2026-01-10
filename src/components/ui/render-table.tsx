// app/utils/render-table.tsx
"use client";
import React from "react";

const renderTable = <T,>(data: T[], headers: string[], renderRow: (item: T) => JSX.Element): JSX.Element => {
  // Safety check: ensure data is an array
  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto">
        <div className="text-center py-4 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

export default renderTable;
