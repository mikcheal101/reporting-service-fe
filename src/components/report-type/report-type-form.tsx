// components/report-type/report-type-form.tsx
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
import { FaPlus } from "react-icons/fa";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
  <div className="flex justify-end mb-0">
    <div className="mt-0 mb-2">
      <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className="flex items-center px-3 sm:px-5 py-3 sm:py-5 bg-[#EAB308] text-white text-xs sm:text-sm font-medium rounded hover:bg-amber-400 transition"
            onClick={() => {
              resetForm();
            }}
          >
            <FaPlus className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add Report Type</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-lg sm:text-xl">
              {form.id ? "Edit Report Type" : "Add New Report Type"}
            </SheetTitle>
            <SheetDescription className="text-sm">
              {form.id
                ? "Make changes to your report type details here. Click save when you are done."
                : "Enter details for the new report type."}
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4">
            {/* Name Field */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name:
              </Label>
              <Input
                id="name"
                name="name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Report Type Name"
                className="text-sm"
              />
            </div>

            {/* Output Type Field */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-2">
              <Label htmlFor="outputType" className="text-sm font-medium">
                Output Type:
              </Label>
              {renderOutPutFormat({ form, setForm })}
            </div>

            {/* Frequency, Date, and Time Fields */}
            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Frequency Field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="frequency" className="text-sm font-medium">
                  Frequency:
                </Label>
                {renderFrequency({ setForm, form })}
              </div>

              {/* Date Field */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700"
                >
                  Select Date:
                </Label>
                <div className="relative">
                  <div className="flex items-center rounded-lg px-2 sm:px-4 py-1 bg-white transition">
                    {renderDatePicker({
                      fieldId: "runDate",
                      value: form.runDate || "",
                      setForm,
                    })}
                  </div>
                </div>
              </div>

              {/* Time Field */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="time"
                  className="text-sm font-medium text-gray-700"
                >
                  Select Time:
                </Label>
                <div className="relative">
                  <div className="flex items-center rounded-lg px-2 sm:px-4 py-1 bg-white transition">
                    {renderTimePicker({
                      fieldId: "runTime",
                      value: form.runTime || "",
                      setForm,
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Recipient Email:
              </Label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded-lg px-3 py-2 bg-white shadow-sm hover:shadow-md transition w-full text-sm"
                placeholder="Enter recipient's email"
                value={form.emailsToNotify}
                onChange={(e) =>
                  setForm({
                    ...form,
                    emailsToNotify: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button
              type="submit"
              className="w-full sm:w-auto text-sm"
              onClick={form.id ? handleUpdate : handleSave}
            >
              {form.id ? "Update" : "Save"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  </div>
);

export default ReportTypeForm;
