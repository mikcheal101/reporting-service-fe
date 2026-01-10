// app/(pages)/report/report-details/query-editor.tsx
"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Sparkles } from "lucide-react";
import QueryEditorLockedState from "@/components/report/query-editor/query-editor-locked-state";
import QueryEditorManual from "@/components/report/query-editor/query-editor-manual";
import useQueryEditor from "@/app/hooks/report/report-detail/query-editor/use-query-editor";
import IReport from "@/types/report/ireport";
import QueryEditorAI from "@/components/report/query-editor/query-editor-ai";

type QueryEditorProps = {
  defaultTab?: string;
  report: IReport;
};

const QueryEditor: React.FC<QueryEditorProps> = ({
  report,
}) => {
  const {
    activeTab,
    setActiveTab,
    query,
    result,
    isTestSuccessful,
    handleAIQueryGenerated,
    handleEditorChange,
    isLoading,
    runTest,
    runExecute,
    parameters,
    addManualParameter,
    getAllParameters,
    updateManualParameter,
    removeManualParameter,
    sqlToJsTypeMap,
    handleParameterChange,
    parameterValues,
  } = useQueryEditor({ report });

  return (
    <div className="w-full space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="editor"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            SQL Editor
          </TabsTrigger>

          <TabsTrigger
            value="ai"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          {!report.id ? (
            <QueryEditorLockedState
              title="SQL Query Editor"
              description="Please create and save a report first before using the SQL editor. This ensures your queries are properly associated with a report and prevents testing errors."
            />
          ) : (
            <QueryEditorManual
              query={query}
              result={result}
              isLoading={isLoading}
              isTestSuccessful={isTestSuccessful}
              handleEditorChange={handleEditorChange}
              runTest={runTest}
              runExecute={runExecute}
              addManualParameter={addManualParameter}
              updateManualParameter={updateManualParameter}
              getAllParameters={getAllParameters}
              parameters={parameters}
              removeManualParameter={removeManualParameter}
              sqlToJsTypeMap={sqlToJsTypeMap}
              parameterValues={parameterValues}
              handleParameterChange={handleParameterChange}
            />
          )}
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          {!report.id ? ( 
            <QueryEditorLockedState
              title="AI Query Assistant"
              description="The AI Query Assistant requires an active report context to generate relevant queries. Please create a report first to access AI-powered query generation."
            />
          ) : (
            <QueryEditorAI
              report={report}
              onQueryGenerated={handleAIQueryGenerated}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QueryEditor;
