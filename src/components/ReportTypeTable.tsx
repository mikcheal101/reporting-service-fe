"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { buildUrl } from "@/app/utils/urlBuilder";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { OutputFormat } from "@/app/enums/OutputFormat";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Frequency } from "@/app/enums/Frequency";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import Cookies from "js-cookie";

interface AddReport {
  id?: string;
  name: string;
  outputType: OutputFormat | "";
  frequency: Frequency | "";
  runDate?: string | Date;
  runTime?: string;
  emailsToNotify: string;
}

interface ReportType {
  id: string;
  name: string;
  outputType: number;
  frequency: number;
  runDate?: string | Date;
  runTime?: string;
  emailsToNotify: string;
}

const mapOutputType = (outputType: number): string => {
  switch (outputType) {
    case OutputFormat.Json:
      return "Json";
    case OutputFormat.Csv:
      return "Csv";
    case OutputFormat.Excel:
      return "Excel";
    case OutputFormat.PDF:
      return "PDF";
    case OutputFormat.Word:
      return "Word";
    default:
      return "Unknown";
  }
};

const mapFrequency = (frequency: number): string => {
  switch (frequency) {
    case Frequency.OnRequest:
      return "OnRequest";
    case Frequency.Daily:
      return "Daily";
    case Frequency.Weekly:
      return "Weekly";
    case Frequency.Monthly:
      return "Monthly";
    case Frequency.Biannual:
      return "Biannual";
    case Frequency.Annualy:
      return "Annually";
    default:
      return "Unknown";
  }
};

