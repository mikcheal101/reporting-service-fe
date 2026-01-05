import React, { useState, useEffect } from 'react';
import { FaFolder, FaFolderOpen, FaFileAlt, FaPlug } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { buildUrl } from '@/app/utils/urlBuilder';
import { useConnection } from '@/context/ConnectionContext';
import { useReport } from '@/context/ReportContext';
import { useTableData } from '@/context/TableDataContext';
import { safeLocalStorage } from '@/app/utils/useLocalStorage';
import Cookies from 'js-cookie';
import { useReportStatus } from '@/hooks/useReportStatus';

const EXPANDED_TABLES_KEY = 'expandedTables';

const ReportDetailList: React.FC = () => {
    const router = useRouter();
    const { currentReportParams } = useReport();
    const { selectedConnection } = useConnection();
    const { tableData, setTableData, isLoading, setIsLoading, error, setError } = useTableData();
    const [expandedTables, setExpandedTables] = useState<{ [key: string]: boolean }>({});
 const { markReportAsCreated } = useReportStatus();
    // Use selectedConnection from context as priority, fallback to currentReportParams
    const activeConnectionId = selectedConnection || currentReportParams?.connectionId;

    useEffect(() => {
        if (!activeConnectionId) {
            setTableData([]);
            console.log("No connection selected.");
            return;
        }

        const persistedExpandedTables = localStorage.getItem(EXPANDED_TABLES_KEY);
        if (persistedExpandedTables) {
            setExpandedTables(JSON.parse(persistedExpandedTables));
        }

        const fetchTableData = async () => {
            setIsLoading(true);
            setError(null);
    
            try {
                const authToken = Cookies.get('authToken');
                const request = process.env.NEXT_PUBLIC_CONNECTION_TABLES;
    
                if (!request) throw new Error('API request URL is not defined in environment variables.');
    
                const apiUrl = buildUrl(`${request}/${activeConnectionId}/tables`);
                console.log("Fetching table data from:", apiUrl);
                console.log("Using connection ID:", activeConnectionId);
    
                const response = await axios.get(apiUrl, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });

                if (response.status === 401 || response.status === 403) {
                    Cookies.remove('authToken');
                    router.push('/login');         
                    return;
                }

                const formattedData = response.data.map((item: any) => ({
                    tableName: item.tableName?.slice(0, 20) || 'Unknown Table',
                    columns: item.columns?.map((col: any) => ({
                        columnName: col.columnName?.slice(0, 20) || 'Unnamed Column',
                        dataType: col.dataType || 'Unknown',
                    })) || [],
                }));

                // Store in localStorage and global state
                localStorage.setItem('TableData', response.data.length > 0 ? JSON.stringify(response.data) : '[]');
                setTableData(formattedData);
            } catch (err: any) {
                if (err.status === 401 || err.status === 403) {
                    Cookies.remove('authToken');
                    router.push('/login');
                    return;
                }
                console.error('Error fetching table data:', err);
                setError(err.message || 'Failed to fetch data.');
                
                // Try to load cached data
                const cachedData = localStorage.getItem('TableData');
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    const formattedCachedData = parsedData.map((item: any) => ({
                        tableName: item.tableName?.slice(0, 20) || 'Unknown Table',
                        columns: item.columns?.map((col: any) => ({
                            columnName: col.columnName?.slice(0, 20) || 'Unnamed Column',
                            dataType: col.dataType || 'Unknown',
                        })) || [],
                    }));
                    setTableData(formattedCachedData);
                }
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchTableData();
    }, [activeConnectionId, router, setTableData, setIsLoading, setError]);
    
    const toggleTable = (tableName: string) => {
        setExpandedTables((prev) => {
            const updated = { ...prev, [tableName]: !prev[tableName] };
            safeLocalStorage.setItem(EXPANDED_TABLES_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const handleDragStart = (
        event: React.DragEvent,
        tableName: string,
        columnName: string
    ) => {
        event.dataTransfer.setData(
            'column',
            JSON.stringify({ tableName, columnName })
        );
    };

    if (!activeConnectionId) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full text-center p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-md shadow-md">
                <FaPlug className="text-2xl sm:text-3xl lg:text-4xl text-gray-400 mb-3 sm:mb-4" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No Connection Selected</h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                    Please connect to a data source to view the available tables.
                </p>
            </div>
        );
    }

    if (isLoading) {
        return <div className="p-4 text-center text-sm">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-xs text-red-500">{error}</div>;
    }

    return (
        <div className="flex h-[40vh] sm:h-[45vh] lg:h-[50vh] w-full p-2 sm:p-3 lg:p-4">
            <div className="bg-white shadow-md rounded-md p-3 sm:p-4 w-full h-full overflow-y-auto custom-scrollbar">
                <h2 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 text-gray-600">Tables</h2>
                <div className="space-y-2">
                    {tableData.map((table, index) => (
                        <div key={index} className="">
                            <div
                                onClick={() => toggleTable(table.tableName)}
                                className="flex items-center p-2 cursor-pointer text-left font-medium text-gray-700 bg-[#FFF7E8] rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm"
                            >
                                {expandedTables[table.tableName] ? (
                                    <FaFolderOpen className="mr-2 text-[#FDA603] flex-shrink-0" />
                                ) : (
                                    <FaFolder className="mr-2 text-[#FDA603] flex-shrink-0" />
                                )}
                                <span className="truncate">{table.tableName}</span>
                            </div>
                            {expandedTables[table.tableName] && (
                                <div className="mt-1 space-y-1 ml-2 sm:ml-4">
                                    {table.columns.map((column, columnIndex) => (
                                        <div
                                            key={columnIndex}
                                            draggable
                                            onDragStart={(e) =>
                                                handleDragStart(e, table.tableName, column.columnName)
                                            }
                                            className="flex items-center p-1.5 sm:p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors text-xs"
                                        >
                                            <FaFileAlt className="mr-2 text-gray-500 flex-shrink-0" />
                                            <span className="text-gray-600 truncate flex-1">
                                                {column.columnName}
                                            </span>
                                            <span className="ml-2 text-gray-400 text-xs hidden sm:inline">
                                                ({column.dataType})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportDetailList;