// app/hooks/report-type/use-report-form
"use client";

import IReport from "@/types/report-type/ireport-type";
import { useState } from "react";

const emptyForm: IReport = {
  id: "",
  name: "",
  outputType: null,
  frequency: null,
  runDate: "",
  runTime: "",
  emailsToNotify: "",
};

const useReportTypeForm = () => {
  const [form, setForm] = useState<IReport>(emptyForm);

  const resetForm = () => setForm(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev: IReport) => ({
      ...prev,
      [name]: name === "frequency" ? Number(value) : value, // Convert to number for databaseType
    }));
  };

  return {
    form,
    setForm,
    resetForm,
    handleChange,
  };
};

export default useReportTypeForm;