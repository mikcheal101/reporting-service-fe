'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UserDto } from '@/types/user';
import { TenantDto } from '@/@types/tenant';
import { mockTenantApi } from '@/data/mockTenants';
import UserList from '@/components/UserList';
import UserForm from '@/components/UserForm';
import { AppSidebar } from '@/components/app-sidebar';
import Navbar from '@/components/navbar';
import { 
  Users, 
  Plus, 
  ArrowLeft, 
  Building2, 
  UserPlus,
  Settings
} from 'lucide-react';

export default function TenantUsersPage() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.id as string;
  
  const [tenant, setTenant] = useState<TenantDto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tenant details
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        setLoading(true);
        const tenants = await mockTenantApi.getTenants();
        const foundTenant = tenants.find(t => t.id === tenantId);
        
        if (!foundTenant) {
          setError('Tenant not found');
          return;
        }
        
        setTenant(foundTenant);
        setError(null);
      } catch (err) {
        setError('Failed to load tenant');
        console.error('Error fetching tenant:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tenantId) {
      fetchTenant();
    }
  }, [tenantId]);

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: UserDto) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSaveUser = (user: UserDto) => {
    setShowForm(false);
    setEditingUser(null);
    // The UserList component will automatically refresh when the user is saved
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleBackToTenants = () => {
    router.push('/tenants');
  };

  const handleBackToTenantDetails = () => {
    router.push(`/tenants/${tenantId}`);
  };

  if (loading) {
    return (
      <div className="flex w-full min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:block">
          <AppSidebar/> 
        </div>
        <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
          <div className="sticky top-0 z-10 bg-gray-100">
            <Navbar title="User Management" theme=""/> 
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Loading tenant details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tenant) {
    return (
      <div className="flex w-full min-h-screen flex-col lg:flex-row">
        <div className="hidden lg:block">
          <AppSidebar/> 
        </div>
        <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
          <div className="sticky top-0 z-10 bg-gray-100">
            <Navbar title="User Management" theme=""/> 
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{error || 'Tenant not found'}</h2>
              <p className="text-gray-600 mb-6">The tenant you're looking for doesn't exist or couldn't be loaded.</p>
              <button
                onClick={handleBackToTenants}
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tenants
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen flex-col lg:flex-row">
      {/* Sidebar - hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <AppSidebar/> 
      </div>
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-10 bg-gray-100">
          <Navbar title="User Management" theme=""/> 
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToTenants}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {tenant.logoUrl ? (
                        <img 
                          className="h-10 w-10 rounded-lg object-cover border border-gray-200" 
                          src={tenant.logoUrl} 
                          alt={tenant.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {tenant.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                          {showForm ? (editingUser ? 'Edit User' : 'Add New User') : 'User Management'}
                        </h1>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tenant.isActive 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {tenant.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {showForm 
                          ? (editingUser ? 'Update user information and permissions' : 'Create a new user account for this tenant')
                          : `Manage users and permissions for ${tenant.name}`
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {!showForm ? (
                    <>
                      <button
                        onClick={handleBackToTenantDetails}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm font-medium transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Tenant Settings
                      </button>
                      <button
                        onClick={handleCreateUser}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm font-semibold transition-all duration-200 shadow-sm"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add User
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleCancelForm}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm font-medium transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Users
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {showForm ? (
                <UserForm
                  user={editingUser}
                  tenantId={tenantId}
                  onSave={handleSaveUser}
                  onCancel={handleCancelForm}
                />
              ) : (
                <UserList
                  tenantId={tenantId}
                  onEdit={handleEditUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
