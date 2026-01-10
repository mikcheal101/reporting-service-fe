// app/components/report-type/time-picker.tsx
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
        [fieldId]: e.target.value, // Update time
      }))
    }
    className="w-full border border-[#EAB308] rounded-lg px-2 sm:px-3 py-2 shadow-sm hover:shadow-md focus:ring-2 focus:ring-[#EAB308] transition text-sm"
  />
);

export default renderTimePicker;