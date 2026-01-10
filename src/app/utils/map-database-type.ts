// app/utils/map-database-type.ts
"use client"

import IDataBaseType from "@/types/connection/idatabase-type";

const MapToDatabaseType = (databaseType: number): string => {
  switch (databaseType) {
    case IDataBaseType.Firebird:
      return "Firebird";
    case IDataBaseType.H2Database:
      return "H2Database";
    case IDataBaseType.IBMDb2:
      return "IBMDb2";
    case IDataBaseType.MSSQL:
      return "MS SQL Server";
    case IDataBaseType.MariaDB:
      return "MariaDB";
    case IDataBaseType.MySQL:
      return "MySQL";
    case IDataBaseType.Oracle:
      return "Oracle";
    case IDataBaseType.PostgreSQL:
      return "PostgreSQL";
    default:
      return "Unknown";
  }
};

export default MapToDatabaseType;