// app/components/report-type/output-format-picker.tsx
"use client";

import { OutputFormat } from "@/app/enums/OutputFormat";
import IReportType from "@/types/report-type/ireport-type";

type renderOutPutFormatProps = {
    form: IReportType;
    setForm: React.Dispatch<React.SetStateAction<IReportType>>;
};

const renderOutPutFormat = ({ form, setForm }: renderOutPutFormatProps) => (
  <select
    name="outputType"
    value={form.outputType || OutputFormat.Excel}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        outputType: parseInt(e.target.value), // Ensure value is numeric
      }))
    }
    className="w-full border rounded px-3 py-2 text-sm"
  >
    <option value="" disabled>
      Select Output Type
    </option>
    {Object.entries(OutputFormat)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => (
        <option key={value} value={value}>
          {key}
        </option>
      ))}
  </select>
);

export default renderOutPutFormat;