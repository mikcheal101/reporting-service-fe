import { Frequency } from "@/app/enums/Frequency";
import { OutputFormat } from "@/app/enums/OutputFormat";

export default interface IReportType {
  id: string;
  name: string;
  outputType: OutputFormat | null;
  frequency: Frequency | null;
  runDate: string;
  runTime: string;
  emailsToNotify: string;
};