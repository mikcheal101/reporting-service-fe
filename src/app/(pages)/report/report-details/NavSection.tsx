import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { buildUrl } from "@/app/utils/urlBuilder";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConnection } from "@/context/ConnectionContext";
import ReportDetailList from "./ReportDetailsList";
import { useReport } from "@/context/ReportContext";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { useReportStatus } from "@/hooks/useReportStatus";
import Cookies from "js-cookie";

const NavSection = () => {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const connectionsEndpoint = process.env.NEXT_PUBLIC_APP_REPORTING_ENDPOINT;
  const reportTypesEndpoint = process.env.NEXT_PUBLIC_REPORT_TYPES;
  const reports = process.env.NEXT_PUBLIC_REPORTS;
  const { currentReportParams } = useReport();
  const { markReportAsCreated } = useReportStatus();

  const connectionsApiUrl = buildUrl(connectionsEndpoint);
  const reportTypesApiUrl = buildUrl(reportTypesEndpoint);
  const reportsUrl = buildUrl(reports);

  const [connections, setConnections] = useState<{ id: string; name: string }[]>([]);
  const [reportTypes, setReportTypes] = useState<{ id: string; name: string }[]>([]);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [loadingReportTypes, setLoadingReportTypes] = useState(true);
  const [isPopulatedFromParams, setIsPopulatedFromParams] = useState(false);
  
  const { setSelectedConnection } = useConnection();
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reportId, setReportId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Check if all required fields are filled
  const isFormValid = name.trim() && description.trim() && selectedConnectionId && selectedReportType;

  useEffect(() => {
    // Populate the form with current report params
    console.log("currentReportParams:", currentReportParams);
    if (currentReportParams) {
      console.log("Name:", currentReportParams.name);
      console.log("Description:", currentReportParams.description);
      console.log("Connection ID:", currentReportParams.connectionId);
      console.log("Connection :", currentReportParams.connection);
      console.log("reports :", currentReportParams.reportType);
      console.log("Report Type ID:", currentReportParams.reportTypeId);

      setName(currentReportParams.name || "");
      setConnections(currentReportParams.connection || null);
      setReportTypes(currentReportParams.reportType || null);
      setDescription(currentReportParams.description || "");
      setSelectedConnectionId(currentReportParams.connectionId || null);
      setSelectedReportType(currentReportParams.reportTypeId || null);
      setIsPopulatedFromParams(true);
    } else {
      setIsPopulatedFromParams(false);
    }
  }, [currentReportParams]);

  const handleSave = async () => {
    if (!isFormValid) {
      toast({ title: "Please fill in all fields and make selections." });
      return;
    }

    const token = Cookies.get('authToken');
    if (!token) {
      router.push("/");
      return;
    }

    const payload = {
      name,
      description,
      connectionId: selectedConnectionId,
      reportTypeId: selectedReportType,
    };

    try {
      setIsSaving(true);

      const response = await fetch(reportsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save report. Please try again.");
      }

      const data = await response.json();
      setReportId(data.id);
      markReportAsCreated(data.id); // Mark report as created

      console.log("Report saved successfully:", data);
      toast({ title: "Report saved successfully. You can now use the query editor." });

    } catch (error: any) {
      setIsSaving(false);
      console.error("Error saving report:", error?.error.data);
      toast({ title: "An error occurred. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleViewReport = async () => {
    router.push('/report');
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("No access token available");

        const response = await fetch(connectionsApiUrl, {
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

        if (!response.ok) throw new Error("Failed to fetch connections");

        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      } finally {
        setLoadingConnections(false);
      }
    };

    fetchConnections();
  }, [connectionsApiUrl, router]);

  useEffect(() => {
    const fetchReportTypes = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) throw new Error("No access token available");

        const response = await fetch(reportTypesApiUrl, {
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

        if (!response.ok) throw new Error("Failed to fetch report types");

        const data = await response.json();
        setReportTypes(data);
      } catch (error) {
        console.error("Error fetching report types:", error);
      } finally {
        setLoadingReportTypes(false);
      }
    };

    fetchReportTypes();
  }, [reportTypesApiUrl, router]);

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4">
      <div className="space-y-4">
        {/* Report Creation Status */}
        {!reportId && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Create Report First
                </h3>
                <div className="mt-1 text-sm text-yellow-700">
                  <p>Please fill out the form below and save the report before using the query editor.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Report Name</Label>
          <Input
            placeholder="Enter report name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-sm"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Input
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm"
          />
        </div>

        {/* Connection Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Connection</Label>
          {loadingConnections ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select
              value={selectedConnectionId || ""}
              onValueChange={(value) => {
                setSelectedConnectionId(value);
                setSelectedConnection(value);
              }}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select a connection" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Connections</SelectLabel>
                  {connections.map((connection) => (
                    <SelectItem key={connection.id} value={connection.id}>
                      {connection.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Report Type Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Report Type</Label>
          {loadingReportTypes ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select
              value={selectedReportType || ""}
              onValueChange={setSelectedReportType}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select a report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Report Types</SelectLabel>
                  {reportTypes.map((reportType) => (
                    <SelectItem key={reportType.id} value={reportType.id}>
                      {reportType.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving || !isFormValid}
            className="flex-1 text-sm"
          >
            {isSaving ? "Saving..." : "Save Report"}
          </Button>
          <Button
            onClick={handleViewReport}
            variant="outline"
            className="flex-1 text-sm"
          >
            View Reports
          </Button>
        </div>
      </div>

      {/* Report Details List */}
      <div className="mt-6">
        <ReportDetailList />
      </div>
    </div>
  );
};

export default NavSection;