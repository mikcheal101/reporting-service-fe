"use client";

import IReportType from "@/types/report-type/ireport-type";

type renderDatePickerProps = {
    fieldId: string;
    value: string;
    setForm: React.Dispatch<React.SetStateAction<IReportType>>;
};

const renderDatePicker = ({fieldId, value, setForm }: renderDatePickerProps) => (
  <input
    type="date"
    id={fieldId}
    value={value}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        [fieldId]: e.target.value,
      }))
    }
    className="w-full rounded-lg border-gray-200 dark:border-border px-3 py-2 text-sm bg-white dark:bg-card shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
  />
);

export default renderDatePicker;
