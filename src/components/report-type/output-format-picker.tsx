"use client";

import { OutputFormat } from "@/app/enums/OutputFormat";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import IReportType from "@/types/report-type/ireport-type";

type renderOutPutFormatProps = {
  form: IReportType;
  setForm: React.Dispatch<React.SetStateAction<IReportType>>;
};

const renderOutPutFormat = ({ form, setForm }: renderOutPutFormatProps) => (
  <Select
    value={form.outputType !== undefined && form.outputType !== null && form.outputType >= 0 ? String(form.outputType) : ""}
    onValueChange={(value) =>
      setForm((prev) => ({
        ...prev,
        outputType: parseInt(value),
      }))
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Output Type" />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(OutputFormat)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => (
          <SelectItem key={value} value={String(value)}>
            {key}
          </SelectItem>
        ))}
    </SelectContent>
  </Select>
);

export default renderOutPutFormat;
