import { RequestStatus } from "@/app/enums/RequestStatus";
import { buildUrl } from "@/app/utils/urlBuilder";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaFileCsv, FaFileExcel, FaFilePdf, FaFileWord, FaFileCode } from 'react-icons/fa';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import Cookies from "js-cookie";

interface ScheduledReport {
    id: string;
    name: string;
    description: string;
    requestStatus: string;
    fileDownloadPath: string;
    requestDate: Date,
    generateDate: Date,
    report: any;
}



const ScheduledReport = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
    const [scheduledPendingReport, setScheduledPendingReports] = useState<ScheduledReport[]>([]);

    const scheduledRpdEndpoint = process.env.NEXT_PUBLIC_SCHEDULED_REPORT || "";
    const baseUrl = buildUrl(process.env.NEXT_PUBLIC_PENDING_REPORT || "");
    const downloadUrl = buildUrl(process.env.NEXT_PUBLIC_DOWNLOAD_REPORT)
    const scheduledRpdUrl = buildUrl(scheduledRpdEndpoint);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(scheduledReports.length / reportsPerPage);

    // Get reports for current page
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = scheduledReports.slice(indexOfFirstReport, indexOfLastReport);

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    useEffect(() => {
        const fetchGeneratedReports = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    throw new Error("No access token available");
                }
                const response = await fetch(scheduledRpdUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Scheule Uri", scheduledRpdUrl)

                if (response.status === 401 || response.status === 403) {
                    Cookies.remove('authToken');
                    router.push("/");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch reports");
                }

                const data = await response.json();
                setScheduledReports(data);
                console.log("Generate date",data.generateDate)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch reports. Please try again later.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGeneratedReports();
    }, [scheduledRpdUrl]);

    useEffect(() => {
        const fetchPendingReports = async () => {
            try {
                const token = Cookies.get('authToken');
                if (!token) {
                    throw new Error("No access token available");
                }

                const response = await fetch(baseUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Scheule Uri", baseUrl)

                if (response.status === 401 || response.status === 403) {
                    Cookies.remove('authToken');
                    router.push("/");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch reports");
                }

                const data = await response.json();
                setScheduledPendingReports(data);
                console.log(data)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch reports. Please try again later.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPendingReports();
    }, [baseUrl, router, scheduledReports]);


    const mapRequestStatus = (status: number): string => {
        switch (status) {
            case RequestStatus.New:
                return "New";
            case RequestStatus.InProgress:
                return "InProgress";
            case RequestStatus.Completed:
                return "Done";
            case RequestStatus.Downloaded:
                return "Downloaded";
            default:
                return "Unknown";
        }
    }

    const handleDownload = async (reportpath: string) => {
        console.log("ReportPath-->", reportpath);
        try {
            const token = Cookies.get('authToken');
            const response = await axios.get(downloadUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                params: { reportpath },
                responseType: "blob", // Ensure the response is treated as a file
            });

            // Log headers to inspect the response
            console.log('Response Headers:', response.headers);

            // Extract filename from reportpath
            const reportPathParts = reportpath.split('/');
            const defaultFilename = reportPathParts[reportPathParts.length - 1] || 'downloaded_file';

            // Get extension based on last 3 characters of reportpath
            const fileExtension = getFileExtension(reportpath); // For example: "csv" or "pdf"
            const filename = defaultFilename.endsWith(`.${fileExtension}`)
                ? defaultFilename
                : `${defaultFilename}.${fileExtension}`;

            // Create a URL for the downloaded file
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);

            // Create a link to download the file
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);

            link.click(); // Trigger the download
            link.remove(); // Clean up the link element

            window.URL.revokeObjectURL(url); // Revoke the URL to free up memory
        } catch (error) {
            console.error('Error downloading the report:', error);
            throw new Error('Failed to download the report.');
        }
    };

    const getFileExtension = (filename: string) => {
        // Check if the filename ends with 'xlsx'
        if (filename.slice(-4).toLowerCase() === 'xlsx' || filename.slice(-4).toLowerCase() === 'docx') {
            return filename.slice(-4); // Return the last 4 characters for Excel files
        } else {
            return filename.slice(-3); // Return the last 3 characters for other files
        }
    };

    // Function to get the FontAwesome icon based on the file extension
    const getIconForExtension = (extension: string) => {
        switch (extension) {
            case "xlsx":
            case "xls":
                return <FaFileExcel style={{ color: "green" }} />;
            case "pdf":
                return <FaFilePdf style={{ color: "red" }} />;
            case "doc":
            case "docx":
                return <FaFileWord style={{ color: "blue" }} />;
            case "csv":
                return <FaFileCsv style={{ color: "orange" }} />;
            case "json":
                return <FaFileCode style={{ color: "gray" }} />;
            default:
                return <FaFileCode />;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 min-h-screen">
            {/* ShadCN Tabs Component */}
            <Tabs defaultValue="tab1" className="space-y-4 sm:space-y-6">
                <TabsList className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mr-auto p-2 rounded-lg w-full sm:w-auto">
                    <TabsTrigger
                        value="tab1"
                        className="inline-flex items-center justify-center rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-transparent hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-offset-2 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white w-full sm:w-auto"
                    >
                        <span className="hidden sm:inline">Completed Scheduled Reports</span>
                        <span className="sm:hidden">Completed</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="tab2"
                        className="inline-flex items-center justify-center rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-transparent hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-offset-2 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white w-full sm:w-auto"
                    >
                        <span className="hidden sm:inline">Pending Scheduled Report</span>
                        <span className="sm:hidden">Pending</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                    <Card className="shadow-md">
                        <div className="flex">
                            <CardHeader className="p-3 sm:p-6">
                                <h5 className="text-sm sm:text-base font-medium">These is the list of completed reports ready for download.</h5>
                                <h6 className="text-xs sm:text-sm text-gray-600">Click the download to get your file.</h6>
                            </CardHeader>
                        </div>
                        <CardContent className="p-2 sm:p-6">
                            {loading ? (
                                <div className="space-y-4">
                                    {[...Array(6)].map((_, index) => (
                                        <Skeleton key={index} className="h-6 w-full rounded-lg" />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[800px] text-xs sm:text-sm text-left text-gray-600">
                                            <thead>
                                                <tr className="bg-gray-500 border-b border-gray-300 text-white">
                                                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Name</th>
                                                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden sm:table-cell">Description</th>
                                                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Request Date</th>
                                                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden md:table-cell">Generate Date</th>
                                                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">File</th>
                                                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Status</th>
                                                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentReports.map((scheduledReport) => (
                                                    <tr key={scheduledReport.id} className="border-b">
                                                        <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                                                            <div className="truncate max-w-[120px] sm:max-w-none" title={scheduledReport.report.name}>
                                                                {scheduledReport.report.name || ""}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden sm:table-cell">
                                                            <div className="truncate max-w-[150px]" title={scheduledReport.report.description}>
                                                                {scheduledReport.report.description || ""}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                                                            <div className="text-xs">
                                                                {new Date(scheduledReport.requestDate).toLocaleDateString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden md:table-cell">
                                                            <div className="text-xs">
                                                                {new Date(scheduledReport.generateDate).toLocaleDateString()}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 sm:px-2 py-2 text-center">
                                                            <div className="text-lg sm:text-2xl flex justify-center items-center">
                                                                {getIconForExtension(getFileExtension(scheduledReport.fileDownloadPath))}
                                                            </div>
                                                        </td>
                                                        <td className="px-1 sm:px-2 py-2">
                                                            <Badge variant="default" className="bg-green-800 items-center text-[9px] sm:text-[11px] px-1 sm:px-2 py-1 rounded-xl">
                                                                <span className="hidden sm:inline">{mapRequestStatus(Number(scheduledReport.requestStatus))}</span>
                                                                <span className="sm:hidden">Done</span>
                                                            </Badge>
                                                        </td>
                                                        <td className="px-1 sm:px-2 py-2">
                                                            <button
                                                                onClick={() => handleDownload(scheduledReport.fileDownloadPath)}
                                                                className="flex items-center px-1 sm:px-2 py-1 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
                                                            >
                                                                <FaDownload className="mr-1 text-xs" />
                                                                <span className="hidden sm:inline">Download</span>
                                                                <span className="sm:hidden">DL</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination Controls */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
                                        <button
                                            onClick={goToPrevPage}
                                            disabled={currentPage === 1}
                                            className="px-2 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 text-xs sm:text-sm w-full sm:w-auto"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-xs sm:text-sm">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={goToNextPage}
                                            disabled={currentPage === totalPages}
                                            className="px-2 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 text-xs sm:text-sm w-full sm:w-auto"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="tab2">
                    {/* Table Configurator content */}
                    <Card className="shadow-md">
                        <div className="flex">
                            <CardHeader className="p-3 sm:p-6">
                                <h5 className="text-sm sm:text-base font-medium">This shows the list of requested report(s) that is/are not completed</h5>
                            </CardHeader>
                        </div>
                        <CardContent className="p-2 sm:p-6">
                            {loading ? (
                                <div className="space-y-4">
                                    {[...Array(6)].map((_, index) => (
                                        <Skeleton key={index} className="h-6 w-full rounded-lg" />
                                    ))}
                                </div>
                            ) : (

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[600px] text-xs sm:text-sm text-left text-gray-600">
                                        <thead>
                                            <tr className="bg-gray-100 border-b border-gray-300">
                                                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm">Name</th>
                                                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">Description</th>
                                                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm">Request Date</th>
                                                <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm">Status</th>
                                                {/* <th className="px-4 py-3 text-right">Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scheduledPendingReport.map((scheduledReport) => (
                                                <tr key={scheduledReport.id} className="border-b">
                                                    <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">
                                                        <div className="truncate max-w-[120px] sm:max-w-none" title={scheduledReport.report.name}>
                                                            {scheduledReport.report.name || ''}
                                                        </div>
                                                    </td>
                                                    <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">
                                                        <div className="truncate max-w-[150px]" title={scheduledReport.report.description}>
                                                            {scheduledReport.report.description || ''}
                                                        </div>
                                                    </td>
                                                    <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">
                                                        <div className="text-xs">
                                                            {new Date(scheduledReport.requestDate).toLocaleDateString() || ''}
                                                        </div>
                                                    </td>
                                                    <td className="px-2 sm:px-4 py-3">
                                                        <Badge variant="default" className="text-[9px] sm:text-[11px] px-1 sm:px-2 py-1">
                                                            {mapRequestStatus(Number(scheduledReport.requestStatus))}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )

                            }
                        </CardContent>
                    </Card>
                </TabsContent>


            </Tabs>
        </div>
    );
};

export default ScheduledReport;