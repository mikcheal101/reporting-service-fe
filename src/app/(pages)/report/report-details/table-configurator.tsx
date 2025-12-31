
// Add the missing imports at the top
import React, { useEffect, useState } from "react";
import { buildUrl } from "@/app/utils/urlBuilder";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash, Database, Plus, Play, Save } from "lucide-react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import QueryEditor from "./QueryEditor";
import { JoinClause, Table } from "@/@types/types";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import Cookies from "js-cookie";


interface Column {
    name: string;
    alias: string;
}

const TableConfigurator = () => {
    const { toast } = useToast();
    const router = useRouter();

    const [tables, setTables] = useState<Table[]>([
        { tableName: "", alias: "", columns: [{ name: "", alias: "" }] },
    ]);
    const [joins, setJoins] = useState<JoinClause[]>([]);
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const reportId = safeLocalStorage.getItem("reportId");
    console.log(reportId, "my report id...")

    useEffect(() => {
        const storedData = safeLocalStorage.getItem('reportId');
        setData(storedData);
      }, []);

    const [submittedData, setSubmittedData] = useState<{
        tables: Table[];
        joins: JoinClause[];
    } | null>(null);

    const handleTableNameChange = (index: number, field: "tableName" | "alias", value: string) => {
        const newTables = [...tables];
        newTables[index][field] = value.trim();

        const alias = newTables[index].alias;
        const tableName = newTables[index].tableName;

        const newJoins = [...joins];
        if (!newJoins[index]) {
            newJoins[index] = { table: "", on: "", type: "INNER" }; // Initialize if undefined
        }

        newJoins[index].table = tableName;

        // Dynamically update the `on` condition based on aliases and table names
        if (index > 0 && alias && tableName) {
            const previousAlias = newTables[index - 1].alias || newTables[index - 1].tableName;
            const currentAlias = alias || tableName;

            newJoins[index].on = `${previousAlias}.${tableName} = ${currentAlias}${tableName}`;
        } else {
            newJoins[index].on = ""; // Reset if values are incomplete
        }

        setJoins(newJoins);
        setTables(newTables);

    };
    const handleColumnChange = (tableIndex: number, columnIndex: number, field: "name" | "alias", value: string) => {
        const newTables = [...tables];
        newTables[tableIndex].columns[columnIndex][field] = value.trim();
        setTables(newTables);
    };

    const addColumn = (tableIndex: number) => {
        const newTables = [...tables];
        newTables[tableIndex].columns.push({ name: "", alias: "" });
        setTables(newTables);
    };

    const removeColumn = (tableIndex: number, columnIndex: number) => {
        const newTables = [...tables];
        newTables[tableIndex].columns.splice(columnIndex, 1);
        setTables(newTables);
    };

    const addTable = () => {
        const newTable = { tableName: "", alias: "", columns: [{ name: "", alias: "" }] };
        setTables((prev) => [...prev, newTable]);

        const newJoin: JoinClause = {
            table: "",
            on: "",
            type: "INNER",
        };

        setJoins((prev) => [...prev, newJoin]);
    };

    const removeTable = (tableIndex: number) => {
        const newTables = [...tables];
        newTables.splice(tableIndex, 1);
        setTables(newTables);

        if (joins.length > tableIndex) {
            setJoins(joins.filter((_, index) => index !== tableIndex));
        }
    };
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };
    const handleDrop = (event: React.DragEvent, tableIndex: number) => {
        event.preventDefault();
        const columnData = JSON.parse(event.dataTransfer.getData("column"));
        const { tableName, columnName } = columnData;

        if (!tables[tableIndex].tableName) {
            handleTableNameChange(tableIndex, "tableName", tableName);
        }

        const newTables = [...tables];
        newTables[tableIndex].columns.push({ name: columnName, alias: "" });
        setTables(newTables);
    };
    useEffect(() => {
        const storedData = Cookies.get('authToken') || "";
        setData(storedData);
      }, [])

    const handleSubmit = async () => {
        console.log("test query was pressed")
        // if (tables.length > 1) {
        //     for (let join of joins) {
        //         if (!join.on.trim()) {
        //             toast({ title: "Please ensure all join conditions are valid." });
        //             return;
        //         }
        //     }
        // }

        // Form validation
        for (let table of tables) {
            if (!table.tableName.trim() || !table.columns.length || table.columns.some((col) => !col.name.trim())) {
                toast({ title: "Please provide valid table names and columns." });
                return;
            }
        }

        let payload;

        if (tables.length === 1) {
            // Single table payload
            const table = tables[0];
            payload = {
                reportId: reportId,
                limit: 1,
                joins: [
                    {
                        tableName: table.tableName,
                        alias: table.alias,
                    }
                ],
                computedColumns: table.columns.map((column) => ({
                    alias: column.alias,
                    expression: column.name,
                })),
                filters: [],
            };
        } else {
            // Multi-table payload
            payload = {
                reportId: reportId,
                limit: 1,
                joins: joins.map((join) => ({
                    tableName: join.table,
                    alias: join.table,
                    joinType: join.type,
                    onCondition: join.on,
                })),
                computedColumns: tables.flatMap((table) =>
                    table.columns.map((column) => ({
                        alias: column.alias,
                        expression: `${table.tableName}.${column.name}`,
                    }))
                ),
                filters: [],
            };
        }
        console.log(payload);

        const request = process.env.NEXT_PUBLIC_TEST_QUERY;
        const apiUrl = buildUrl(request);

        try {
            const authToken = Cookies.get('authToken');
            console.log("i was pressed",reportId)

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 401 || response.status === 403) {
                Cookies.remove('authToken');
                router.push("/");
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setSubmittedData({ tables, joins });
                toast({ title: "Query submitted successfully!" });

                console.log("Success:", data);
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (error: any) {
            toast({ title: `Failed to submit the query: ${error.message}` });
            console.error("API Error:", error);
        }
    };

    return (
        <div className="space-y-4 lg:space-y-6">
            <Card className="shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                        Table Configurator
                    </CardTitle>
                    <Button 
                        variant="outline" 
                        onClick={addTable}
                        className="flex items-center gap-2 w-full sm:w-auto text-sm"
                    >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        Add Table
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {tables.map((table, tableIndex) => (
                        <Card
                            key={tableIndex}
                            className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, tableIndex)}
                        >
                            <CardContent className="p-3 sm:p-4 space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="flex-1 w-full space-y-1">
                                        <Label className="text-sm font-medium">Table Name</Label>
                                        <Input
                                            placeholder="Enter table name"
                                            value={table.tableName}
                                            onChange={(e) =>
                                                handleTableNameChange(tableIndex, "tableName", e.target.value)
                                            }
                                            className="text-sm"
                                        />
                                    </div>
                                    <div className="flex-1 w-full space-y-1">
                                        <Label className="text-sm font-medium">Alias</Label>
                                        <Input
                                            placeholder="Enter alias (optional)"
                                            value={table.alias}
                                            onChange={(e) =>
                                                handleTableNameChange(tableIndex, "alias", e.target.value)
                                            }
                                            className="text-sm"
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeTable(tableIndex)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-6 sm:mt-6 w-full sm:w-auto"
                                    >
                                        <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="sm:hidden ml-2">Remove</span>
                                    </Button>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Columns</Label>
                                    <div className="space-y-2">
                                        {table.columns.map((column, columnIndex) => (
                                            <div key={columnIndex} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                                <Input
                                                    placeholder="Column name"
                                                    value={column.name}
                                                    onChange={(e) => handleColumnChange(tableIndex, columnIndex, "name", e.target.value)}
                                                    className="flex-1 text-sm"
                                                />
                                                <Input
                                                    placeholder="Alias (optional)"
                                                    value={column.alias}
                                                    onChange={(e) => handleColumnChange(tableIndex, columnIndex, "alias", e.target.value)}
                                                    className="flex-1 text-sm"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeColumn(tableIndex, columnIndex)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                                                >
                                                    <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span className="sm:hidden ml-2">Remove</span>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addColumn(tableIndex)}
                                        className="w-full mt-2 text-sm"
                                    >
                                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                        Add Column
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                    <Button 
                        onClick={handleSubmit}
                        className="flex-1 w-full text-sm"
                        variant="outline"
                    >
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Test Query
                    </Button>
                    <Button className="flex-1 w-full text-sm">
                        <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Build Query
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TableConfigurator;
