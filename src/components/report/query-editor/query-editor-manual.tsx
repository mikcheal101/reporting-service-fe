// components/report/query-editor/query-editor-manual.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ControlledEditor from "@uiw/react-codemirror";
import { Code, Loader2, Play, Plus, Save, Settings, Trash2 } from "lucide-react";
import { sql } from "@codemirror/lang-sql";
import IQueryParameter from "@/types/report/iquery-parameter";
import { QueryParameterValue } from "@/types/report/query-parameter-value";

type QueryEditorManualProps = {
    query: string;
    result: string | null;
    isLoading: boolean;
    isTestSuccessful: boolean;
    parameters: Array<string>;
    parameterValues: Record<string, QueryParameterValue>;
    sqlToJsTypeMap: Record<string, string>;
    runTest: () => void;
    runExecute: () => void;
    handleEditorChange: () => void;
    addManualParameter: () => void;
    getAllParameters: () => IQueryParameter[];
    removeManualParameter: (index: number) => void;
    handleParameterChange: (name: string, value: string) => void;
    updateManualParameter: (index: number, field: string, value: string) => void;
};

const QueryEditorManual = ({
    query,
    result,
    parameters,
    isLoading,
    isTestSuccessful,
    handleEditorChange,
    runTest,
    runExecute,
    parameterValues,
    addManualParameter,
    getAllParameters,
    removeManualParameter,
    handleParameterChange,
    updateManualParameter,
    sqlToJsTypeMap,
}: QueryEditorManualProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
        <Code className="w-4 h-4 sm:w-5 sm:h-5" />
        SQL Query Editor
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Code Editor */}
      <div className="border rounded-md overflow-hidden">
        <ControlledEditor
          value={query}
          onChange={handleEditorChange}
          extensions={[sql()]}
          className="min-h-[200px] sm:min-h-[300px] text-sm"
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
          }}
        />
      </div>

      {/* Parameters Section - Always Visible */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Parameters</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addManualParameter}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Parameter
          </Button>
        </div>

        {getAllParameters().length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {getAllParameters().map((param, index) => (
              <div
                key={`${param.name}-${index}`}
                className="p-3 border rounded-lg bg-gray-50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        param.isDetected
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {param.isDetected ? "Auto-detected" : "Manual"}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                      {param.dataType}
                    </span>
                  </div>
                  {!param.isDetected && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        removeManualParameter(index - parameters.length)
                      }
                      className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">
                      Parameter Name
                    </Label>
                    {param.isDetected ? (
                      <Input
                        value={param.name}
                        disabled
                        className="text-sm bg-gray-100"
                      />
                    ) : (
                      <Input
                        value={param.name}
                        onChange={(e) =>
                          updateManualParameter(
                            index - parameters.length,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="@paramName"
                        className="text-sm"
                      />
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Data Type</Label>
                    {param.isDetected ? (
                      <Input
                        value={param.dataType}
                        disabled
                        className="text-sm bg-gray-100"
                      />
                    ) : (
                      <Select
                        value={param.dataType}
                        onValueChange={(value) =>
                          updateManualParameter(
                            index - parameters.length,
                            "dataType",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STRING">STRING</SelectItem>
                          <SelectItem value="INT">INT</SelectItem>
                          <SelectItem value="DECIMAL">DECIMAL</SelectItem>
                          <SelectItem value="DATE">DATE</SelectItem>
                          <SelectItem value="NVARCHAR">NVARCHAR</SelectItem>
                          <SelectItem value="VARCHAR">VARCHAR</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Value</Label>
                    <Input
                      type={
                        sqlToJsTypeMap[param.dataType] === "date"
                          ? "date"
                          : "text"
                      }
                      placeholder={`Enter value for ${param.name}`}
                      value={
                        param.isDetected
                          ? parameterValues[param.name]?.toString() || ""
                          : param.value ?? ""
                      }
                      onChange={(e) => {
                        if (param.isDetected) {
                          handleParameterChange(param.name, e.target.value);
                        } else {
                          updateManualParameter(
                            index - parameters.length,
                            "value",
                            e.target.value
                          );
                        }
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            <Settings className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No parameters defined</p>
            <p className="text-xs text-gray-400 mt-1">
              Add parameters manually or use @ syntax in your query
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <Button
          onClick={() => runTest()}
          disabled={isLoading}
          className="flex-1 text-sm"
          variant="outline"
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
          ) : (
            <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          )}
          Test Query
        </Button>
        <Button
          onClick={() => runExecute()}
          disabled={isLoading || !isTestSuccessful}
          className="flex-1 text-sm"
        >
          <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Save Query
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-4">
          <Label className="text-sm font-medium mb-2 block">Query Result</Label>
          <div className="bg-gray-50 p-3 rounded-md border max-h-[200px] overflow-auto">
            <pre className="text-xs whitespace-pre-wrap">{result}</pre>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default QueryEditorManual;
