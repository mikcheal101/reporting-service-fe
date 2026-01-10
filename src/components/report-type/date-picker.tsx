// app/components/report-type/date-picker.tsx
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
        [fieldId]: e.target.value, // Update date
      }))
    }
    className="w-full border border-[#EAB308] rounded-lg px-2 sm:px-3 py-2 shadow-sm hover:shadow-md focus:ring-2 focus:ring-[#EAB308] transition text-sm"
  />
);

export default renderDatePicker;