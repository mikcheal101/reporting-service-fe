"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FadeIn } from "@/components/ui/fade-in";
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
      <FadeIn delay={0} direction="up">
        <div className="flex justify-end mb-4">
          <ReportTypeForm
            isOpen={isOpen}
            resetForm={resetForm}
            handleUpdate={handleUpdate}
            handleSave={handleSave}
            form={form}
            setForm={setForm}
            setIsOpen={setIsOpen}
          />
        </div>
      </FadeIn>
      <FadeIn delay={100} direction="up">
        <div className="p-6 bg-card shadow-lg rounded-lg border border-border">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6">Report Types</h2>

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
      </FadeIn>
    </div>
  );
};

export default ReportType;
