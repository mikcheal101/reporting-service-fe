// app/hooks/report/report-detail/query-editor/use-query-parser.ts
"use client";

const useQueryParser = () => {
    // ---------------- helpers ----------------
    const extractParameters = (q: string) =>
        Array.from(new Set(q.match(/@\w+/g) || []));

    const extractParameterTypes = (q: string) => {
        const regex = /declare\s+(@\w+)\s+As\s+(\w+)/gi;
        const map: Record<string, string> = {};
        let match;
        while ((match = regex.exec(q)) !== null) map[match[1]] = match[2];
        return map;
    };

    return {
        extractParameters,
        extractParameterTypes,
    };
};

export default useQueryParser;