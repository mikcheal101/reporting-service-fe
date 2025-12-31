'use client';
import React, { useState, useEffect } from 'react';
import { TenantDto, CreateTenantRequest, UpdateTenantRequest } from '@/@types/tenant';
import { mockTenantApi } from '@/data/mockTenants';
import { 
  Building2, 
  Upload, 
  X, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Save,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface TenantFormProps {
  tenant?: TenantDto | null;
  onSave: () => void;
  onCancel: () => void;
}

const TenantForm: React.FC<TenantFormProps> = ({ tenant, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logoUrl: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name || '',
        description: tenant.description || '',
        logoUrl: tenant.logoUrl || '',
        isActive: tenant.isActive
      });
    } else {
      setFormData({
        name: '',
        description: '',
        logoUrl: '',
        isActive: true
      });
    }
  }, [tenant]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tenant name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Tenant name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Tenant name must be less than 100 characters';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (formData.logoUrl && !isValidUrl(formData.logoUrl)) {
      newErrors.logoUrl = 'Please enter a valid URL (e.g., https://example.com/logo.png)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, description: true, logoUrl: true });
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (tenant) {
        // Update existing tenant
        const updateData: UpdateTenantRequest = {
          id: tenant.id,
          name: formData.name.trim(),
          description: formData.description?.trim() || undefined,
          logoUrl: formData.logoUrl?.trim() || undefined,
          isActive: formData.isActive
        };
        await mockTenantApi.updateTenant(updateData as TenantDto);
      } else {
        // Create new tenant
        const createData: Omit<TenantDto, 'id' | 'createdOn' | 'updatedOn'> = {
          name: formData.name.trim(),
          description: formData.description?.trim() || undefined,
          logoUrl: formData.logoUrl?.trim() || undefined,
          isActive: formData.isActive
        };
        await mockTenantApi.createTenant(createData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving tenant:', error);
      setErrors({ submit: 'Failed to save tenant. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Update logo preview
    if (name === 'logoUrl' && value && isValidUrl(value)) {
      setLogoPreview(value);
    } else if (name === 'logoUrl') {
      setLogoPreview(null);
    }
  };
  
  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateForm();
  };
  
  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : '';
  };
  
  const getFieldStatus = (fieldName: string) => {
    if (!touched[fieldName]) return 'default';
    return errors[fieldName] ? 'error' : 'success';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {tenant ? 'Edit Tenant' : 'Create New Tenant'}
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                {tenant ? 'Update tenant information and settings' : 'Add a new tenant to your organization'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Error Banner */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-red-700 text-sm font-medium">{errors.submit}</p>
            </div>
          </div>
        )}

        {/* Tenant Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Tenant Name *
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur('name')}
              className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                getFieldStatus('name') === 'error'
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : getFieldStatus('name') === 'success'
                  ? 'border-green-300 focus:ring-green-500 focus:border-green-500 bg-green-50'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
              }`}
              placeholder="Enter tenant name (e.g., Acme Financial Services)"
            />
            {getFieldStatus('name') === 'success' && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
            {getFieldStatus('name') === 'error' && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
            )}
          </div>
          {getFieldError('name') && (
            <p className="text-red-600 text-sm mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {getFieldError('name')}
            </p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            {formData.name.length}/100 characters
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              onBlur={() => handleBlur('description')}
              rows={4}
              className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                getFieldStatus('description') === 'error'
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : getFieldStatus('description') === 'success'
                  ? 'border-green-300 focus:ring-green-500 focus:border-green-500 bg-green-50'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
              }`}
              placeholder="Describe what this tenant does, their focus area, or any relevant details..."
            />
            {getFieldStatus('description') === 'success' && formData.description && (
              <Check className="absolute right-3 top-3 h-5 w-5 text-green-500" />
            )}
          </div>
          {getFieldError('description') && (
            <p className="text-red-600 text-sm mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {getFieldError('description')}
            </p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>

        {/* Logo URL */}
        <div>
          <label htmlFor="logoUrl" className="block text-sm font-semibold text-gray-700 mb-2">
            Logo URL
          </label>
          <div className="space-y-3">
            <div className="relative">
              <input
                type="url"
                id="logoUrl"
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleInputChange}
                onBlur={() => handleBlur('logoUrl')}
                className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  getFieldStatus('logoUrl') === 'error'
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                    : getFieldStatus('logoUrl') === 'success'
                    ? 'border-green-300 focus:ring-green-500 focus:border-green-500 bg-green-50'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white'
                }`}
                placeholder="https://example.com/logo.png"
              />
              {getFieldStatus('logoUrl') === 'success' && formData.logoUrl && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              )}
              {getFieldStatus('logoUrl') === 'error' && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
              )}
            </div>
            
            {/* Logo Preview */}
            {formData.logoUrl && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                <div className="flex-shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-12 w-12 rounded-lg object-cover border-2 border-gray-200"
                      onError={() => setLogoPreview(null)}
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Logo Preview</p>
                  <p className="text-xs text-gray-500 truncate">{formData.logoUrl}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}
            
            {getFieldError('logoUrl') && (
              <p className="text-red-600 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {getFieldError('logoUrl')}
              </p>
            )}
          </div>
        </div>

        {tenant && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                   formData.isActive ? 'bg-green-100' : 'bg-gray-100'
                 }`}>
                   {formData.isActive ? (
                     <CheckCircle className="h-5 w-5 text-green-600" />
                   ) : (
                     <XCircle className="h-5 w-5 text-gray-400" />
                   )}
                 </div>
                <div>
                  <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                    Tenant Status
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formData.isActive ? 'Tenant is active and can access services' : 'Tenant is inactive and cannot access services'}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label
                  htmlFor="isActive"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                    formData.isActive ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Saving...</span>
              </>
            ) : (
               <>
                 <Save className="h-4 w-4" />
                 <span>{tenant ? 'Update Tenant' : 'Create Tenant'}</span>
               </>
             )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 sm:flex-none bg-white text-gray-700 py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenantForm;
