// app/(pages)/report-type/ReportTypeTable.tsx
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ReportTypeForm from "@/components/report-type/report-type-form";
import useReportTypeTable from "@/app/hooks/report-type/use-report-type-table";
import ReportTypeList from "@/components/report-type/report-type-list";
import mapFrequency from "@/app/utils/map-frequency";
import mapOutputType from "@/app/utils/map-output-type";

const ReportType: React.FC = () => {
  const {
    isOpen,
    resetForm,
    handleUpdate,
    handleSave,
    form,
    setForm,
    setIsOpen,
    isLoading,
    reportTypes,
    deleteId,
    setDeleteId,
    handleDelete,
    handleEditReportType,
  } = useReportTypeTable();

  return (
    <div className="mt-0 p-0">
      <ReportTypeForm
        isOpen={isOpen}
        resetForm={resetForm}
        handleUpdate={handleUpdate}
        handleSave={handleSave}
        form={form}
        setForm={setForm}
        setIsOpen={setIsOpen}
      />
      <div className="p-3 sm:p-6 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold">Report Types</h3>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ReportTypeList
            reportTypes={reportTypes || []}
            handleEditReportType={handleEditReportType}
            setIsOpen={setIsOpen}
            setDeleteId={setDeleteId}
            deleteId={deleteId}
            handleDelete={handleDelete}
            mapOutputType={mapOutputType}
            mapFrequency={mapFrequency}
          />
        )}
      </div>
    </div>
  );
};

export default ReportType;
