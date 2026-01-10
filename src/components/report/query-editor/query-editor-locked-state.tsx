// components/report/query-editor/query-editor-locked-state.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

type QueryEditorLockedStateProps = {
  title: string;
  description: string;
};

const QueryEditorLockedState = ({
  title,
  description,
}: QueryEditorLockedStateProps) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Lock className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Editor Locked
        </h3>
        <p className="text-sm text-gray-500 mb-4 max-w-md">{description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Complete the report form in the sidebar to
            unlock this editor.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default QueryEditorLockedState;
