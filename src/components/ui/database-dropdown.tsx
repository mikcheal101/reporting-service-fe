// components/ui/database-dropdown
"use client";
import IDataBaseType from "@/types/connection/idatabase-type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const renderDatabaseTypeDropdown = (
  databaseType: number,
  onChange: (value: number) => void,
) => (
  <Select
    value={String(databaseType)}
    onValueChange={(value) => onChange(Number(value) as IDataBaseType)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Database" />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(IDataBaseType)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => (
          <SelectItem key={value} value={String(value)}>
            {key}
          </SelectItem>
        ))}
    </SelectContent>
  </Select>
);

export default renderDatabaseTypeDropdown;
