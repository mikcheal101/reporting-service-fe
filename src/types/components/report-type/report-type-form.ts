// types/components/report-type/report-type-form.ts
"use client";

import IReportType from "@/types/report-type/ireport-type";


type ReportTypeFormProps = {
  isOpen: boolean;
  resetForm: () => void;
  handleUpdate: () => void;
  handleSave: () => void;
  form: IReportType;
  setForm: React.Dispatch<React.SetStateAction<IReportType>>;
  reportTypeId?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ReportTypeFormProps;