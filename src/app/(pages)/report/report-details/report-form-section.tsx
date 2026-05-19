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
import { AlertCircle, Save, Eye } from "lucide-react";
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
    <div className="p-4 space-y-5">
      {/* Report Creation Status */}
      {!form.id && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Create Report First</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Fill out the form and save before using the query editor.
            </p>
          </div>
        </div>
      )}

      {/* Report Name */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Report Name</Label>
        <Input
          name="name"
          placeholder="Enter report name"
          value={form.name}
          onChange={handleInput}
          className="w-full text-sm"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</Label>
        <Input
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleInput}
          className="w-full text-sm"
        />
      </div>

      {/* Connection Selection */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connection</Label>
        {isLoadingConnections ? (
          <Skeleton className="h-9 w-full" />
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
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Report Type</Label>
        {isLoadingReportTypes ? (
          <Skeleton className="h-9 w-full" />
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
      <div className="flex flex-col gap-2 pt-1">
        <Button
          onClick={handleSave}
          disabled={isSavingReport || !isFormValid() || !!form.id}
          size="sm"
          className="w-full"
        >
          <Save className="mr-2 h-3.5 w-3.5" />
          {isSavingReport ? "Saving..." : "Save Report"}
        </Button>
        <Button
          onClick={handleViewReport}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Eye className="mr-2 h-3.5 w-3.5" />
          View Reports
        </Button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-border" />

      {/* Report Details List */}
      <ReportDetailList activeConnectionId={Number(form.connectionId)} />
    </div>
  );
};

export default ReportFormSection;
