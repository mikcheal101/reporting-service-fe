// app/hooks/connection/use-connection-table.ts
"use client";
import useSaveConnection from "./use-save-connection";
import useUpdateConnection from "./use-update-connection";
import useDeleteConnection from "./use-delete-connection";
import useConnection from "./use-connection";
import useConnectionForm from "./use-connection-form";
import { useEffect, useState } from "react";
import IConnection from "@/types/connection/iconnection";
import useTestConnection from "./use-test-connection";

const useConnectionTable = () => {

  const { data: connections, isLoading, isError } = useConnection();
  const {mutate: deleteConnectionMutation} = useDeleteConnection();
  const {mutate: saveConnectionMutation} = useSaveConnection();
  const {mutate: updateConnectionMutation} = useUpdateConnection();
  const { mutate: testConnectionMutation, isPending: isTesting } = useTestConnection();
  const [result, setResult] = useState<boolean>(false);
  const { form, setForm, resetForm, handleChange } = useConnectionForm();

  // Ui state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [connection, setConnection] = useState<IConnection | null>(null);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isTestSuccessful, setIsTestSuccessful] = useState<Record<string, boolean>>({});


  const resetFields = () => {
    resetForm();
    setConnection(null);
    setConnectionId(null);
    setShowPassword(false);
  };

  const handleEditConnection = (connection: IConnection) => {
    setConnection(connection);
    setConnectionId(connection.id || null);
    setForm(connection);
  };

  const handleDeleteConnection = (id: string | null) => {
    if (id) deleteConnectionMutation(Number.parseInt(id));
  }

  const handleSubmit = () => {
    const formWithStatus = reformatForm(form); 
    if (form.id) updateConnectionMutation(formWithStatus);
    else saveConnectionMutation(formWithStatus);
  };

  const handleTestConnection = async () => {
    const formWithStatus = reformatForm(form);
    testConnectionMutation(formWithStatus, {
      onSuccess: (success) => {
        setResult(success);
        setForm({
          ...form,
          isTestSuccessful: success,
        });

        if (form.id) {
          setIsTestSuccessful((prev) => ({
            ...prev,
            [form.id]: success,
          }));
        }
      },
    });
  }

  const reformatForm = (form: IConnection) => ({
    ...form,
    port: Number.parseInt(form.port.toString()),
  });

  useEffect(() => {
    if (!connections) return;
    const testStatus = Object.fromEntries(
      (connections ?? []).map((c) => [c.id, c.isTestSuccessful ?? false])
    );
    setIsTestSuccessful(testStatus);
  }, [connections]);


  return {
    isError,
    isLoading,
    connections,

    form,
    setForm,
    resetFields,
    handleChange,
    handleTestConnection,
    handleEditConnection,
    handleDeleteConnection,
    handleSubmit,
    isTesting,
    result,
    viewMode,
    setViewMode,
    isTestSuccessful,

    isOpen,
    deleteId,
    setDeleteId,
    setIsOpen,
    showPassword,
    setShowPassword,
    connection,
    setConnection,
    connectionId,
    setConnectionId,
  };
};

export default useConnectionTable;