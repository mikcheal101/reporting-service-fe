'use client';

import React, { useState, useEffect } from 'react';
import { UserDto, CreateUserDto, UpdateUserDto, UserRole } from '@/types/user';
import { mockUserApi } from '@/data/mockUsers';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  Crown, 
  Eye, 
  Save, 
  X, 
  CheckCircle, 
  XCircle, 
  Upload, 
  AlertCircle 
} from 'lucide-react';

interface UserFormProps {
  user?: UserDto | null;
  tenantId: string;
  onSave: (user: UserDto) => void;
  onCancel: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl: string;
  phoneNumber: string;
  department: string;
  jobTitle: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
  department?: string;
  jobTitle?: string;
}

export default function UserForm({ user, tenantId, onSave, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: UserRole.USER,
    isActive: true,
    avatarUrl: '',
    phoneNumber: '',
    department: '',
    jobTitle: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Initialize form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        avatarUrl: user.avatarUrl || '',
        phoneNumber: user.phoneNumber || '',
        department: user.department || '',
        jobTitle: user.jobTitle || ''
      });
      setAvatarPreview(user.avatarUrl || '');
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: UserRole.USER,
        isActive: true,
        avatarUrl: '',
        phoneNumber: '',
        department: '',
        jobTitle: ''
      });
      setAvatarPreview('');
    }
    setErrors({});
    setTouched({});
  }, [user]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = 'First name must be less than 50 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = 'Last name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Phone number validation (optional but must be valid if provided)
    if (formData.phoneNumber.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
      if (!phoneRegex.test(formData.phoneNumber.trim())) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    // Department validation (optional but must be reasonable length)
    if (formData.department.trim() && formData.department.trim().length > 100) {
      newErrors.department = 'Department name must be less than 100 characters';
    }

    // Job title validation (optional but must be reasonable length)
    if (formData.jobTitle.trim() && formData.jobTitle.trim().length > 100) {
      newErrors.jobTitle = 'Job title must be less than 100 characters';
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | UserRole) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Update avatar preview
    if (field === 'avatarUrl' && typeof value === 'string') {
      setAvatarPreview(value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: keyof FormErrors): string | undefined => {
    return touched[field] ? errors[field] : undefined;
  };

  const getFieldStatus = (field: keyof FormErrors): 'error' | 'success' | 'default' => {
    if (!touched[field]) return 'default';
    return errors[field] ? 'error' : 'success';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'department', 'jobTitle'];
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);
    
    try {
      const trimmedData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        role: formData.role,
        isActive: formData.isActive,
        avatarUrl: formData.avatarUrl.trim() || undefined,
        phoneNumber: formData.phoneNumber.trim() || undefined,
        department: formData.department.trim() || undefined,
        jobTitle: formData.jobTitle.trim() || undefined
      };

      let savedUser: UserDto;
      
      if (user) {
        // Update existing user
        const updateData: UpdateUserDto = trimmedData;
        savedUser = await mockUserApi.updateUser(user.id, updateData);
      } else {
        // Create new user
        const createData: CreateUserDto = {
          ...trimmedData,
          tenantId
        };
        savedUser = await mockUserApi.createUser(createData);
      }
      
      onSave(savedUser);
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Crown className="h-4 w-4" />;
      case UserRole.MANAGER:
        return <Briefcase className="h-4 w-4" />;
      case UserRole.USER:
        return <User className="h-4 w-4" />;
      case UserRole.VIEWER:
        return <Eye className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {user ? 'Edit User' : 'Add New User'}
        </h2>
        <p className="text-sm text-gray-600">
          {user ? 'Update user information and permissions' : 'Create a new user account for this tenant'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {avatarPreview ? (
              <img 
                className="h-20 w-20 rounded-full object-cover border-4 border-gray-100" 
                src={avatarPreview} 
                alt="Avatar preview"
                onError={() => setAvatarPreview('')}
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {formData.firstName.charAt(0).toUpperCase()}{formData.lastName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar URL (Optional)
            </label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter a URL to an image for the user's avatar
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onBlur={() => handleBlur('firstName')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  getFieldStatus('firstName') === 'error' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : getFieldStatus('firstName') === 'success'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-200 focus:ring-orange-500'
                }`}
                placeholder="Enter first name"
              />
              {getFieldStatus('firstName') === 'success' && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {getFieldStatus('firstName') === 'error' && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            {getFieldError('firstName') && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {getFieldError('firstName')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onBlur={() => handleBlur('lastName')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  getFieldStatus('lastName') === 'error' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : getFieldStatus('lastName') === 'success'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-200 focus:ring-orange-500'
                }`}
                placeholder="Enter last name"
              />
              {getFieldStatus('lastName') === 'success' && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {getFieldStatus('lastName') === 'error' && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            {getFieldError('lastName') && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {getFieldError('lastName')}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  getFieldStatus('email') === 'error' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : getFieldStatus('email') === 'success'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-200 focus:ring-orange-500'
                }`}
                placeholder="user@example.com"
              />
              {getFieldStatus('email') === 'success' && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {getFieldStatus('email') === 'error' && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            {getFieldError('email') && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {getFieldError('email')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                onBlur={() => handleBlur('phoneNumber')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  getFieldStatus('phoneNumber') === 'error' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : getFieldStatus('phoneNumber') === 'success'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-200 focus:ring-orange-500'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {getFieldStatus('phoneNumber') === 'success' && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {getFieldStatus('phoneNumber') === 'error' && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            {getFieldError('phoneNumber') && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {getFieldError('phoneNumber')}
              </p>
            )}
          </div>
        </div>

        {/* Role and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {getRoleIcon(formData.role)}
              </div>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                <option value={UserRole.ADMIN}>Admin - Full system access</option>
                <option value={UserRole.MANAGER}>Manager - Team management</option>
                <option value={UserRole.USER}>User - Standard access</option>
                <option value={UserRole.VIEWER}>Viewer - Read-only access</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                onBlur={() => handleBlur('department')}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  getFieldStatus('department') === 'error' 
                    ? 'border-red-300 focus:ring-red-500' 
                    : getFieldStatus('department') === 'success'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-200 focus:ring-orange-500'
                }`}
                placeholder="Engineering, Marketing, Sales..."
              />
              {getFieldStatus('department') === 'success' && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
              {getFieldStatus('department') === 'error' && (
                <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              )}
            </div>
            {getFieldError('department') && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                {getFieldError('department')}
              </p>
            )}
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              onBlur={() => handleBlur('jobTitle')}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                getFieldStatus('jobTitle') === 'error' 
                  ? 'border-red-300 focus:ring-red-500' 
                  : getFieldStatus('jobTitle') === 'success'
                  ? 'border-green-300 focus:ring-green-500'
                  : 'border-gray-200 focus:ring-orange-500'
              }`}
              placeholder="Senior Developer, Product Manager..."
            />
            {getFieldStatus('jobTitle') === 'success' && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
            {getFieldStatus('jobTitle') === 'error' && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
            )}
          </div>
          {getFieldError('jobTitle') && (
            <p className="text-red-600 text-xs mt-1 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {getFieldError('jobTitle')}
            </p>
          )}
        </div>

        {/* Active Status Toggle */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                formData.isActive ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {formData.isActive ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Account Status
                </h3>
                <p className="text-xs text-gray-500">
                  {formData.isActive 
                    ? 'User can access the system and perform actions' 
                    : 'User account is disabled and cannot access the system'
                  }
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('isActive', !formData.isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                formData.isActive ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-6 rounded-lg hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Saving...</span>
              </>
            ) : (
               <>
                 <Save className="h-4 w-4" />
                 <span>{user ? 'Update User' : 'Create User'}</span>
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
}