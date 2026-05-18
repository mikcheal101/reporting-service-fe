"use client";

import ReportTypeFormProps from "@/types/components/report-type/report-type-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import renderFrequency from "./frequency-picker";
import renderDatePicker from "./date-picker";
import renderTimePicker from "./time-picker";
import renderOutPutFormat from "./output-format-picker";

const ReportTypeForm = ({
  isOpen,
  setIsOpen,
  resetForm,
  handleUpdate,
  handleSave,
  form,
  setForm,
}: ReportTypeFormProps) => (
  <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
    <SheetTrigger asChild>
      <Button
        onClick={() => {
          resetForm();
        }}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Report Type
      </Button>
    </SheetTrigger>
    <SheetContent className="w-full sm:max-w-[560px]">
      <SheetHeader>
        <SheetTitle>
          {form.id ? "Edit Report Type" : "Add New Report Type"}
        </SheetTitle>
        <SheetDescription>
          {form.id
            ? "Make changes to your report type details."
            : "Enter details for the new report type."}
        </SheetDescription>
      </SheetHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm font-medium">Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Report Type Name"
          />
        </div>

        {/* Output Type */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="outputType" className="text-sm font-medium">Output Type</Label>
          {renderOutPutFormat({ form, setForm })}
        </div>

        {/* Frequency */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="frequency" className="text-sm font-medium">Frequency</Label>
          {renderFrequency({ setForm, form })}
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="runDate" className="text-sm font-medium">Select Date</Label>
          {renderDatePicker({
            fieldId: "runDate",
            value: form.runDate || "",
            setForm,
          })}
        </div>

        {/* Time */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="runTime" className="text-sm font-medium">Select Time</Label>
          {renderTimePicker({
            fieldId: "runTime",
            value: form.runTime || "",
            setForm,
          })}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium">Recipient Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter recipient's email"
            value={form.emailsToNotify}
            onChange={(e) =>
              setForm({ ...form, emailsToNotify: e.target.value })
            }
          />
        </div>
      </div>
      <SheetFooter>
        <Button
          type="submit"
          onClick={form.id ? handleUpdate : handleSave}
        >
          {form.id ? "Update" : "Save"}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default ReportTypeForm;
