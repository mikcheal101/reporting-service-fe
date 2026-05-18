import { Frequency } from "@/app/enums/Frequency";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import IReportType from "@/types/report-type/ireport-type";

type IRenderFrequency = {
  form: IReportType;
  setForm: React.Dispatch<React.SetStateAction<IReportType>>;
};

const renderFrequency = ({ setForm, form }: IRenderFrequency) => (
  <Select
    value={form.frequency !== undefined && form.frequency !== null && form.frequency >= 0 ? String(form.frequency) : ""}
    onValueChange={(value) =>
      setForm((prev) => ({
        ...prev,
        frequency: parseInt(value),
      }))
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Frequency" />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(Frequency)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => (
          <SelectItem key={value} value={String(value)}>
            {key}
          </SelectItem>
        ))}
    </SelectContent>
  </Select>
);

export default renderFrequency;
