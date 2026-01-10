// components/ui/database-dropdown
"use client";
import IConnection from "@/types/connection/iconnection";
import IDataBaseType from "@/types/connection/idatabase-type";

const renderDatabaseTypeDropdown = (
  formData: IConnection,
  setFormData: React.Dispatch<React.SetStateAction<IConnection>>
) => (
  <select
    name="databaseType"
    value={formData.databaseType}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        databaseType: Number(e.target.value) as IDataBaseType,
      }))
    }
    className="w-full border rounded px-3 py-2"
  >
    <option value="" disabled>
      Select Database
    </option>
    {Object.entries(IDataBaseType)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => (
        <option key={value} value={value}>
          {key}
        </option>
      ))}
  </select>
);

export default renderDatabaseTypeDropdown;
