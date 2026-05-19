"use client";

import useAiQuery from "@/app/hooks/report/report-detail/query-editor/use-ai-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import IReport from "@/types/report/ireport";
import { Check, Copy, Database, Loader2, Send, Sparkles } from "lucide-react";

interface QueryEditorAIProps {
  report: IReport;
  onQueryGenerated: (query: string) => void;
};

const QueryEditorAI = ({ report, onQueryGenerated }: QueryEditorAIProps) => {
  const {
    prompt,
    setPrompt,
    isLoading,
    generatedQuery,
    copyQuery,
    useQuery,
    tableData,
    generateQuery,
    isCopied,
  } = useAiQuery({
    report,
    onQueryGenerated,
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-purple-500" />
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">AI Assistant</h3>
      </div>

      {/* Schema Overview */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Database className="h-3.5 w-3.5" />
          Available Tables ({tableData.length})
        </h4>
        <div className="flex flex-wrap gap-1">
          {tableData.slice(0, 10).map((table, index) => (
            <Badge key={index} variant="outline" className="text-[10px]">
              {table.tableName}
            </Badge>
          ))}
          {tableData.length > 10 && (
            <Badge variant="outline" className="text-[10px]">
              +{tableData.length - 10} more
            </Badge>
          )}
        </div>
      </div>

      {/* Query Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Describe your query
        </label>
        <Textarea
          placeholder='e.g. "Show all users who registered in the last 30 days"'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="resize-none text-sm"
        />
      </div>

      {/* Generate Button */}
      <Button
        onClick={generateQuery}
        disabled={isLoading || !prompt.trim()}
        className="w-full"
        size="sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Send className="h-3.5 w-3.5 mr-2" />
            Generate SQL
          </>
        )}
      </Button>

      {/* Generated Query */}
      {generatedQuery && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Generated Query</span>
          <div className="relative">
            <pre className="bg-gray-50 dark:bg-muted/50 rounded-lg border p-3 text-xs font-mono overflow-x-auto max-h-[200px]">
              <code>{generatedQuery}</code>
            </pre>
            <div className="absolute top-2 right-2 flex gap-1">
              <Button size="sm" variant="outline" onClick={copyQuery} className="h-7 w-7 p-0">
                {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          <Button onClick={useQuery} className="w-full" variant="outline" size="sm">
            Use This Query
          </Button>
        </div>
      )}
    </div>
  );
};

export default QueryEditorAI;
