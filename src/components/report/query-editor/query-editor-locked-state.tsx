"use client";

import { Lock, Lightbulb } from "lucide-react";

type QueryEditorLockedStateProps = {
  title: string;
  description: string;
};

const QueryEditorLockedState = ({
  title,
  description,
}: QueryEditorLockedStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="rounded-full bg-gray-100 dark:bg-muted p-4 mb-4">
      <Lock className="h-8 w-8 text-gray-400 dark:text-gray-500" />
    </div>
    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">{description}</p>
    <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50/50 p-3 max-w-sm text-left">
      <Lightbulb className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
      <p className="text-xs text-blue-700">
        Complete the report form in the sidebar to unlock this editor.
      </p>
    </div>
  </div>
);

export default QueryEditorLockedState;
