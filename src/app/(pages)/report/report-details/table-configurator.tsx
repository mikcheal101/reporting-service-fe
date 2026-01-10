"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash, Database, Plus, Play, Save } from "lucide-react";
import useTableConfigurator from "@/app/hooks/report/report-detail/use-table-configurator";

const TableConfigurator = () => {
  const {
    addTable,
    tables,
    updateTable,
    removeTable,
    handleDragOver,
    updateColumn,
    removeColumn,
    handleSubmit,
    addColumn,
  } = useTableConfigurator();

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
            >
              <CardContent className="p-3 sm:p-4 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex-1 w-full space-y-1">
                    <Label>Table Name</Label>
                    <Input
                      value={table.tableName}
                      placeholder="Enter table name"
                      onChange={(e) =>
                        updateTable(tableIndex, "tableName", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1 w-full space-y-1">
                    <Label>Alias</Label>
                    <Input
                      value={table.alias}
                      placeholder="Enter alias (optional)"
                      onChange={(e) =>
                        updateTable(tableIndex, "alias", e.target.value)
                      }
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
                  <Label>Columns</Label>
                  {table.columns.map((col, colIndex) => (
                    <div
                      key={colIndex}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
                    >
                      <Input
                        value={col.name}
                        placeholder="Column name"
                        onChange={(e) =>
                          updateColumn(
                            tableIndex,
                            colIndex,
                            "name",
                            e.target.value
                          )
                        }
                        className="flex-1 text-sm"
                      />
                      <Input
                        value={col.alias}
                        placeholder="Alias (optional)"
                        onChange={(e) =>
                          updateColumn(
                            tableIndex,
                            colIndex,
                            "alias",
                            e.target.value
                          )
                        }
                        className="flex-1 text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColumn(tableIndex, colIndex)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                      >
                        <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="sm:hidden ml-2">Remove</span>
                      </Button>
                    </div>
                  ))}
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
            <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" /> Test Query
          </Button>
          <Button className="flex-1 w-full text-sm">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" /> Build Query
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TableConfigurator;
