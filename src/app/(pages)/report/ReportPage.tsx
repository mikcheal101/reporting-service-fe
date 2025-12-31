"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaList, FaThLarge, FaCalendarAlt, FaPencilAlt } from "react-icons/fa";
import { buildUrl } from "@/app/utils/urlBuilder";
import { useRouter } from "next/navigation";
import { useReport } from "../../../context/ReportContext";
import { useReportParameter } from "../../../context/ParameterContext";

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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import Card from "@/components/report-grid-card";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { title } from "process";
import CustomAlertDialog from "@/components/ModalComponent";
import Cookies from "js-cookie";
 import {useReportStatus } from "@/hooks/useReportStatus";
interface Report {
    id: string;
    name: string;
    description: string;
    connectionId: string;
    reportTypeId: string;
}

const ReportPage: React.FC = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSheetOpen, setSheetOpen] = useState(false);
    const { setCurrentReportParams } = useReport();
    const { setCurrentParameter } = useReportParameter();
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<Report[]>([]);
    const [currentReport, setCurrentReport] = useState<Report | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editReport, setEditReport] = useState<Report | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(reports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedReports = reports.slice(startIndex, startIndex + itemsPerPage);

    const request = process.env.NEXT_PUBLIC_REPORTS;
    const reportParams = buildUrl(process.env.NEXT_PUBLIC_REPORTING_PARAMS)
    const generateSchedule = buildUrl(process.env.NEXT_PUBLIC_GENERATE_REPORT)
    const apiUrl = buildUrl(request);

  const { resetReportStatus,markReportAsCreated } = useReportStatus();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = Cookies.get('authToken');
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
                    Cookies.remove('authToken');
                    router.push("/");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch reports");
                }

                const data = await response.json();
                setReports(data);
            } catch (error: any) {
                console.error("Error fetching reports:", error);
                toast({
                    title: "Error",
                    description: "Failed to fetch reports. Please try again later.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [apiUrl, router, toast]);



    const handleUpdateReport = async () => {
        if (!currentReport) return;

        try {
            const token = Cookies.get('authToken');
            if (!token) throw new Error("No access token available");

            await axios.put(`${apiUrl}/${currentReport.id}`, currentReport, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Updated",
                description: "Report updated successfully.",
            });
            setReports((prev) =>
                prev.map((rep) => (rep.id === currentReport.id ? currentReport : rep))
            );
            setSheetOpen(false); // Close the Sheet
        } catch (error: any) {
            console.error("Error updating report:", error);
            toast({
                title: "Error",
                description: "Failed to update report. Please try again later.",
            });
        }
    };

    const handleEditReport = (report: Report) => {
        setEditReport(report);
        setModalOpen(true);
    };
    const fetchReportDetails = async (id: string) => {
        try {
            const token = Cookies.get('authToken');
            if (!token) throw new Error("No access token available");

            const response = await axios.get(`${apiUrl}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setCurrentReport(response.data);
                setSheetOpen(true);
            } else {
                throw new Error("Failed to fetch report details");
            }
        } catch (error: any) {
            console.error("Error fetching report details:", error);
            toast({
                title: "Error",
                description: "Failed to fetch report details. Please try again later.",
            });
        }
    };
    const fetchReportingParams = async (id: string) => {
        try {

            console.log("Url", `${reportParams}/${id}`)
            const token = Cookies.get('authToken');
            if (!token) throw new Error("No access token available");

            const response = await axios.get(`${apiUrl}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const responseParam = await axios.get(`${reportParams}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status && responseParam.status === 200) {
                console.log("dATA -------->", response.data)
                localStorage.setItem("QueryId", response.data.id)
                
        
                setCurrentReportParams(response.data);
                setCurrentParameter(responseParam.data);
                router.push('/report/report-details');
            } else {
                throw new Error("Failed to fetch report params");
            }
        } catch (error: any) {
            console.error("Error fetching report params:", error);
            toast({
                title: "Error",
                description: "Failed to fetch report params. Please try again later.",
            });
        }
    };
    const confirmScheduleReport = async () => {
        if (!editReport) return; // Ensure a report is selected.

        try {
            const token = Cookies.get('authToken');
            console.log(generateSchedule)
            const requestBody = {
                reportId: editReport.id,
                generateNow: true,
            };
            console.log(requestBody)
            const response = await fetch(generateSchedule, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },
                body: JSON.stringify(requestBody)
            });



            console.log(response)

            if (!response.ok) {
                throw new Error(`Failed to schedule report. Status: ${response.status}`);
            }

            toast({ title: "Report scheduled successfully!", description: "You will be notified when report is ready"});
        } catch (error: any) {
            console.error("Error scheduling report:", error);
            toast({
                title: "Failed to schedule the report.",
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setIsAlertOpen(false);
        }
    };

    const handleScheduleReport = (report: Report) => {
        setEditReport(report); // Set the report to be edited.
        setIsAlertOpen(true);  // Open the alert dialog.
    };

    const cancelScheduleReport = () => {
        setIsAlertOpen(false);
    };

    const AddReports = () => {
        resetReportStatus();
        router.push("/report/report-details")
    }

    const handleDeleteReport = async (id: string) => {
        try {
            const token = Cookies.get('authToken');
            if (!token) throw new Error("No access token available");

            await axios.delete(`${apiUrl}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Deleted",
                description: "Report deleted successfully.",
            });
            console.log("Before delete:", reports);
            setReports((prev) => prev.filter((rep) => rep.id !== id));
            console.log("After delete:", reports);
        } catch (error: any) {
            console.error("Error deleting report:", error);
            toast({
                title: "Error",
                description: `Failed to delete report: ${error.response?.data || error.message}`,
            });
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="mt-12 p-6">
            <div className="flex justify-end mb-8 space-x-4">
                <button
                    onClick={AddReports}
                    
                    className="flex items-center px-8 py-4 bg-[#EAB308] text-white text-sm font-medium rounded hover:bg-amber-400 transition"
                >
                    <FaPlus className="mr-2" />
                    Add new Report
                </button>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Reports</h2>
                    <div className="flex justify-end ml-auto space-x-3 p-2">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded flex gap-2 items-center ${viewMode === "list"
                                ? "bg-[#EAB308] text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            <FaList className="text-lg" />
                            List
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded flex gap-2 items-center ${viewMode === "grid"
                                ? "bg-[#EAB308] text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            <FaThLarge className="text-lg" />
                            Grid
                        </button>
                    </div>
                </div>
                <div>
                    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                        <SheetContent className="w-[30%]">
                            <SheetHeader>
                                <SheetTitle>Edit Report</SheetTitle>
                                <SheetDescription>
                                    Update the details of the report below.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    value={currentReport?.name || ""}
                                    onChange={(e) =>
                                        setCurrentReport((prev) =>
                                            prev ? { ...prev, name: e.target.value } : prev
                                        )
                                    }
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    value={currentReport?.description || ""}
                                    onChange={(e) =>
                                        setCurrentReport((prev) =>
                                            prev ? { ...prev, description: e.target.value } : prev
                                        )
                                    }
                                />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleUpdateReport}
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#EAB308] rounded hover:bg-amber-400"
                                >
                                    Update
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(6)].map((_, index) => (
                            <Skeleton key={index} className="h-6 w-full rounded-lg" />
                        ))}
                    </div>
                ) : reports.length === 0 ? (
                    <p className="text-center text-gray-500">No reports available.</p>
                ) : viewMode === "list" ? (
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedReports.map((report) => (
                                <tr key={report.id} className="border-b">
                                    <td className="px-4 py-3">{report.name}</td>
                                    <td className="px-4 py-3">{report.description}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => fetchReportDetails(report.id)}
                                                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
                                            >
                                                <FaEdit className="mr-2" />
                                                Edit Report
                                            </button>
                                            <button
                                                onClick={() => fetchReportingParams(report.id)}
                                                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
                                            >
                                                <FaPencilAlt className="mr-2" />
                                                Edit Query
                                            </button>
                                            <button
                                                onClick={() => handleScheduleReport(report)}
                                                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
                                            >
                                                <FaCalendarAlt className="mr-2" />
                                                Schedule
                                            </button>
                                            <CustomAlertDialog
                                                isOpen={isAlertOpen}
                                                onClose={cancelScheduleReport}
                                                onConfirm={confirmScheduleReport}
                                            />

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        onClick={() => setDeleteId(report.id)}
                                                        className="flex items-center px-3 py-2 border-[#FFA500] border-2 bg-white text-[#FFA500] text-xs font-medium rounded transition"
                                                    >
                                                        <FaTrash className="mr-2" />
                                                        Delete
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone and will
                                                            permanently delete the report.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="bg-red-500 hover:none"
                                                            onClick={() =>
                                                                deleteId &&
                                                                handleDeleteReport(deleteId)
                                                            }
                                                        >
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {paginatedReports.map((report) => (
                            <Card
                                key={report.id}
                                name={report.name}
                                description={report.description}
                                onEdit={() => fetchReportDetails(report.id)}
                                onEditQuery={() => fetchReportingParams(report.id)}
                                onSchedule={() => handleScheduleReport(report)}
                                onDelete={() => {
                                    setDeleteId(report.id);
                                    safeLocalStorage.setItem('reportDeleteId', report.id.toString());
                                    setShowDeleteDialog(true);
                                }}
                            />
                        ))}
                        {showDeleteDialog && (
                            <AlertDialog>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone and will permanently delete the report.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => {
                                                const reportDeleteId = (safeLocalStorage.getItem('reportDeleteId') || '');
                                                handleDeleteReport(reportDeleteId); // Proceed with deletion
                                                setShowDeleteDialog(false); // Close the dialog
                                            }}
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}

                    </div>
                )}
            </div>
            <div className="flex justify-end  mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === index + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

        </div>
    );
};

export default ReportPage;