const ReportTypeTable: React.FC = () => {
  const [name, setName] = useState("");
  const [outputType, setOutputType] = useState<number | "">("");
  const [frequency, setFrequency] = useState<number | "">("");
  const [reportType, setReportType] = useState<AddReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reportTypeId, setReportTypeId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false); // Sheet toggle
  const router = useRouter();
  const [reportTypes, setReportTypes] = useState<ReportType[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editReportType, setEditReportType] = useState<ReportType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const request = process.env.NEXT_PUBLIC_REPORT_TYPES;
  const apiUrl = buildUrl(request);

  useEffect(() => {
    if (reportType) {
      // Populate formData for editing
      setFormData({
        id: reportType.id || "",
        name: reportType.name || "",
        outputType: reportType.outputType || "",
        frequency: reportType.frequency || "",
        runDate: reportType.runDate
          ? new Date(reportType.runDate).toISOString().split("T")[0]
          : "",
        runTime: reportType.runTime ? reportType.runTime : "",
        emailsToNotify: reportType.emailsToNotify || "", // Ensure email is populated if provided
      });
    } else {
      // Reset formData for adding
      setFormData({
        id: "",
        name: "",
        outputType: "",
        frequency: "",
        runDate: "",
        runTime: "",
        emailsToNotify: "", // Reset email
      });
    }
  }, [reportType]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    outputType: "" as OutputFormat | "",
    frequency: "" as Frequency | "",
    runDate: "",
    runTime: "",
    emailsToNotify: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "frequency" ? Number(value) : value, // Convert to number for databaseType
    }));
  };

  const handleSave = async () => {
    const {
      id,
      name,
      outputType,
      frequency,
      runDate,
      runTime,
      emailsToNotify,
    } = formData;

    if (name && outputType !== "" && frequency !== "") {
      const newReportType = {
        name,
        outputType: Number(outputType),
        frequency: Number(frequency),
        runDate,
        runTime,
        emailsToNotify: emailsToNotify.trim() || undefined,
      };

      setIsLoading(true);

      try {
        const response = await fetch(
          reportType?.id ? `${apiUrl}/${reportType.id}` : apiUrl,
          {
            method: reportType?.id ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
            body: JSON.stringify(newReportType),
          }
        );
        console.log(newReportType);

        if (!response.ok) {
          throw new Error("Failed to save report type");
        }
        window.location.reload();

        const savedReportType = await response.json();
        toast({ title: "Report type saved successfully!" });
        setReportType({ ...reportType, ...savedReportType });
      } catch (error: any) {
        toast({
          title: "Failed to save report type",
          description: `Error: ${error.response?.data || error.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({ title: "Please fill in all fields." });
    }
  };

  const renderDatePicker = (fieldId: string, value: string) => (
    <input
      type="date"
      id={fieldId}
      value={value}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [fieldId]: e.target.value, // Update date
        }))
      }
      className="w-full border border-[#EAB308] rounded-lg px-2 sm:px-3 py-2 shadow-sm hover:shadow-md focus:ring-2 focus:ring-[#EAB308] transition text-sm"
    />
  );
  const renderTimePicker = (fieldId: string, value: string) => (
    <input
      type="time"
      id={fieldId}
      value={value}
      step="1"
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [fieldId]: e.target.value, // Update time
        }))
      }
      className="w-full border border-[#EAB308] rounded-lg px-2 sm:px-3 py-2 shadow-sm hover:shadow-md focus:ring-2 focus:ring-[#EAB308] transition text-sm"
    />
  );

  const renderOutPutFormat = () => (
    <select
      name="outputType"
      value={formData.outputType}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          outputType: parseInt(e.target.value), // Ensure value is numeric
        }))
      }
      className="w-full border rounded px-3 py-2 text-sm"
    >
      <option value="" disabled>
        Select Output Type
      </option>
      {Object.entries(OutputFormat)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => (
          <option key={value} value={value}>
            {key}
          </option>
        ))}
    </select>
  );
  const renderFrequency = () => (
    <select
      value={formData.frequency}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          frequency: parseInt(e.target.value), // Ensure value is numeric
        }))
      }
      className="w-full border rounded px-3 py-2 text-sm"
    >
      <option value="" disabled>
        Select Frequency
      </option>
      {Object.entries(Frequency)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key, value]) => (
          <option key={value} value={value}>
            {key}
          </option>
        ))}
    </select>
  );

  useEffect(() => {
    const fetchReportTypes = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("authToken");
        if (!token) {
          throw new Error("No access token available");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          router.push("/");
          Cookies.remove("authToken");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch report types");
        }

        const data = await response.json();
        console.log(data);
        setReportTypes(data);
      } catch (error) {
        console.error("Error fetching report types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportTypes();
  }, [apiUrl]);

  const handleEditReportType = async (reportType: ReportType) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(`${apiUrl}/${reportType.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setEditReportType(data);
      setFormData(data);
      setReportTypeId(data.id);
      setName(data.name);
      setOutputType(data.outputType);
      setFrequency(data.frequency);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching connection details:", error);
    }
  };

  const handleUpdate = async () => {
    console.log("formData before update:", formData);

    const payload = { ...formData };
    console.log("Update payload", payload);

    try {
      console.log("PayLoad", payload);
      const token = Cookies.get("authToken");
      if (!token) throw new Error("No access token available");
      console.log(`${apiUrl}/${reportTypeId}`);
      const response = await axios.put(`${apiUrl}/${reportTypeId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);

      window.location.reload();
      toast({
        title: "Success",
        description: "Connection updated successfully.",
      });

      setReportTypes((prev) =>
        prev.map((conn) =>
          conn.id === reportTypeId ? { ...conn, ...response.data } : conn
        )
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update connection: ${
          error.response?.data || error.message
        }`,
      });
    }
  };

  const handleDelete = async (id: string) => {
    const token = Cookies.get("authToken");

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response", response);

      if (response.status === 401 || response.status === 403) {
        Cookies.remove("authToken");
        router.push("/");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete report type");
      }
      window.location.reload();

      setReportTypes((prev) => prev.filter((rt) => rt.id !== id));
      setDeleteId(null);
      toast({
        title: "Report type deleted successfully!",
      });
    } catch (error: any) {
      console.error("Error deleting report type:", error);
      toast({
        title: "Failed to delete report type",
        description: `Error: ${error.response?.data || error.message}`,
      });
    }
  };

  console.log(`runtime: ${formData.runTime}`);
  return (
    <div className="mt-2 p-2 sm:p-4">
      <div className="flex justify-end mb-2">
        <div className="mt-2 p-2">
          <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center px-3 sm:px-5 py-3 sm:py-5 bg-[#EAB308] text-white text-xs sm:text-sm font-medium rounded hover:bg-amber-400 transition"
                onClick={() => {
                  setReportType(null);
                  setReportTypeId("");
                  setFormData({
                    id: "",
                    name: "",
                    outputType: "",
                    frequency: "",
                    runDate: "",
                    runTime: "",
                    emailsToNotify: "",
                  });
                  setIsOpen(true);
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
                  {reportTypeId ? "Edit Report Type" : "Add New Report Type"}
                </SheetTitle>
                <SheetDescription className="text-sm">
                  {reportTypeId
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
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Report Type Name"
                    className="text-sm"
                  />
                </div>

                {/* Output Type Field */}
                <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-2">
                  <Label htmlFor="outputType" className="text-sm font-medium">
                    Output Type:
                  </Label>
                  {renderOutPutFormat()}
                </div>

                {/* Frequency, Date, and Time Fields */}
                <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Frequency Field */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="frequency" className="text-sm font-medium">
                      Frequency:
                    </Label>
                    {renderFrequency()}
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
                        {renderDatePicker("runDate", formData.runDate || "")}
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
                        {renderTimePicker("runTime", formData.runTime || "")}
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
                    value={formData.emailsToNotify}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emailsToNotify: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* <div className="mt-4">
        <strong>Selected Frequency:</strong>{" "}
        {formData.frequency && typeof formData.frequency === "number"
          ? mapFrequency(formData.frequency)
          : "None"}
      </div> */}

              {/* {formData.date && (
        <div className="mt-2">
          <strong>Selected Date and Time:</strong> {formData.date}
        </div>
      )} */}

              <SheetFooter className="mt-6">
                <Button
                  type="submit"
                  className="w-full sm:w-auto text-sm"
                  onClick={reportTypeId ? handleUpdate : handleSave}
                >
                  {reportTypeId ? "Update" : "Save"}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <div className="flex justify-end mb-2 space-x-4"></div>
        </div>
      </div>

      <div className="p-3 sm:p-6 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Report Types</h2>
        </div>

        {loading ? (
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
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 min-w-[600px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                    Name
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                    Output Type
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
                    Frequency
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-right text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportTypes.length > 0 ? (
                  reportTypes.map((reportType) => (
                    <tr key={reportType.id} className="border-t">
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        {reportType.name}
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        {mapOutputType(reportType.outputType)}
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                        {mapFrequency(reportType.frequency)}
                      </td>
                      <td className="px-2 sm:px-4 py-2 text-right">
                        <div className="flex flex-col sm:flex-row justify-end space-y-1 sm:space-y-0 sm:space-x-2">
                          <button
                            onClick={() => {
                              handleEditReportType(reportType);
                              setIsOpen(true);
                            }}
                            className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
                          >
                            <FaEdit className="mr-1" />{" "}
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                onClick={() => setDeleteId(reportType.id)}
                                className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-[#FFA500] text-white text-xs font-medium rounded transition"
                              >
                                <FaTrash className="mr-1" />{" "}
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm Deletion
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this report
                                  type? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500"
                                  onClick={() =>
                                    deleteId && handleDelete(deleteId)
                                  }
                                >
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-sm">
                      No report types available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportTypeTable;
