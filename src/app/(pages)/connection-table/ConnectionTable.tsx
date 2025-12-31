"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaList, FaThLarge } from "react-icons/fa";
import { buildUrl } from "@/app/utils/urlBuilder";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { DataBaseType } from "@/app/enums/DataBaseType";
import { EyeIcon, EyeOffIcon, PlugZap, XCircle } from "lucide-react";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Connection = {
    id: string;
    name: string;
    server: string;
    port: number;
    user: string;
    password: string;
    isTestSuccessful: boolean;
    database: string;
    databaseType: DataBaseType | number;
    description: string;
}

type UpdateConnectionPayload = {
    id: string;
    name: string;
    server: string;
    port: number;
    user: string;
    password: string;
    database: string;
    isTestSuccessful: boolean;
    databaseType: DataBaseType;
    description: string;
};


interface ConnectionPayload {
    name: string;
    server: string;
    port: number;
    user: string;
    password: string;
    database: string;
    isTestSuccessful: boolean;
    databaseType: DataBaseType;
    description: string;
}

const ConnectionTable: React.FC = () => {
    const queryClient = useQueryClient();

    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    // const [connections, setConnections] = useState<Connection[]>([]);
    const [connectionId, setConnectionId] = useState<string>('');
    const [editConnection, setEditConnection] = useState<Connection | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [connection, setConnection] = useState<Connection | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
    const [isTested, setIsTested] = useState(false);
    const [testResult, setTestResult] = useState<boolean | null>(null);
    const [isTestSuccessful, setIsSetTestSuccessful] = useState<Record<string, boolean>>({});
    const [showPassword, setShowPassword] = useState(false);

    const request = process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT || "";
    const testConnectionEndpoint = process.env.NEXT_PUBLIC_APP_TESTCONNECTION_ENDPOINT || "";
    const apiTestUrl = buildUrl(testConnectionEndpoint);
    const baseUrl = buildUrl(process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT || "");
    const apiUrl = buildUrl(request);

    // Debug environment variables
    console.log("Environment variables:", {
        testConnectionEndpoint,
        apiTestUrl,
        scheme: process.env.NEXT_PUBLIC_URL_SCHEME,
        ipAddress: process.env.NEXT_PUBLIC_IP_ADDRESS,
        port: process.env.NEXT_PUBLIC_APP_API_PORT
    });


    const [formData, setFormData] = useState({
        name: "",
        server: "",
        port: 0,
        user: "",
        password: "",
        database: "",
        isTestSuccessful: false,
        databaseType: "" as DataBaseType | "",
        description: "",
    });

    useEffect(() => {
        if (connection) {

            setFormData({
                name: connection.name || "",
                server: connection.server || "",
                port: connection.port || 0,
                user: connection.user || "",
                password: connection.password || "",
                database: connection.database || "",
                isTestSuccessful: connection.isTestSuccessful ?? false,
                databaseType: connection.databaseType || "",
                description: connection.description || "",
            });
        } else {
            resetFields();
        }
    }, [connection]);

    const resetFields = () => {
        setFormData({
            name: "",
            server: "",
            port: 0,
            user: "",
            password: "",
            database: "",
            isTestSuccessful: false,
            databaseType: "",
            description: "",
        });
        setIsTested(false);
        setTestResult(null);
    };


    const useSaveConnection = () => {

        const saveConnection = async (formData: ConnectionPayload): Promise<Connection> => {
            const token = Cookies.get("authToken");
            if (!token) {
                throw new Error("No access token available");
            }

            const payload = { ...formData, port: formData.port.toString() };

            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 401 || response.status === 403) {
                Cookies.remove("authToken");
                throw new Error("Unauthorized or Forbidden");
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save connection");
            }

            const newConnection = await response.json();
            console.log("New connection data:", newConnection);
            return newConnection;
        };

        const mutation = useMutation<Connection, Error, ConnectionPayload>({
            mutationFn: saveConnection,
            onSuccess: (newConnection) => {
                toast({
                    title: "Success",
                    description: "Connection saved successfully.",
                });

                // Update the query cache for "connections"
                queryClient.setQueryData<Connection[]>(["connections"], (oldData) =>
                    oldData ? [...oldData, newConnection] : [newConnection]
                );

                console.log("Cache updated with new connection data.");
            },
            onError: (error) => {
                toast({
                    title: "Error",
                    description: `Failed to save connection: ${error.message}`,
                });
                console.error("Save connection error:", error);
            },
        });

        return mutation;
    };


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "databaseType" ? Number(value) : value, // Convert to number for databaseType
        }));
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleTestConnection = async () => {
        const payload = {
            name: formData.name,
            server: formData.server,
            port: formData.port ? formData.port.toString() : "",
            user: formData.user,
            password: formData.password,
            database: formData.database,
            databaseType: formData.databaseType
        };

        try {
            const token = Cookies.get("authToken");
            console.log("Token retrieved:", token ? "Token exists" : "No token found");
            console.log("API Test URL:", apiTestUrl);
            console.log("Payload:", payload);
            
            if (!token) {
                throw new Error("No access token available. Please log in again.");
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            console.log("Request config:", config);

            const response = await axios.post<boolean>(apiTestUrl, payload, config);

            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            console.log("Response headers:", response.headers);

            if (response.status === 200) {
                setFormData((prev) => ({
                    ...prev,
                    isTestSuccessful: true, // Set based on API response
                }));
                toast({
                    title: response.data ? "Connection Successful" : "Connection Failed",
                    description: response.data
                        ? "The connection was tested successfully."
                        : "The connection test failed.",
                });
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error: any) {
            console.error("Connection test error:", error);
            console.error("Error response:", error.response);
            console.error("Error request:", error.request);
            
            setTestResult(false);
            toast({
                title: "Connection Failed",
                description: `Failed to test the connection: ${error.response?.data?.message || error.message}`,
            });
        } finally {
            setIsTested(true);
        }
    };



    // Fetch existing connections when the component mounts
    const fetchConnections = async (): Promise<Connection[]> => {
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
            Cookies.remove("authToken");
            throw new Error("Unauthorized or Forbidden");
        }

        if (!response.ok) {
            throw new Error("Failed to fetch connections");
        }
        const data = await response.json(); // Await resolution here
        const initialTestStatus = data.reduce((acc:any, connection:any) => {
            acc[connection.id] = connection.isTestSuccessful ?? false; // Ensure boolean value
            return acc;
        }, {} as Record<string, boolean>);
    
        setIsSetTestSuccessful(initialTestStatus);
        return data;
    };

    const {
        data: connections,
        isLoading,
        isError,
        error,
    } = useQuery<Connection[], Error>({
        queryKey: ["connections"],
        queryFn: fetchConnections,
        retry: 2, // Retry up to 2 times on failure
    });

    console.log("Connections from useQuery:", connections);

    useEffect(() => {
        if (isError && error instanceof Error) {
            if (error.message === "Unauthorized or Forbidden") {
                router.push("/");
            } else {
                toast({
                    title: "Error",
                    description: error.message,
                });
            }
        }
    }, [isError, error, router]);


    const useUpdateConnection = () => {
        const queryClient = useQueryClient();

        const updateConnection = async (payload: UpdateConnectionPayload) => {
            const { id, ...formData } = payload;
            const token = Cookies.get("authToken");
            if (!token) throw new Error("No access token available");

            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 401 || response.status === 403) {
                Cookies.remove("authToken");
                throw new Error("Unauthorized or Forbidden");
            }

            if (!response.ok) {
                // Attempt to parse error details, fallback to a generic error if parsing fails.
                try {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to update connection");
                } catch {
                    throw new Error("Failed to update connection");
                }
            }

            // Handle 204 No Content: Return a placeholder or null
            if (response.status === 204) {
                console.log("No content returned for update.");
                return null; // or { id, ...formData } if needed
            }

            // For other successful responses, parse JSON
            const updatedConnection = await response.json();
            console.log("Updated connection data:", updatedConnection);
            return updatedConnection;
        };

        const mutation = useMutation<Connection | null, Error, UpdateConnectionPayload>({
            mutationFn: updateConnection,
            onSuccess: (updatedConnection) => {
                window.location.reload();
                toast({
                    title: "Success",
                    description: "Connection updated successfully.",
                });

                // Update the query cache for "connections"
                queryClient.setQueryData<Connection[]>(["connections"], (oldData) =>
                    oldData
                        ? oldData.map((conn) =>
                            conn.id === updatedConnection?.id ? updatedConnection : conn
                        )
                        : []
                );

                // console.log("Cache updated with new connection data.");
            },
            onError: (error) => {
                toast({
                    title: "Error",
                    description: `Failed to update connection: ${error.message}`,
                });
                // console.error("Update connection error:", error);
            },
        });

        return mutation;
    };





    const handleEditConnection = async (connection: Connection) => {
        try {
            const token = Cookies.get("authToken");
            if (!token) throw new Error("No access token available");

            const response = await axios.get(`${apiUrl}/${connection.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditConnection(response.data);
            setConnectionId(connection.id);
            setFormData(response.data);

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch connection details. Please try again later.",
            });
        }
    };

    const useDeleteConnection = () => {
        const queryClient = useQueryClient();

        const deleteConnection = async (id: string) => {
            const token = Cookies.get("authToken");
            if (!token) {
                throw new Error("No access token available");
            }

            try {
                await axios.delete(`${apiUrl}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Success: Return the ID of the deleted connection
                return id;
            } catch (error: any) {
                throw new Error(error.response?.data || error.message || "Failed to delete connection");
            }
        };

        const mutation = useMutation<string, Error, string>({
            mutationFn: deleteConnection,
            onSuccess: (deletedConnectionId) => {
                window.location.reload();
                toast({
                    title: "Deleted",
                    description: "Connection deleted successfully.",
                });

                // Update the query cache for "connections"
                queryClient.setQueryData<Connection[]>(["connections"], (oldData) =>
                    oldData ? oldData.filter((conn) => conn.id !== deletedConnectionId) : []
                );

                console.log("Cache updated: Deleted connection", deletedConnectionId);
            },
            onError: (error) => {
                toast({
                    title: "Error",
                    description: `Failed to delete connection: ${error.message}`,
                });
                console.error("Delete connection error:", error);
            },
        });

        return mutation;
    };
    const { mutate: handleDeleteConnection } = useDeleteConnection();

    const handleDeleteClick = (id: string) => {
        handleDeleteConnection(id);  // Pa  ss the connection ID to delete
    };

    const saveConnectionMutation = useSaveConnection();
    const updateConnectionMutation = useUpdateConnection();

    const handleSubmit = () => {
        const validatedFormData = {
            ...formData,
            databaseType: formData.databaseType as DataBaseType, // Ensure correct type
        };

        if (connectionId) {
            updateConnectionMutation.mutate({
                id: connectionId,
                ...validatedFormData,
            });
        } else {
            saveConnectionMutation.mutate(validatedFormData);
        }
    };



    const renderDatabaseTypeDropdown = () => (
        <select
            name="databaseType"
            value={formData.databaseType}
            onChange={(e) =>
                setFormData((prev) => ({
                    ...prev,
                    databaseType: Number(e.target.value) as DataBaseType
                }))
            }
            className="w-full border rounded px-3 py-2"
        >
            <option value="" disabled>
                Select Database
            </option>
            {Object.entries(DataBaseType)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                    <option key={value} value={value}>
                        {key}
                    </option>
                ))}
        </select>
    );
    const MapTodatabaseType = (databaseType: number): string => {
        switch (databaseType) {
            case DataBaseType.Firebird:
                return "Firebird";
            case DataBaseType.H2Database:
                return "H2Database";
            case DataBaseType.IBMDb2:
                return "IBMDb2";
            case DataBaseType.MSSQL:
                return "MS SQL Server";
            case DataBaseType.MariaDB:
                return "MariaDB";
            case DataBaseType.MySQL:
                return "MySQL";
            case DataBaseType.Oracle:
                return "Oracle";
            case DataBaseType.PostgreSQL:
                return "PostgreSQL";
            default:
                return "Unknown";
        }
    }


    return (
        <div className="mt-2 p-2">
            <div className="flex justify-end mb-2 space-x-4">
                <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center px-5 py-5 bg-[#EAB308] text-white text-sm font-medium rounded hover:bg-amber-400 transition"
                            onClick={() => {
                                resetFields();
                                setConnection(null);
                                setConnectionId("");
                            }}
                        >
                            <FaPlus className="mr-2" />
                            Add Connection
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[40%]">
                        <SheetHeader>
                            <SheetTitle>{connectionId ? "Edit Connection" : "Add New Connection"}</SheetTitle>
                            <SheetDescription>
                                {connection
                                    ? "Make changes to your connection details here. Click save when you're done."
                                    : "Enter details for the new connection."}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-right">
                                    Name:
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Connection name"
                                    className="col-span-1"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="server" className="text-right">
                                    Server Address:
                                </Label>
                                <Input
                                    id="server"
                                    name="server"
                                    placeholder="Server Address"
                                    className="col-span-1"
                                    value={formData.server}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="port" className="text-right">
                                    Port:
                                </Label>
                                <Input
                                    id="port"
                                    name="port"
                                    placeholder="Port"
                                    className="col-span-1"
                                    type="number"
                                    value={formData.port}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="user" className="text-right">
                                    Username:
                                </Label>
                                <Input
                                    id="user"
                                    name="user"
                                    placeholder="Username"
                                    className="col-span-1"
                                    value={formData.user}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2 ">
                                <Label htmlFor="password" className="text-right">
                                    Password:
                                </Label>
                                <div className="flex items-center">
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="flex-1"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="-ml-8 text-gray-500"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="database" className="text-right">
                                    Database Name:
                                </Label>
                                <Input
                                    id="database"
                                    name="database"
                                    placeholder="Database Name"
                                    className="col-span-1"
                                    value={formData.database}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="databaseType" className="text-right">
                                    Database Type:
                                </Label>
                                {renderDatabaseTypeDropdown()}
                            </div>
                        </div>
                        <SheetFooter>
                            <div className="flex justify-between w-full">
                                <Button variant="outline" onClick={handleTestConnection}>
                                    Test Connection
                                </Button>
                                <SheetClose asChild>
                                    <Button type="submit" onClick={handleSubmit}>
                                        {connectionId ? "Update" : "Save"}
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

            </div>  

            <div className="p-6 bg-[#FAFAFA] shadow-lg rounded-lg border border-gray-200">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Connections</h2>
                    <div className="flex justify-end ml-auto space-x-3 p-2 ">
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

                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(6)].map((_, index) => (
                            <Skeleton key={index} className="h-6 w-full rounded-lg" />
                        ))}
                    </div>
                ) : connections?.length === 0 ? (
                    <p className="text-center text-gray-500">No connections available.</p>
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
                            {connections?.map((connection) => (
                                <tr key={connection.id} className="border-b">
                                    <td className="px-4 py-3">
                                        {connection.name || ''}
                                    </td>
                                    <td className="px-4 py-3">
                                        {connection.description || ''}

                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    handleEditConnection(connection);  // Handle the editing logic
                                                }}
                                                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"                                            >
                                                <FaEdit className="mr-2" />
                                                Edit
                                            </button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        onClick={() => handleDeleteClick(connection.id)}
                                                        className="flex items-center px-3 py-2 bg-[#FFA500] text-white text-xs font-medium rounded transition"                                                    >
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
                                                            permanently delete the connection.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className='bg-red-500'
                                                            onClick={() =>
                                                                deleteId &&
                                                                handleDeleteConnection(deleteId)
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
                        {connections?.map((connection) => {
                            const isTested = isTestSuccessful[connection.id] ?? false; // Check if test was successful

                            return (
                                <div
                                key={connection.id}
                                className={`relative p-6 rounded-2xl 
                                    ${isTested ? "border-2 border-green-500 bg-green-50" : "border-2 border-red-500 text-gray-500"}
                                   `}
                            >
                                {/* Success or Failure Icon */}
                                <div className="absolute top-3 right-3">
                                    {isTested ? (
                                        <PlugZap size={28} className="text-green-600" />
                                    ) : (
                                        <XCircle size={28} className="text-red-500" />
                                    )}
                                </div>
                                    <h3 className="text-lg font-bold mb-2 text-gray-700">
                                        {connection.name}
                                    </h3>
                                    <p className="text-gray-500">Server: {connection.server}</p>
                                    <p className="text-gray-500">Database: {MapTodatabaseType(connection.databaseType)}</p>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            onClick={() => {
                                                setIsOpen(true);
                                                handleEditConnection(connection);  // Handle the editing logic
                                            }}
                                            className={`px-3 py-2 rounded text-xs font-medium transition
                                                ${isTested ? "border-2 border-green-500 bg-green-50" : "border-2 border-red-500 text-gray-500"}`
                                            }
                                        >
                                            Edit
                                        </button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    onClick={() => setDeleteId(connection.id)}
                                                    className={`px-3 py-2 rounded text-xs font-medium text-white transition
                                                        ${isTested ? "border-2 border-green-500 bg-green-500" : "border-2 border-red-500 bg-red-500 text-gray-500"}`
                                                    }                                                
                                                >
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
                                                        permanently delete the connection.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className='bg-red-500'
                                                        onClick={() =>
                                                            deleteId &&
                                                            handleDeleteConnection(deleteId)
                                                        }
                                                    >
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

        </div>
    );
};

export default ConnectionTable;