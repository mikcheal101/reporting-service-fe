// app/hooks/report/report-detail/query-editor/use-generate-ai.query.ts
"use client";

import { generateAiQueryAsync } from "@/app/services/report/query-service";
import { toast } from "@/hooks/use-toast";
import IGenerateAiQuery from "@/types/report/igenerate-ai-query";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGenerateAiQuery = () => (useMutation<string, AxiosError, IGenerateAiQuery>({
    mutationFn: generateAiQueryAsync,
    onSuccess: () => {
        toast({ title: 'Query generated successfully!' });
    },
    onError: (error) => {
        toast({
            title: 'Error generating query',
            description: 'Please try again or check your Ollama connection',
            variant: 'destructive'
        });
    },
}));

export default useGenerateAiQuery;  