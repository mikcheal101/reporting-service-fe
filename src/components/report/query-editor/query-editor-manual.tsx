"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ControlledEditor from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { ChevronDown, ChevronRight, Code, Loader2, Play, Plus, Save, Trash2 } from "lucide-react";
import { sql } from "@codemirror/lang-sql";
import IQueryParameter from "@/types/report/iquery-parameter";
import { QueryParameterValue } from "@/types/report/query-parameter-value";

type QueryEditorManualProps = {
    query: string;
    result: string | null;
    isLoading: boolean;
    isTestSuccessful: boolean;
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
}: QueryEditorManualProps) => {
  const [showParams, setShowParams] = useState(true);

  const allParams = getAllParameters();
  const manualParams = allParams.filter((p) => !p.isDetected);
  const detectedParams = allParams.filter((p) => p.isDetected);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 shrink-0">
        <Code className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">SQL Editor</h3>
      </div>

      {/* Code Editor - constrained height */}
      <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shrink-0">
        <div className="max-h-[220px] overflow-y-auto">
          <ControlledEditor
            value={query}
            onChange={handleEditorChange}
            extensions={[sql(), EditorView.lineWrapping]}
            className="text-sm"
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
            }}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          onClick={() => runTest()}
          disabled={isLoading}
          size="sm"
          variant="outline"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5 mr-1.5" />
          )}
          Test
        </Button>
        <Button
          onClick={() => runExecute()}
          disabled={isLoading || !isTestSuccessful}
          size="sm"
        >
          <Save className="h-3.5 w-3.5 mr-1.5" />
          Execute
        </Button>
        <div className="flex-1" />
        <button
          onClick={() => setShowParams(!showParams)}
          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {showParams ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
          Parameters ({allParams.length})
        </button>
      </div>

      {/* Parameters Section - scrollable */}
      {showParams && (
        <div className="border rounded-lg bg-gray-50/50 dark:bg-muted/50 shrink-0">
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Parameters</span>
            <Button type="button" variant="outline" size="sm" onClick={addManualParameter} className="h-7 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          {allParams.length > 0 ? (
            <div className="max-h-[180px] overflow-y-auto px-4 pb-3 space-y-2">
              {/* Auto-detected params */}
              {detectedParams.map((param) => (
                  <div key={param.name} className="rounded-lg border bg-white dark:bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                        Auto
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-muted text-gray-600 dark:text-gray-400 rounded">
                        {param.dataType}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 dark:text-gray-400">Name</Label>
                      <Input value={param.name} disabled className="text-xs h-7 bg-gray-50 dark:bg-muted/50" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 dark:text-gray-400">Value</Label>
                      <Input
                        type={sqlToJsTypeMap[param.dataType?.toUpperCase()] === "date" ? "date" : "text"}
                        placeholder={`Enter ${param.name}`}
                        value={parameterValues[param.name]?.toString() || ""}
                        onChange={(e) => handleParameterChange(param.name, e.target.value)}
                        className="text-xs h-7"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Manual params */}
              {manualParams.map((param, idx) => (
                <div key={`manual-${idx}`} className="rounded-lg border bg-white dark:bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        Manual
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-muted text-gray-600 dark:text-gray-400 rounded">
                        {param.dataType}
                      </span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeManualParameter(idx)} className="text-red-500 hover:text-red-700 h-6 w-6 p-0">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 dark:text-gray-400">Name</Label>
                      <Input
                        value={param.name}
                        onChange={(e) => updateManualParameter(idx, "name", e.target.value)}
                        placeholder="@paramName"
                        className="text-xs h-7"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 dark:text-gray-400">Type</Label>
                      <Select
                        value={param.dataType}
                        onValueChange={(value) => updateManualParameter(idx, "dataType", value)}
                      >
                        <SelectTrigger className="text-xs h-7">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["STRING", "INT", "DECIMAL", "DATE", "NVARCHAR", "VARCHAR"].map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-gray-500 dark:text-gray-400">Value</Label>
                      <Input
                        type={sqlToJsTypeMap[param.dataType?.toUpperCase()] === "date" ? "date" : "text"}
                        placeholder={`Enter ${param.name}`}
                        value={param.value ?? ""}
                        onChange={(e) => updateManualParameter(idx, "value", e.target.value)}
                        className="text-xs h-7"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 pb-4">
              <div className="text-center py-6 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-border rounded-lg">
                <p className="text-xs">No parameters. Use <code className="bg-gray-100 dark:bg-muted px-1 rounded">@param</code> syntax or add manually.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results - constrained */}
      {result && (
        <div className="space-y-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${isTestSuccessful ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Result</span>
          </div>
          <div className="bg-gray-50 dark:bg-muted/50 rounded-lg border p-3 max-h-[180px] overflow-auto">
            <pre className="text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-mono">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryEditorManual;
