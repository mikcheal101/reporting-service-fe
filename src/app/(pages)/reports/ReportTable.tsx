"use client";
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddReportModal from './AddReportModal';

interface Report {
    id: number;
    name: string;
    description: string;
    connectionId: number;
    reportTypeId: number;
    reportDetails: string;
    queryString: string;
}

const ReportsTable: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editReport, setEditReport] = useState<Report | null>(null);

    const addReport = (report: Report) => {
        setReports((prev) => [...prev, report]);
        setModalOpen(false);
    };

    const handleEditReport = (report: Report) => {
        setEditReport(report);
        setModalOpen(true);
    };

    const updateReport = (report: Report) => {
        setReports((prev) =>
            prev.map((rep) => (rep.id === report.id ? report : rep))
        );
        setModalOpen(false);
        setEditReport(null);
    };

    const deleteReport = (id: number) => {
        setReports((prev) => prev.filter((rep) => rep.id !== id));
    };

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Reports</h2>
                <button
                    onClick={() => {
                        setEditReport(null);
                        setModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#EAB308] text-white font-semibold rounded hover:bg-amber-400 transition"
                >
                    <span className="text-lg">+</span>
                </button>
            </div>
            <table className="w-full border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr key={report.id} className="border-t">
                        <td className="px-4 py-2">{report.name}</td>
                        <td className="px-4 py-2">{report.description}</td>
                        <td className="px-4 py-2 text-right">
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => handleEditReport(report)}
                                    className="flex items-center px-3 py-1 text-blue-600 bg-blue-100 hover:bg-blue-200 rounded shadow-sm transition"
                                >
                                    <FaEdit className="mr-1" /> Edit
                                </button>
                                <button
                                    onClick={() => deleteReport(report.id)}
                                    className="flex items-center px-3 py-1 text-red-600 bg-red-100 hover:bg-red-200 rounded shadow-sm transition"
                                >
                                    <FaTrash className="mr-1" /> Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && (
                <AddReportModal
                    onClose={() => setModalOpen(false)}
                    onSave={editReport ? updateReport : addReport}
                    report={editReport}
                />
            )}
        </div>
    );
};

export default ReportsTable;