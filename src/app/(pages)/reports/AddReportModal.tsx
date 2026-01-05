
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";


interface AddReportModalProps {
    onClose: () => void;
    onSave: (report: {
        id: number;
        name: string;
        description: string;
        connectionId: number;
        reportTypeId: number;
        reportDetails: string;
        queryString: string;
    }) => void;
    report?: {
        id: number;
        name: string;
        description: string;
        connectionId: number;
        reportTypeId: number;
        reportDetails: string;
        queryString: string;
    } | null;
}

const AddReportModal: React.FC<AddReportModalProps> = ({ onClose, onSave, report }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [connectionId, setConnectionId] = useState(0);
    const [reportTypeId, setReportTypeId] = useState(0);
    const [reportDetails, setReportDetails] = useState('');
    const [queryString, setQueryString] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (report) {
            setName(report.name);
            setDescription(report.description);
            setConnectionId(report.connectionId);
            setReportTypeId(report.reportTypeId);
            setReportDetails(report.reportDetails);
            setQueryString(report.queryString);
        } else {
            setName('');
            setDescription('');
            setConnectionId(0);
            setReportTypeId(0);
            setReportDetails('');
            setQueryString('');
        }
    }, [report]);

    const handleSave = () => {
        onSave({
            id: report ? report.id : Date.now(),
            name,
            description,
            connectionId,
            reportTypeId,
            reportDetails,
            queryString,
        });
        onClose();
    };
    const handleNavigateToReportDetails = () => {
        const reportId = report ? report.id : Date.now(); // Use the report ID or generate a new one
        router.push('/report-details'); // Navigate to the report details page
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                    <h3 className="text-xl font-bold text-gray-900">{report ? 'Edit Report' : 'Add New Report'}</h3>
                    <p className="text-sm text-gray-500 mt-1">Fill in the details below to {report ? 'update' : 'create'} your report</p>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Report Name *</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                                placeholder="Enter report name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Connection ID *</label>
                            <input 
                                type="number" 
                                value={connectionId} 
                                onChange={(e) => setConnectionId(Number(e.target.value))} 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                                placeholder="Enter connection ID"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Report Type ID *</label>
                            <input 
                                type="number" 
                                value={reportTypeId} 
                                onChange={(e) => setReportTypeId(Number(e.target.value))} 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                                placeholder="Enter report type ID"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Description</label>
                            <textarea 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none" 
                                placeholder="Enter report description"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Report Details</label>
                            <textarea 
                                value={reportDetails} 
                                onChange={(e) => setReportDetails(e.target.value)} 
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none" 
                                placeholder="Enter detailed report information"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Query String</label>
                            <textarea 
                                value={queryString} 
                                onChange={(e) => setQueryString(e.target.value)} 
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none font-mono text-sm" 
                                placeholder="Enter SQL query or query string"
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button 
                            onClick={onClose} 
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium border border-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleNavigateToReportDetails}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            View Report Details
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {report ? 'Update Report' : 'Save Report'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReportModal;
