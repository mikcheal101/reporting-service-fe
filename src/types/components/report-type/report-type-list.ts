// types/components/report-type/report-type-list.ts
"use client";

import { Frequency } from "@/app/enums/Frequency";
import { OutputFormat } from "@/app/enums/OutputFormat";
import IReportType from "@/types/report-type/ireport-type";

type ReportTypeListProps = {
  reportTypes: IReportType[];
  handleEditReportType: (reportType: IReportType) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  deleteId: string | null;
  handleDelete: (id: string | null) => void;
  mapOutputType: (outputType: OutputFormat | null) => string;
  mapFrequency: (frequency: Frequency | null) => string;
};

export default ReportTypeListProps;