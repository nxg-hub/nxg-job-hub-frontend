import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { ArrowRight, ArrowLeft, Plus, X, Trash2, Briefcase, Calendar, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProfileForm } from './ProfileFormContent';


export default function SkillsExperiencePage() {
  const [skills, setSkills] = useState([
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML'
  ]);
  const [newSkill, setNewSkill] = useState('');
  const { updateSkills, formData } = useProfileForm();
  const navigate = useNavigate();
  
  const [experiences, setExperiences] = useState([
    {
      id: "686e9c726cf1d4331f1b8c01",
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ]);
  
  const [education, setEducation] = useState([
    {
      id: "686e9c726cf1d4331f1b8c01",
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ]);

  const [workPreferences, setWorkPreferences] = useState({
    workType: '',
    willingToRelocate: false,
    travelPreference: ''
  });

  const [errors, setErrors] = useState({});

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id, field, value) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleSubmit = () => {
    updateSkills(formData);
    navigate('/certifications');
  };

  const handleBack = () => {
    window.location.href = '/personalInfo';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [month, day, year] = dateString.split('/');
    return `${month}/${year}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex space-x-2 border-b mb-6">
        <div className="px-4 sm:px-6 py-2 border-b-2 border-blue-500 font-medium text-blue-600">
          Skills & Experience
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-8">
        {/* Skills Section */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Skills</h2>
          <p className="text-sm text-gray-500 mb-4">Add your technical and professional skills</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-sky-500 text-white px-3 py-1 rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:bg-sky-600 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} className="bg-sky-500 border-0 hover:bg-sky-600">
              Add
            </Button>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="pt-6 border-t border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Work Experience</h2>
              <p className="text-sm text-gray-500">Add your previous work experience</p>
            </div>
            <Button
              onClick={addExperience}
              className="bg-sky-500 hover:bg-sky-600 border-0 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="border border-gray-300 rounded-lg p-4 relative">
                <div className="absolute top-4 right-4">
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button> */}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                      placeholder="Job Title"
                      className="font-semibold mb-2"
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company Name"
                        className="flex-1"
                      />
                      <span>•</span>
                      <Input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder="Location"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="w-32"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="w-32"
                    disabled={exp.current}
                  />
                  <label className="flex items-center gap-2 ml-4">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600">Current role</span>
                  </label>
                </div>

                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your role and achievements..."
                  className="h-24"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="pt-6 border-t border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Education</h2>
              <p className="text-sm text-gray-500">Add your educational background</p>
            </div>
            <Button
              onClick={addEducation}
              className="bg-sky-500 hover:bg-sky-600 flex items-center border-0 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </Button>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border border-gray-300 rounded-lg p-4 relative">
                <div className="absolute top-4 right-4">
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Degree/Certificate
                    </label>
                    <Input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Institution
                    </label>
                    <Input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    placeholder="MM/YYYY"
                    className="w-32"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    placeholder="MM/YYYY"
                    className="w-32"
                    disabled={edu.current}
                  />
                  <label className="flex items-center gap-2 ml-4">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600">Currently studying</span>
                  </label>
                </div>

                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Describe your studies, achievements, relevant coursework..."
                  className="h-20"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Work Availability & Preferences Section */}
        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">Work Availability & Preferences</h2>
          
          {/* Preferred Work Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-gray-700">
              Preferred Work Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Remote', 'Hybrid', 'Onsite'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setWorkPreferences({...workPreferences, workType: type})}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    workPreferences.workType === type
                      ? 'border-blue-500 bg-sky-500 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Willing to Relocate */}
          <div className="mb-6">
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={workPreferences.willingToRelocate}
                onChange={(e) => setWorkPreferences({...workPreferences, willingToRelocate: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Willing to relocate
            </label>
          </div>

          {/* Travel Preference */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Travel Preference
            </label>
            <div className="relative">
              <select
                value={workPreferences.travelPreference}
                onChange={(e) => setWorkPreferences({...workPreferences, travelPreference: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="No travel">No travel</option>
                <option value="Minimal travel (1-10%)">Minimal travel (1-10%)</option>
                <option value="Some travel (11-25%)">Some travel (11-25%)</option>
                <option value="Frequent travel (26-50%)">Frequent travel (26-50%)</option>
                <option value="Extensive travel (50%+)">Extensive travel (50%+)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-gray-300 flex justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-sky-500 hover:bg-sky-600 border-0 flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}