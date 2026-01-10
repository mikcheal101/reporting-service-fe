// components/report/query-editor/query-editor-ai.tsx
"use client";

import useAiQuery from "@/app/hooks/report/report-detail/query-editor/use-ai-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          AI Query Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Schema Overview */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Database className="w-4 h-4" />
            Available Tables ({tableData.length})
          </h4>
          <div className="flex flex-wrap gap-1">
            {tableData.slice(0, 10).map((table, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {table.tableName}
              </Badge>
            ))}
            {tableData.length > 10 && (
              <Badge variant="outline" className="text-xs">
                +{tableData.length - 10} more
              </Badge>
            )}
          </div>
        </div>

        {/* Query Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Describe what you want to query:
          </label>
          <Textarea
            placeholder="e.g., 'Show me all users who registered in the last 30 days with their email addresses'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateQuery}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Query...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Generate SQL Query
            </>
          )}
        </Button>

        {/* Generated Query */}
        {generatedQuery && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Generated Query:</label>
            <div className="relative">
              <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                <code>{generatedQuery}</code>
              </pre>
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyQuery}
                  className="h-8 w-8 p-0"
                >
                  {isCopied ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
            <Button onClick={useQuery} className="w-full" variant="outline">
              Use This Query
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QueryEditorAI;
