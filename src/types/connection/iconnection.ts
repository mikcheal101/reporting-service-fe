// types/connection/iconnection

import IDataBaseType from "./idatabase-type";

export default interface IConnection {
  id: string;
  name: string;
  server: string;
  port: number;
  user: string;
  password?: string;
  isTestSuccessful: boolean;
  database: string;
  databaseType: IDataBaseType;
  description?: string;
};
