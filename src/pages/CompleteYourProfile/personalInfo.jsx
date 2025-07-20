import React, { useState } from 'react';
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Textarea } from '../../components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useProfileForm } from './ProfileFormContent';

export default function PersonalPage() {
  const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+234', country: 'NG', flag: '🇳🇬' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+7', country: 'RU', flag: '🇷🇺' },
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[2]); // Default to Nigeria
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { updatePersonal } = useProfileForm();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setFormData({ ...formData, phone: value });
      if (errors.phone) {
        setErrors({ ...errors, phone: '' });
      }
    }
  };

  const formatPhoneDisplay = (phone) => {
      if (!phone) return '';
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
   };
   
  const handleSubmit = () => {
    updatePersonal(formData); // your current form state
    navigate('/skills'); // instead of window.location.href
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">

      <div className="flex space-x-2 border-b mb-6">
        <div className="px-4 sm:px-6 py-2 border-b-2 border-blue-500 font-medium text-blue-600">
          Personal Information
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center text-lg sm:text-xl font-bold text-gray-500 flex-shrink-0">
            {formData.firstName.charAt(0) || 'J'}{formData.lastName.charAt(0) || 'D'}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Profile Picture</p>
            <p className="text-sm text-gray-500 mb-2">Upload a professional photo for your profile</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" size="sm">
                Upload
              </Button>
              <Button variant="destructive" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Personal Info Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange}
              className={errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange}
              className={errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <Input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 rounded-r-none border-r-0 h-10 px-3"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <span className="text-base">{selectedCountryCode.flag}</span>
                  <span className="text-sm font-medium">{selectedCountryCode.code}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                    {countryCodes.map((country) => (
                      <Button
                        key={country.code}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-full flex items-center space-x-3 justify-start rounded-none"
                        onClick={() => {
                          setSelectedCountryCode(country);
                          setShowCountryDropdown(false);
                        }}
                      >
                        <span className="text-base">{country.flag}</span>
                        <span className="text-sm font-medium">{country.code}</span>
                        <span className="text-sm text-gray-500">{country.country}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              <Input
                type="tel"
                name="phone"
                value={formatPhoneDisplay(formData.phone)}
                onChange={handlePhoneChange}
                className={`rounded-l-none ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                placeholder="123-456-7890"
                maxLength={12}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Location <span className="text-red-500">*</span>
            </label>
            <Input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              className={errors.location ? 'border-red-500 focus-visible:ring-red-500' : ''}
              placeholder="Enter your location"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Bio <span className="text-red-500">*</span>
            </label>
            <Textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange}
              className={`h-24 ${errors.bio ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              placeholder="Tell us about yourself..."
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
          </div>
        </div>

        {/* Social Profiles */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Social Profiles</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">LinkedIn</label>
              <Input 
                type="text" 
                name="linkedin" 
                value={formData.linkedin} 
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">GitHub</label>
              <Input 
                type="text" 
                name="github" 
                value={formData.github} 
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Portfolio Website</label>
              <Input 
                type="text" 
                name="portfolio" 
                value={formData.portfolio} 
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex justify-end">
          <Button 
            onClick={handleSubmit}
            size="icon"
            // className="rounded-full"
            title="Continue to Skills & Experience"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}