"use client";

import IReportType from "@/types/report-type/ireport-type";

type renderTimePickerProps = {
    fieldId: string;
    value: string;
    setForm: React.Dispatch<React.SetStateAction<IReportType>>;
};

const renderTimePicker = ({fieldId, value, setForm }: renderTimePickerProps) => (
  <input
    type="time"
    id={fieldId}
    value={value}
    step="1"
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        [fieldId]: e.target.value,
      }))
    }
    className="w-full rounded-lg border-gray-200 dark:border-border px-3 py-2 text-sm bg-white dark:bg-card shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
  />
);

export default renderTimePicker;
