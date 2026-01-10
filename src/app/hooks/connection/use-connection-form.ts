// app/hooks/connection/use-connection-form
"use client";
import IConnection from "@/types/connection/iconnection";
import IDataBaseType from "@/types/connection/idatabase-type";
import { useState } from "react";

const emptyForm: IConnection = {
  id: "",
  name: "",
  server: "",
  port: 0,
  user: "",
  password: "",
  database: "",
  isTestSuccessful: false,
  databaseType: IDataBaseType.MSSQL,
  description: "",
};

const useConnectionForm = () => {
  const [form, setForm] = useState<IConnection>(emptyForm);

  const resetForm = () => setForm(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((previousState: IConnection) => ({
      ...previousState,
      [name]: name === "databaseType" ? Number(value) : value, // Convert to number for databaseType
    }));
  };

  return {
    form,
    setForm,
    resetForm,
    handleChange,
  }
};

export default useConnectionForm;