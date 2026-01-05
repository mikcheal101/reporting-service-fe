"use client";

import { buildUrl } from "@/app/utils/urlBuilder";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaFileAlt, FaKey, FaUsers, FaEyeSlash, FaEye } from "react-icons/fa";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";

interface UserManagement {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
}

interface Roles {
  id: string;
  name: string;
  normalizedName: string;
}
interface Role {
  id: string;
  username: string;
  role: string;
}

const API_ENDPOINTS = {
  USERS: process.env.NEXT_PUBLIC_USERS || "",
  ROLES: process.env.NEXT_PUBLIC_ROLES || "",
  REGISTER: process.env.NEXT_PUBLIC_REGISTER || "",
  ASSIGN_ROLE: process.env.NEXT_PUBLIC_ASSIGN_ROLE || "",
};

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"Users" | "Roles" | "Policies">("Users");
  const [userManagements, setUserManagements] = useState<UserManagement[]>([]);
  const [roleManagements, setRoleManagements] = useState<Roles[]>([]);
  const [currentUser, setCurrentUser] = useState<UserManagement | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserManagement | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalPosition, setDeleteModalPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [assignRoleSheetOpen, setAssignRoleSheetOpen] = useState(false);
  const [viewDetailsSheetOpen, setViewDetailsSheetOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState<UserManagement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    password?: string; // Make password optional
    phoneNumber: string;
  }>({
    firstName: "",
    lastName: "",
    username: "",
    password: "", // Default value
    phoneNumber: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    if (mode === "add") {
      clearForm(); // Reset the form when switching to "add" mode
    }
  }, [mode]);


  useEffect(() => {
    if (selectedRole) {
      fetchRoleDetails(selectedRole.id);
    } else {
      clearForm();
    }
  }, [selectedRole]);

  const clearForm = () => {
    setUsername("");
    setRole("");
  };


  const fetchData = async <T,>(
    url: string,
    setData: (data: T[]) => void,
    errorMsg: string
  ) => {
    try {
      setLoading(true);
      const token =  Cookies.get('authToken');
      if (!token) throw new Error("No access token available");

      const response = await fetch(buildUrl(url), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if ([401, 403].includes(response.status)) {
        Cookies.remove('authToken');
        router.push("/");
        return;
      }

      if (!response.ok) throw new Error(errorMsg);

      const responseData = await response.json();
      
      // Handle the API response structure
      let data: T[] = [];
      if (responseData.success && responseData.data) {
        // Check if the data contains users or roles array
        if (responseData.data.users) {
          data = responseData.data.users;
        } else if (responseData.data.roles) {
          data = responseData.data.roles;
        } else if (Array.isArray(responseData.data)) {
          data = responseData.data;
        }
      } else if (Array.isArray(responseData)) {
        // Fallback: if response is directly an array
        data = responseData;
      }
      
      console.log("Fetched data:", data);
      setData(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast({ title: "Error", description: errorMsg });
    } finally {
      setLoading(false);
    }
  };


  const fetchRoleDetails = async (roleId: string) => {
    if (!roleId) {
      toast({ title: "Error", description: "Invalid role ID" });
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get('authToken');
      if (!token) throw new Error("No access token available");
      console.log("ROLEID-->", `${API_ENDPOINTS.ROLES}/${roleId}/get-user-roles`)

      const response = await fetch(buildUrl(`${API_ENDPOINTS.ROLES}/${roleId}/get-user-roles`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)

      if (!response.ok) {
        if ([401, 403].includes(response.status)) {
          Cookies.remove('authToken');
          router.push("/");
          return;
        }
        throw new Error("Failed to fetch role details");
      }

      const roleData = await response.json();
      setSelectedRoleId(roleData.id)
      console.log(roleData)
      setUsername(roleData.username); // Populate username
      setRole(roleData.roles?.[0] || "");   // Populate role
      setEditingRole(roleData); // Save role data for potential use
    } catch (error) {
      console.error("Error fetching role details:", error);
      toast({ title: "Error", description: "Failed to fetch role details" });
    } finally {
      setLoading(false);
    }
  };

  const getUserRoles = async (userId: string, userEmail: string) => {
    try {
      setLoading(true);
      const token = Cookies.get('authToken');
      if (!token) throw new Error("No access token available");
      
      // Get user roles from the users endpoint
      const response = await fetch(buildUrl(`${API_ENDPOINTS.USERS}/${userId}/roles`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const roles = await response.json();
        console.log("User roles:", roles);
        
        // Set the username and first role (assuming user has at least one role)
        setUsername(userEmail);
        if (roles && roles.length > 0) {
          setRole(roles[0].name || roles[0]);
        } else {
          setRole("");
        }
      } else {
        console.error("Failed to fetch user roles:", response.statusText);
        toast({
          title: "Error",
          description: "Failed to fetch user roles",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching user roles:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching user roles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (view === "Users") fetchData(API_ENDPOINTS.USERS, setUserManagements, "Failed to fetch users.");
    if (view === "Roles") fetchData(API_ENDPOINTS.ROLES, setRoleManagements, "Failed to fetch roles.");
  }, [view]);

  const handleAssignRoleSubmit = async () => {
    if (!username || !role) {
      toast({ 
        title: "Error", 
        description: "Please select both user username and role",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get('authToken');
      if (!token) {
        toast({ 
          title: "Error", 
          description: "Authentication token not found",
          variant: "destructive"
        });
        router.push("/");
        return;
      }

      const payload = { username, role };
      console.log("Assigning role with payload:", payload);
      console.log("API endpoint:", API_ENDPOINTS.ASSIGN_ROLE);

      const response = await fetch(buildUrl(API_ENDPOINTS.ASSIGN_ROLE), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Assign role response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Assign role error data:", errorData);
        
        let errorMessage = "Failed to assign role.";
        if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.errors && Array.isArray(errorData.errors)) {
          const detailedErrors = errorData.errors.map((err: any) => err.message || err.description || err);
          if (detailedErrors.length > 0) {
            errorMessage = detailedErrors.join(', ');
          }
        }
        
        throw new Error(errorMessage);
      }

      toast({
        title: "Success",
        description: "Role assigned successfully!",
      });

      // Clear form data
      setUsername("");
      setRole("");

      // Close the sheet
      setAssignRoleSheetOpen(false);

      // Refresh users to show updated roles
      fetchData(API_ENDPOINTS.USERS, setUserManagements, "Failed to fetch users.");
    } catch (error: any) {
      console.error("Error assigning role:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to assign role.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId: string) => {
    if (!userId) {
      toast({ title: "Error", description: "Invalid user ID" });
      return;
    }

    try {
      setLoading(true); // Indicate loading state

      const token = Cookies.get('authToken');
      if (!token) {
        toast({ title: "Error", description: "Authentication token not found" });
        router.push("/");
        return;
      }

      // Build the URL for the specific user
      const url = buildUrl(`${API_ENDPOINTS.USERS}/${userId}`);
      console.log("Fetching user details from URL:", url);

      // Make the GET request
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if ([401, 403].includes(response.status)) {
        // Handle authentication/authorization errors
        Cookies.remove('authToken');
        router.push("/");
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch user details");

      // Parse the response JSON
      const user: UserManagement = await response.json();

      // Populate the form with user data for editing
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
      });

      console.log("User details fetched:", user);
      setUserId(user.id);
      setCurrentUser(user); // Update the state with the user details
      setMode("edit"); // Set mode to edit
    } catch (error: any) {
      console.error("Error fetching user details:", error.message || error);
      toast({ 
        title: "Error", 
        description: "Failed to fetch user details",
        variant: "destructive"
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleEditAssignRoleSubmit = async () => {
    if (!username || !role) {
      toast({ 
        title: "Error", 
        description: "Please select both user username and role",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get('authToken');
      if (!token) {
        toast({ 
          title: "Error", 
          description: "Authentication token not found",
          variant: "destructive"
        });
        router.push("/");
        return;
      }

      const payload = { username, role };
      console.log("Updating role with payload:", payload);

      const response = await axios.put(
        buildUrl(API_ENDPOINTS.ASSIGN_ROLE),
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update role response status:", response.status);

      if (![200, 201].includes(response.status)) {
        throw new Error("Failed to update role.");
      }

      toast({
        title: "Success",
        description: "Role updated successfully!",
      });

      // Clear form data
      setUsername("");
      setRole("");

      // Close the sheet
      setAssignRoleSheetOpen(false);

      // Refresh users to show updated roles
      fetchData(API_ENDPOINTS.USERS, setUserManagements, "Failed to fetch users.");
    } catch (error: any) {
      console.error("Error updating role:", error);
      
      let errorMessage = "Failed to update role.";
      
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response status:", error.response.status);
        
        const responseData = error.response.data;
        if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.errors && Array.isArray(responseData.errors)) {
          const detailedErrors = responseData.errors.map((err: any) => err.message || err.description || err);
          if (detailedErrors.length > 0) {
            errorMessage = detailedErrors.join(', ');
          }
        }
      }
      
      toast({ 
        title: "Error", 
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (formData: {
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    phoneNumber: string;
  }) => {
    try {
      setLoading(true);

      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error("No access token available");
      }

      // Prepare the payload according to the backend RegisterModel
      const payload = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        password: formData.password || "TempPassword123!", // Provide a default password if not set
        tenantId: user?.tenantId ? user.tenantId : null // Send as null if not available, backend will use default
      };

      const requestUrl = buildUrl(API_ENDPOINTS.REGISTER);
      

      const response = await axios.post(
        requestUrl,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (![200, 201].includes(response.status)) {
        throw new Error("Failed to add user.");
      }

      toast({
        title: "Success",
        description: "User added successfully!",
      });
      
      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        phoneNumber: "",
      });

      // Close the modal
      setIsSheetOpen(false);

      // Refresh users
      fetchData(API_ENDPOINTS.USERS, setUserManagements, "Failed to fetch users.");
    } catch (error: any) {
      console.log("=== USER CREATION ERROR DEBUG ===");
      console.error("Full error object:", error);
      
      let errorMessage = "Failed to add user.";
      let detailedErrors: string[] = [];
      
      // Handle different error structures
      if (error.response) {
        // Server responded with error status
        console.error("Response error data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        console.error("Response config:", error.response.config);
        
        const responseData = error.response.data;
        
        // Handle backend ApiResponse structure
        if (responseData?.message) {
          errorMessage = responseData.message;
        }
        
        // Handle validation errors from backend
        if (responseData?.errors && Array.isArray(responseData.errors)) {
          detailedErrors = responseData.errors.map((err: any) => err.message || err.description || err);
          if (detailedErrors.length > 0) {
            errorMessage = detailedErrors.join(', ');
          }
        }
        
        // Fallback error handling
        if (!responseData?.message && !detailedErrors.length) {
          if (typeof responseData === 'string') {
            errorMessage = responseData;
          } else if (responseData?.error) {
            errorMessage = responseData.error;
          } else {
            // If response data is empty or unclear, provide more context
            errorMessage = `Server returned ${error.response.status} error. Please check the request format.`;
          }
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request error:", error.request);
        errorMessage = "Network error. Please check your connection.";
      } else if (error.message) {
        // Something else happened
        console.error("Error message:", error.message);
        errorMessage = error.message;
      }
      
      toast({ 
        title: "Error", 
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);

    }
  };
  const triggerDeleteModal = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteModalOpen(true);
  };

  const triggerDeleteRoleModal = (roleId: string, event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedRoleId(roleId);

    // Get the bounding rect of the triggering element
    const rect = event.currentTarget.getBoundingClientRect();
    setDeleteModalPosition({ top: rect.bottom, left: rect.left });

    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteModalPosition(null);
  };
  const handleDeleteUserDetails = async (userId: string) => {
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }
    console.log(`${API_ENDPOINTS.USERS}/${userId}`)
    try {
      const response = await fetch(buildUrl(`${API_ENDPOINTS.USERS}/${userId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)

      if (response.ok) {
        console.log("User deleted successfully");
        toast({ title: "Success", description: "User deleted successfully" });
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({ title: "Error", description: "An error occurred while deleting the user" });
    }
  }
  const handleDeleteRole = async (roleId: string) => {
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }
    console.log(`${API_ENDPOINTS.ROLES}/${roleId}`)
    try {
      const response = await fetch(buildUrl(`${API_ENDPOINTS.ROLES}/${roleId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)

      if (response.ok) {
        console.log("User deleted successfully");
        toast({ title: "Success", description: "User deleted successfully" });
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({ title: "Error", description: "An error occurred while deleting the user" });
    }
  }


  const handleEditUser = async (formData: {
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
  }) => {
    if (!userId) {
      toast({ 
        title: "Error", 
        description: "No user selected for editing",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log("Updating user with data:", formData);
      setLoading(true);

      const token = Cookies.get('authToken');
      if (!token) {
        toast({ 
          title: "Error", 
          description: "Authentication token not found",
          variant: "destructive"
        });
        router.push("/");
        return;
      }

      const response = await axios.put(
        buildUrl(`${API_ENDPOINTS.USERS}/${userId}`),
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response status:", response.status);

      if (![200, 201].includes(response.status)) {
        throw new Error("Failed to update user.");
      }

      toast({
        title: "Success",
        description: "User updated successfully!",
      });

      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        phoneNumber: "",
      });

      // Close the modal
      setIsSheetOpen(false);

      // Reset mode and user ID
      setMode("add");
      setUserId(null);
      setCurrentUser(null);

      // Refresh users list
      fetchData(API_ENDPOINTS.USERS, setUserManagements, "Failed to fetch users.");
    } catch (error: any) {
      console.error("Error updating user:", error);
      
      let errorMessage = "Failed to update user.";
      
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response status:", error.response.status);
        
        const responseData = error.response.data;
        if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.errors && Array.isArray(responseData.errors)) {
          const detailedErrors = responseData.errors.map((err: any) => err.message || err.description || err);
          if (detailedErrors.length > 0) {
            errorMessage = detailedErrors.join(', ');
          }
        }
      }
      
      toast({ 
        title: "Error", 
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="h-auto w-full p-2 sticky bg-[#FFFDF4] shadow-md border-b border-gray-300 top-0 z-50">
        <ul className="flex justify-end space-x-6">
          {[
            { label: "Users", icon: <FaUsers size={18} />, viewKey: "Users" },
            { label: "Roles", icon: <FaKey size={18} />, viewKey: "Roles" },
            // { label: "Policies", icon: <FaFileAlt size={18} />, viewKey: "Policies" },
          ].map(({ label, icon, viewKey }) => (
            <li key={viewKey}>
              <button
                className={`flex items-center space-x-2 py-2 px-3 rounded-md transition-all duration-150 
            bg-transparent text-gray-800 relative ${view === viewKey ? "text-orange-500 font-medium" : "text-gray-600"}`}
                onClick={() => setView(viewKey as typeof view)}
              >
                {icon}
                <span className="text-sm">{label}</span>
                {view === viewKey && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 rounded-sm"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-full bg-white p-4">
        {view === "Users" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-700">User Management</h2>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger
                  className="bg-[#FFBF48] text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-[#ffa726] focus:ring-2 focus:ring-[#FFBF48] focus:ring-offset-2 focus:outline-none transition-all duration-200 ease-in-out active:scale-95"
                  onClick={() => {
                    // Only reset form data and set mode when explicitly adding a new user
                    setMode("add");
                    setFormData({
                      firstName: "",
                      lastName: "",
                      username: "",
                      password: "",
                      phoneNumber: "",
                    }); // Reset formData for add mode
                  }}
                >
                  Add User
                </SheetTrigger>

                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>{mode === "add" ? "Add a New User" : "Edit User"}</SheetTitle>
                    <SheetDescription>
                      {mode === "add"
                        ? "Please fill out the form below to add a new user."
                        : "Edit the user's details below."}
                    </SheetDescription>
                  </SheetHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (mode === "add") {
                        handleAddUser(formData); // Add mode handler
                      } else {
                        handleEditUser(formData); // Edit mode handler
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                        }
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                        }
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Email / Username:
                      </label>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, username: e.target.value }))
                        }
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                        }
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    {mode === "add" && (
                      <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, password: e.target.value }))
                          }
                          className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md"
                        />
                        <span
                          className="absolute inset-y-0 mt-6 right-3 flex items-center cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <Button type="submit" variant="default">
                        {mode === "add" ? "Submit" : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </SheetContent>
              </Sheet>

            </div>

            {isDeleteModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-[400px]">
                  <h2 className="text-lg font-medium mb-4">Confirm Deletion</h2>
                  <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
                  <div className="flex justify-end gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => setDeleteModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUserDetails(selectedUserId!)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isDeleteModalOpen &&(
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-[400px]">
                <h2 className="text-lg font-medium mb-4">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setDeleteModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteRole(selectedRoleId!)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            )}

            {renderTable(userManagements, ["Email / User Name", "Phone Number", "Actions"], (user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-700">{user.username}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{user.phoneNumber || "N/A"}</td>
                <td className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => { 
                        console.log("View Details clicked for user:", user.id);
                        setSelectedUserDetails(user);
                        setViewDetailsSheetOpen(true);
                      }}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { 
                        console.log("Edit clicked for user:", user.id);
                        fetchUserDetails(user.id); 
                        setIsSheetOpen(true); 
                      }}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { 
                        console.log("Assign Role clicked for user:", user.username);
                        setUsername(user.username); 
                        setAssignRoleSheetOpen(true); 
                        setMode("add");
                      }}>
                        Assign Role
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          console.log("Edit Role clicked for user:", user.id, user.username);
                          getUserRoles(user.id, user.username);
                          setAssignRoleSheetOpen(true);
                          setMode("edit");
                          setUserId(user.id);
                        }}
                      >
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        console.log("Delete clicked for user:", user.id);
                        triggerDeleteModal(user.id);
                      }}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}

          </>
        )}
        {view === "Roles" &&
          renderTable(roleManagements, ["Name", "Normalized Name"], (role) => (
            <tr key={role.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3">{role.name || ""}</td>
              <td className="px-6 py-3">{role.normalizedName || ""}</td>
              <td className="px-6 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={(e) => triggerDeleteRoleModal(role.id, e)}>Delete Role</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}

        {/* View Details Sheet */}
        <Sheet open={viewDetailsSheetOpen} onOpenChange={setViewDetailsSheetOpen}>
          <SheetContent className="w-[30%]">
            <SheetHeader>
              <SheetTitle>User Details</SheetTitle>
              <SheetDescription>
                View detailed information about the selected user.
              </SheetDescription>
            </SheetHeader>
            <div className="p-4 space-y-4">
              {selectedUserDetails && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">User ID</label>
                    <p className="text-sm text-gray-900">{selectedUserDetails.id}</p>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email / Username</label>
                    <p className="text-sm text-gray-900">{selectedUserDetails.username}</p>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
                    <p className="text-sm text-gray-900">{selectedUserDetails.firstName}</p>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
                    <p className="text-sm text-gray-900">{selectedUserDetails.lastName}</p>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="text-sm text-gray-900">{selectedUserDetails.phoneNumber || "N/A"}</p>
                  </div>
                </>
              )}
            </div>
            <SheetFooter className="flex justify-end">
              <Button
                variant="secondary"
                onClick={() => setViewDetailsSheetOpen(false)}
              >
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Assign Role Sheet */}
        <Sheet open={assignRoleSheetOpen} onOpenChange={setAssignRoleSheetOpen}>
          <SheetContent className="w-[30%]">
            <SheetHeader>
              <SheetTitle> {mode === "add" ? "Assign Role" : "Edit Role"}
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <Input
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter user username"
                className="mb-4"
              />
              <label className="block mb-2 text-sm font-medium">Role</label>

              <Select
                value={role}
                onValueChange={(value) => setRole(value)}
              >
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Loan Officer">Loan Officer</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Account">Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SheetFooter className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setAssignRoleSheetOpen(false);
                  clearForm(); // Clear form data when closing
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={mode === "add" ? handleAssignRoleSubmit : handleEditAssignRoleSubmit}
              >
                {mode === "add" ? "Assign Role" : "Update Role"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      </div>
    </div>
  );
}

function renderTable<T>(data: T[], headers: string[], renderRow: (item: T) => JSX.Element): JSX.Element {
  // Safety check: ensure data is an array
  if (!Array.isArray(data)) {
    return (
      <div className="overflow-x-auto">
        <div className="text-center py-4 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
}
