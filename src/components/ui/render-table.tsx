"use client";
import React, { JSX } from "react";

const renderTable = <T,>(data: T[], headers: string[], renderRow: (item: T) => JSX.Element): JSX.Element => {
  if (!data || data.length === 0) {
    return (
      <div className="overflow-x-auto">
        <div className="text-center py-4 text-muted-foreground text-sm">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {headers.map((header, i) => (
                <th key={i} scope="col" className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">{data.map(renderRow)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default renderTable;
