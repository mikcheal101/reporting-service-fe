"use client";
import { Terminal } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"; // Import Alert components
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaCopy, FaRedoAlt } from "react-icons/fa";

const Integration = () => {
    const router = useRouter();
    const [selectedReport, setSelectedReport] = useState("Integration");
    const [showKeys, setShowKeys] = useState(false);
    const [baseUrl, setBaseUrl] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message visibility

    const handleButtonClick = (security: string, path: string) => {
        setSelectedReport(security);
        router.push(path);
    };

    const toggleKeysVisibility = () => {
        setShowKeys(!showKeys);
    };

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setAlertMessage("Copied to clipboard: " + value); // Set the alert message
            setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
        });
    };

    return (
        <div>
            {/* Report Navigation */}
            <div className="bg-white p-6 -mt-8 border-none space-x-6">
                {["User preference", "System", "Security", "Notification", "Integration", "Audit logs"].map((report) => (
                    <button
                        key={report}
                        className={`${
                            selectedReport === report
                                ? "bg-[#FFF7E8] font-bold text-[#FFBF48]"
                                : "bg-white text-black"
                        } rounded-xl p-2 mt-3`}
                        onClick={() => handleButtonClick(report, `/${report.toLowerCase().replace(" ", "-")}`)}
                    >
                        {report}
                    </button>
                ))}
            </div>

            {/* Main Section */}
            <div className="bg-[#F6F6F3] min-h-screen flex justify-center items-center">
                <div className="bg-white w-[70%] rounded-md shadow-md p-8">
                    <h1 className="text-2xl font-bold mb-8">API Keys</h1>

                    {/* API Key Section */}
                    <div className="mb-6 bg-[#F2F2F7] p-4 border border-gray-300">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="apiKey" className="font-medium">
                                API Key
                            </label>
                            <button
                                onClick={toggleKeysVisibility}
                                className="text-yellow-500 flex items-center space-x-2"
                            >
                                {showKeys ? <FaEyeSlash className="text-lg"/> : <FaEye className="text-lg"/>}
                                <span>{showKeys ? "Hide Keys" : "Show Keys"}</span>
                            </button>
                        </div>
                        <div className="flex items-center bg-[#F9FAFB] border border-gray-300 rounded-md px-4 py-2">
                            <input
                                type={showKeys ? "text" : "password"}
                                id="apiKey"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter your API Key"
                                className="bg-transparent flex-grow text-gray-600 outline-none"
                            />
                            <button
                                onClick={() => copyToClipboard(apiKey)}
                                className="text-yellow-500 font-medium flex items-center space-x-2"
                            >
                                <FaCopy className="text-lg"/>
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>

                    {/* Secret Key Section */}
                    <div className="mb-6 bg-[#F2F2F7] p-4 border border-gray-300">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="secretKey" className="font-medium">
                                Secret Key
                            </label>
                        </div>
                        <div className="flex items-center bg-[#F9FAFB] border border-gray-300 rounded-md px-4 py-2">
                            <input
                                type={showKeys ? "text" : "password"}
                                id="secretKey"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                placeholder="Enter your Secret Key"
                                className="bg-transparent flex-grow text-gray-600 outline-none"
                            />
                            <button
                                onClick={() => copyToClipboard(secretKey)}
                                className="text-yellow-500 font-medium flex items-center space-x-2"
                            >
                                <FaCopy className="text-lg"/>
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>

                    {/* Reset Keys Section */}
                    <div className="mb-8 flex justify-end">
                        <button className="flex items-center text-yellow-500 font-medium space-x-2">
                            <FaRedoAlt className="text-lg"/>
                            <span>Reset API Keys</span>
                        </button>
                    </div>

                    {/* Base URL Section */}
                    <div className="bg-[#F2F2F7] p-4 border border-gray-300">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="baseUrl" className="font-medium">
                                Base URL
                            </label>
                        </div>
                        <div className="flex items-center bg-[#F9FAFB] border border-gray-300 rounded-md px-4 py-2">
                            <input
                                type="text"
                                id="baseUrl"
                                value={baseUrl}
                                placeholder="https://sandbox.loan_management.com.ng"
                                onChange={(e) => setBaseUrl(e.target.value)}
                                className="bg-transparent flex-grow text-gray-600 outline-none"
                            />
                            <button
                                onClick={() => copyToClipboard(baseUrl)}
                                className="text-yellow-500 font-medium flex items-center space-x-2"
                            >
                                <FaCopy className="text-lg"/>
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>

                    {/* Alert Message */}
                    {alertMessage && (
                        <Alert className="mt-4">
                            <Terminal className="h-4 w-4"/>
                            <AlertTitle>Notice !</AlertTitle>
                            <AlertDescription>{alertMessage}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Integration;