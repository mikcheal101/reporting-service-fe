// app/(pages)/report/report-details/[id]/report-form-section.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useReportFormSection from "@/app/hooks/report/report-detail/use-report-form-section";
import ReportDetailList from "./report-details-list";
import IReport from "@/types/report/ireport";

type ReportFormSectionProps = {
  form: IReport;
  setForm: React.Dispatch<React.SetStateAction<IReport>>;
};

const ReportFormSection = ({ form, setForm }: ReportFormSectionProps) => {
  const {
    handleInput,
    handleSave,
    handleViewReport,
    isSavingReport,
    connections,
    isFormValid,
    reportTypes,
    isLoadingConnections,
    isLoadingReportTypes,
  } = useReportFormSection({form, setForm});

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4">
      <div className="space-y-4">
        {/* Report Creation Status */}
        {!form.id && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Create Report First
                </h3>
                <div className="mt-1 text-sm text-yellow-700">
                  <p>
                    Please fill out the form below and save the report before
                    using the query editor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Report Name</Label>
          <Input
            name="name"
            placeholder="Enter report name"
            value={form.name}
            onChange={handleInput}
            className="w-full text-sm"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Input
            name="description"
            placeholder="Enter description"
            value={form.description}
            onChange={handleInput}
            className="w-full text-sm"
          />
        </div>

        {/* Connection Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Connection</Label>
          {isLoadingConnections ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select
              required
              value={form.connectionId}
              onValueChange={(value) => {
                handleInput({ name: "connectionId", value });
              }}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select a connection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Connections</SelectLabel>
                  {connections?.map((connection) => (
                    <SelectItem key={connection.id} value={connection.id}>
                      {connection.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Report Type Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Report Type</Label>
          {isLoadingReportTypes ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select
              required
              name="reportTypeId"
              value={form.reportTypeId}
              onValueChange={(value) => {
                handleInput({ name: "reportTypeId", value });
              }}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select a report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Report Types</SelectLabel>
                  {reportTypes?.map((reportType) => (
                    <SelectItem key={reportType.id} value={reportType.id}>
                      {reportType.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button
            onClick={handleSave}
            disabled={isSavingReport || !isFormValid() || !!form.id}
            className="flex-1 text-sm"
          >
            {isSavingReport ? "Saving..." : "Save Report"}
          </Button>
          <Button
            onClick={handleViewReport}
            variant="outline"
            className="flex-1 text-sm"
          >
            View Reports
          </Button>
        </div>
      </div>

      {/* Report Details List */}
      <div className="mt-6">
        <ReportDetailList activeConnectionId={Number(form.connectionId)} />
      </div>
    </div>
  );
};

export default ReportFormSection;
