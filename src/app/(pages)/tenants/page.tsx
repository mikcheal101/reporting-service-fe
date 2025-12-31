'use client';
import React, { useState } from 'react';
import TenantList from '@/components/TenantList';
import TenantForm from '@/components/TenantForm';
import TenantLayout from './TenantLayout';
import { TenantDto } from '@/@types/tenant';
import { 
  Building2, 
  Plus, 
  Users, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

const TenantsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState<TenantDto | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateNew = () => {
    setEditingTenant(null);
    setShowForm(true);
  };

  const handleEdit = (tenant: TenantDto) => {
    setEditingTenant(tenant);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingTenant(null);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTenant(null);
  };

  const handleDelete = (id: string) => {
    // The TenantList component handles the actual deletion
    // This callback is just for any additional cleanup if needed
    console.log('Tenant deleted:', id);
  };

  return (
    <TenantLayout>
      <div className="min-h-full bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Page Header */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-6 py-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {showForm ? (editingTenant ? 'Edit Tenant' : 'Create New Tenant') : 'Tenant Management'}
                      </h1>
                      {!showForm && (
                        <div className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          <Sparkles className="h-4 w-4 mr-1" />
                          <span>Enhanced</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                      {showForm 
                        ? (editingTenant 
                          ? 'Update tenant information and manage their access to your services' 
                          : 'Add a new tenant to your organization and configure their settings')
                        : 'Manage your organization\'s tenants, configure access permissions, and monitor tenant activities'
                      }
                    </p>
                    {!showForm && (
                      <div className="flex items-center space-x-6 mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Multi-tenant Architecture</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span>Centralized Management</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {showForm ? (
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to List</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateNew}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Create New Tenant</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="px-6 py-8">
            {showForm ? (
              <div className="max-w-4xl mx-auto">
                <TenantForm
                  tenant={editingTenant}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </div>
            ) : (
              <TenantList
                onEdit={handleEdit}
                onDelete={handleDelete}
                refreshTrigger={refreshTrigger}
              />
            )}
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default TenantsPage;