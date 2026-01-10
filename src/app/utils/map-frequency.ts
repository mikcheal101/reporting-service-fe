// app/utils/map-frequency.ts
import { Frequency } from "@/app/enums/Frequency";

const mapFrequency = (frequency: number | null): string => {
  switch (frequency) {
    case Frequency.OnRequest:
      return "OnRequest";
    case Frequency.Daily:
      return "Daily";
    case Frequency.Weekly:
      return "Weekly";
    case Frequency.Monthly:
      return "Monthly";
    case Frequency.Biannual:
      return "Biannual";
    case Frequency.Annually:
      return "Annually";
    default:
      return "Unknown";
  }
};

export default mapFrequency;