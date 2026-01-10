// app/hooks/report-type-table.ts
"use client";

import useReportTypeForm from "./use-report-type-form";
import useSaveReportType from "./use-save-report-type";
import useUpdateReportType from "./use-update-report-type";
import useDeleteReportType from "./use-delete-report-type";
import useReportType from "./use-report-type";
import { useState } from "react";
import IReportType from "@/types/report-type/ireport-type";

const useReportTypeTable = () => {
  const [isOpen, setIsOpen] = useState(false); // Sheet toggle
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { form, setForm, resetForm, handleChange } = useReportTypeForm();
  const { data: reportTypes, isLoading, isError } = useReportType();
  const saveReportTypeMutation = useSaveReportType();
  const updateReportTypeMutation = useUpdateReportType();
  const deleteReportTypeMutation = useDeleteReportType();

  const handleSave = async () => {
    saveReportTypeMutation.mutate(form);
    setIsOpen(false);
  }

  const handleUpdate = async () => {
    updateReportTypeMutation.mutate(form);
    setIsOpen(false);
  }

  const handleEditReportType = (reportType: IReportType) => {
    setForm(reportType);
  };

  const handleDelete = async (id: string | null) => {
    if (id) deleteReportTypeMutation.mutate(id);
  }

  return {
    form,
    setForm,
    handleChange,
    reportTypes,
    isLoading,
    isError,
    resetForm,

    handleSave,
    handleUpdate,
    handleDelete,
    handleEditReportType,
    deleteId,
    setDeleteId,

    isOpen,
    setIsOpen,
  };
};

export default useReportTypeTable;