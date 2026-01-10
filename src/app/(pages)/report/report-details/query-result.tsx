// app/(pages)/report/report-details/query-result.tsx
"use client";

import React, { useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

interface Column {
    name: string;
    alias: string;
}

interface Table {
    tableName: string;
    alias: string;
    columns: Column[];
}

interface JoinClause {
    table: string;
    on: string;
    type: 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
}

interface OutputResultProps {
    tables: Table[];
    joins: JoinClause[];
}

const QueryResult: React.FC<OutputResultProps> = ({ tables, joins }) => {
    const [showJson, setShowJson] = useState(false);

    const jsonData = {
        reportId: '5406f5e8-91b4-4230-c21f-08dcf473cbb9',
        limit: 100000,
        joins: joins.map((join) => ({
            tableName: tables.find((table) => table.alias === join.table)?.tableName || join.table,
            joinType: join.type,
            onCondition: join.on,
        })),
        computedColumns: tables.flatMap((table) =>
            table.columns.map((column) => ({
                alias: column.alias,
                expression: `${table.alias}.${column.name}`,
            }))
        ),
        filters: [
            {
                'D.Name': 'Sales',
                value: '100',
            },
        ],
    };

    return (
        <div className="p-3 sm:p-4 lg:p-6 bg-gray-100 w-full rounded-lg shadow-md mt-4 lg:mt-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600 mb-4">Output Result</h2>

            <Drawer open={showJson} onClose={() => setShowJson(false)} fadeFromIndex={0}
                    snapPoints={['25%', '50%', '75%']}>
                <DrawerTrigger>
                    <button
                        className="mb-4 text-indigo-500 hover:text-indigo-700 font-semibold text-sm sm:text-base"
                        onClick={() => setShowJson(true)}
                    >
                        {showJson ? 'Hide JSON Format' : 'Show JSON Format'}
                    </button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>JSON Output</DrawerTitle>
                        <DrawerDescription>Preview the generated JSON data.</DrawerDescription>
                    </DrawerHeader>
                    <div
                        className="custom-scrollbar bg-gray-800 text-gray-100 p-3 sm:p-4 rounded-md mx-3 sm:mx-4"
                        style={{ maxHeight: '70vh', overflowY: 'auto' }}
                    >
                        <pre className="text-xs sm:text-sm whitespace-pre-wrap">{JSON.stringify(jsonData, null, 2)}</pre>
                    </div>
                    <DrawerFooter>
                        <DrawerClose>
                            <button className="text-gray-300 hover:text-white">Close</button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <div className="space-y-4">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700">Tables</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {tables.map((table, index) => (
                        <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                            <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-indigo-500 mb-2">
                                Table: {table.tableName} (Alias: {table.alias})
                            </h4>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                                {table.columns.map((column, colIndex) => (
                                    <li key={colIndex} className="text-xs sm:text-sm text-gray-600">
                                        {column.name} (Alias: {column.alias})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 mt-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700">Joins</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {joins.map((join, index) => {
                        const actualTableName = tables.find((table) => table.alias === join.table)?.tableName || join.table;
                        return (
                            <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                                <p className="text-xs sm:text-sm"><strong>Table:</strong> {actualTableName}</p>
                                <p className="text-xs sm:text-sm"><strong>Join On:</strong> {join.on}</p>
                                <p className="text-xs sm:text-sm"><strong>Type:</strong> {join.type}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QueryResult;