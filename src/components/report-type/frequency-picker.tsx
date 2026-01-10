import { Frequency } from "@/app/enums/Frequency";
import IReportType from "@/types/report-type/ireport-type";

type IRenderFrequency = {
  form: IReportType;
  setForm: React.Dispatch<React.SetStateAction<IReportType>>;
};

const renderFrequency = ({ setForm, form }: IRenderFrequency) => (
  <select
    value={form.frequency || ""}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        frequency: parseInt(e.target.value), // Ensure value is numeric
      }))
    }
    className="w-full border rounded px-3 py-3 text-sm"
  >
    <option value="" disabled>
      Select Frequency
    </option>
    {Object.entries(Frequency)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => (
        <option key={value} value={value}>
          {key}
        </option>
      ))}
  </select>
);

export default renderFrequency;