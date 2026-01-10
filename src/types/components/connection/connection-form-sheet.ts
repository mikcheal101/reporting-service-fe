// types/components/connection/connection-form-sheet
"use client";

import IConnection from "@/types/connection/iconnection";

type ConnectionFormSheetProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  connection: IConnection | null;
  connectionId: string | null;

  formData: IConnection;
  setFormData: React.Dispatch<React.SetStateAction<IConnection>>;

  showPassword: boolean;
  setShowPassword: (v: boolean) => void;

  resetFields: () => void;
  setConnection: (c: IConnection | null) => void;
  setConnectionId: (id: string) => void;

  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTestConnection: () => void;
  handleSubmit: () => void;
};

export default ConnectionFormSheetProps;