'use client';
import React, { useState, useEffect } from 'react';
import { TenantDto } from '@/@types/tenant';
import { mockTenantApi } from '@/data/mockTenants';
import { Search, Filter, Users, Calendar, Globe, Building2, Edit, Trash2 } from 'lucide-react';

interface TenantListProps {
  onEdit: (tenant: TenantDto) => void;
  onDelete: (id: string) => void;
  refreshTrigger: number;
}

const TenantList: React.FC<TenantListProps> = ({ onEdit, onDelete, refreshTrigger }) => {
  const [tenants, setTenants] = useState<TenantDto[]>([]);
  const [filteredTenants, setFilteredTenants] = useState<TenantDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchTenants = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockTenantApi.getTenants();
      setTenants(data);
      setFilteredTenants(data);
    } catch (err) {
      setError('Failed to fetch tenants');
      console.error('Error fetching tenants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [refreshTrigger]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = tenants;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tenant => 
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tenant.description && tenant.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tenant => 
        statusFilter === 'active' ? tenant.isActive : !tenant.isActive
      );
    }
    
    setFilteredTenants(filtered);
  }, [tenants, searchTerm, statusFilter]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await mockTenantApi.deleteTenant(id);
        onDelete(id);
        fetchTenants(); // Refresh the list
      } catch (err) {
        console.error('Error deleting tenant:', err);
        alert('Failed to delete tenant');
      }
    }
  };

  const getStatusStats = () => {
    const active = tenants.filter(t => t.isActive).length;
    const inactive = tenants.filter(t => !t.isActive).length;
    return { active, inactive, total: tenants.length };
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 sm:p-8">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
        <p className="text-red-600 text-sm sm:text-base">{error}</p>
        <button 
          onClick={fetchTenants}
          className="mt-2 px-3 py-2 sm:px-4 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tenants</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl lg:text-3xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl lg:text-3xl font-bold text-red-600">{stats.inactive}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Globe className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenants by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tenants List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 lg:px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Building2 className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">No tenants found</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'Try adjusting your search or filter criteria' 
                          : 'Get started by creating your first tenant'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 lg:px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {tenant.logoUrl ? (
                            <img 
                              className="h-10 w-10 rounded-full object-cover border-2 border-gray-100" 
                              src={tenant.logoUrl} 
                              alt={tenant.name}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {tenant.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{tenant.name}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(tenant.createdOn).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {tenant.description || <span className="text-gray-400 italic">No description</span>}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tenant.isActive 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          tenant.isActive ? 'bg-green-400' : 'bg-red-400'
                        }`}></span>
                        {tenant.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-sm text-gray-500">
                      {new Date(tenant.createdOn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(`/tenants/${tenant.id}/users`, '_blank')}
                          className="inline-flex items-center px-3 py-1.5 border border-green-300 text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors text-xs font-medium"
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Users
                        </button>
                        <button
                          onClick={() => onEdit(tenant)}
                          className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors text-xs font-medium"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tenant.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors text-xs font-medium"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
         {/* Mobile Card View */}
         <div className="md:hidden">
           {filteredTenants.length === 0 ? (
             <div className="p-8 text-center">
               <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-500 text-lg font-medium mb-2">No tenants found</p>
               <p className="text-gray-400 text-sm">
                 {searchTerm || statusFilter !== 'all' 
                   ? 'Try adjusting your search or filter criteria' 
                   : 'Get started by creating your first tenant'
                 }
               </p>
             </div>
           ) : (
             <div className="divide-y divide-gray-200">
               {filteredTenants.map((tenant) => (
                 <div key={tenant.id} className="p-4 hover:bg-gray-50 transition-colors">
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center flex-1">
                       <div className="flex-shrink-0">
                         {tenant.logoUrl ? (
                           <img 
                             className="h-12 w-12 rounded-full object-cover border-2 border-gray-100" 
                             src={tenant.logoUrl} 
                             alt={tenant.name}
                             onError={(e) => {
                               (e.target as HTMLImageElement).style.display = 'none';
                             }}
                           />
                         ) : (
                           <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                             <span className="text-white font-semibold text-lg">
                               {tenant.name.charAt(0).toUpperCase()}
                             </span>
                           </div>
                         )}
                       </div>
                       <div className="ml-4 flex-1 min-w-0">
                         <h3 className="text-base font-semibold text-gray-900 truncate">{tenant.name}</h3>
                         <div className="flex items-center text-xs text-gray-500 mt-1">
                           <Calendar className="h-3 w-3 mr-1" />
                           {new Date(tenant.createdOn).toLocaleDateString('en-US', {
                             year: 'numeric',
                             month: 'short',
                             day: 'numeric'
                           })}
                         </div>
                       </div>
                     </div>
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 ${
                       tenant.isActive 
                         ? 'bg-green-100 text-green-800 border border-green-200' 
                         : 'bg-red-100 text-red-800 border border-red-200'
                     }`}>
                       <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                         tenant.isActive ? 'bg-green-400' : 'bg-red-400'
                       }`}></span>
                       {tenant.isActive ? 'Active' : 'Inactive'}
                     </span>
                   </div>
                   
                   {tenant.description && (
                     <div className="mb-4">
                       <p className="text-sm text-gray-600 leading-relaxed">{tenant.description}</p>
                     </div>
                   )}
                   
                   <div className="flex space-x-1 ml-2">
                     <button
                       onClick={() => window.open(`/tenants/${tenant.id}/users`, '_blank')}
                       className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                       title="Manage Users"
                     >
                       <Users className="h-4 w-4" />
                     </button>
                     <button
                       onClick={() => onEdit(tenant)}
                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                       title="Edit Tenant"
                     >
                       <Edit className="h-4 w-4" />
                     </button>
                     <button
                       onClick={() => handleDelete(tenant.id)}
                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                       title="Delete Tenant"
                     >
                       <Trash2 className="h-4 w-4" />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
     </div>
  );
};

export default TenantList;