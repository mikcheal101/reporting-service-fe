import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaList, FaThLarge, FaCalendarAlt, FaPencilAlt, FaPen } from "react-icons/fa";
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
import { buildUrl } from "@/app/utils/urlBuilder";
import { useToast } from "@/hooks/use-toast";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import Cookies from "js-cookie";

interface ReportProps {
    name: string;
    description: string;
    onEdit: () => void;
    onEditQuery: () => void;
    onSchedule: () => void;
    onDelete: () => void;
}
interface Report {
    id: string;
    name: string;
    description: string;
    connectionId: string;
    reportTypeId: string;
}

const Card: React.FC<ReportProps> = ({ name, description, onEdit, onEditQuery, onSchedule, onDelete }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    
    const request = process.env.NEXT_PUBLIC_REPORTS;
    const apiUrl = buildUrl(request);

    const reportDeleteId = (safeLocalStorage.getItem('reportDeleteId') || '');
    const toggleMenu = () => setMenuOpen((prev) => !prev);
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
            setReports((prev) => prev.filter((rep) => rep.id !== id));
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
        <div className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border-l-4 border-[#EAB308]">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        <span className="text-[#EAB308]">•</span> {name}
                    </h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
                <div className="relative">
                    <button
                        className="text-gray-500 hover:text-[#EAB308]"
                        onClick={toggleMenu}
                    >
                        •••
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-0 w-[125px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                                className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF7E0]"
                                onClick={() => {
                                    toggleMenu();
                                    onEdit();
                                }}
                            >
                                <FaEdit /> Edit Report
                            </button>
                            <button
                                className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF7E0]"
                                onClick={() => {
                                    toggleMenu();
                                    onEditQuery();
                                }}
                            >
                                <FaPencilAlt /> Edit Query
                            </button>
                            <button
                                className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF7E0]"
                                onClick={() => {
                                    toggleMenu();
                                    onSchedule();
                                }}
                            >
                                <FaCalendarAlt />Schedule
                            </button>
                           
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                        onClick={() => onDelete()}
                                    >
                                        <FaTrash /> Delete
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
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() =>

                                            handleDeleteReport(reportDeleteId)
                                        }
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;

