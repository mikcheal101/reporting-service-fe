// app/utils/map-output-type.ts
"use client";

import { OutputFormat } from "../enums/OutputFormat";

const mapOutputType = (outputType: number | null): string => {
  switch (outputType) {
    case OutputFormat.Json:
      return "Json";
    case OutputFormat.Csv:
      return "Csv";
    case OutputFormat.Excel:
      return "Excel";
    case OutputFormat.PDF:
      return "PDF";
    case OutputFormat.Word:
      return "Word";
    default:
      return "Unknown";
  }
};

export default mapOutputType;