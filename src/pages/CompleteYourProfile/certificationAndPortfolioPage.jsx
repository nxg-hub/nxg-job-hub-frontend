import React, { useState, createContext, useContext } from "react";

// Mock ProfileFormContext for standalone use
const ProfileFormContext = createContext();

const useProfileForm = () => useContext(ProfileFormContext);

const ProfileFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personal:  {},
    skills: {},
    certifications: [],
    portfolio: [],
  });

  const updatePersonal = (data) => setFormData((prev) => ({ ...prev, personal: data }));
  const updateSkills = (data) => setFormData((prev) => ({ ...prev, skills: data }));
  const updateCertifications = (data) =>
    setFormData((prev) => ({ ...prev, certifications: data }));
  const updatePortfolio = (data) =>
    setFormData((prev) => ({ ...prev, portfolio: data }));

  return (
    <ProfileFormContext.Provider
      value={{ formData, updatePersonal, updateSkills, updateCertifications, updatePortfolio }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
};

function CertificationsPage() {
  const {
    formData,
    updateCertifications,
    updatePortfolio,
  } = useProfileForm();

  const [certification, setCertification] = useState({
    name: "",
    issuer: "",
    year: "",
  });

  const [portfolioItem, setPortfolioItem] = useState({
    title: "",
    description: "",
    technologies: "",
    projectUrl: "",
    githubUrl: "",
  });

  const [showCertForm, setShowCertForm] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Toast function
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // ADD CERTIFICATION
  const addCertification = () => {
    if (certification.name && certification.issuer && certification.year) {
      const updated = [
        ...formData.certifications,
        { id: Date.now(), ...certification },
      ];
      updateCertifications(updated);
      setCertification({ name: "", issuer: "", year: "" });
      setShowCertForm(false);
      showToast("Certification added successfully!");
    }
  };

  // REMOVE CERTIFICATION
  const removeCertification = (id) => {
    const updated = formData.certifications.filter((cert) => cert.id !== id);
    updateCertifications(updated);
    showToast("Certification removed");
  };

  // ADD PORTFOLIO ITEM
  const addPortfolioProject = () => {
    if (portfolioItem.title && portfolioItem.description) {
      const newItem = {
        id: Date.now(),
        ...portfolioItem,
        technologies: portfolioItem.technologies
          .split(",")
          .map((t) => t.trim()),
        image: "/api/placeholder/400/250",
      };
      const updated = [...(formData.portfolio || []), newItem];
      updatePortfolio(updated);
      setPortfolioItem({
        title: "",
        description: "",
        technologies: "",
        projectUrl: "",
        githubUrl: "",
      });
      setShowPortfolioForm(false);
      showToast("Portfolio project added successfully!");
    }
  };

  // REMOVE PORTFOLIO ITEM
  const removePortfolioProject = (id) => {
    const updated = formData.portfolio.filter((proj) => proj.id !== id);
    updatePortfolio(updated);
    showToast("Portfolio project removed");
  };

  // SUBMIT ALL DATA FROM ALL 3 PAGES
  const handleSubmit = async () => {
    console.log("🚀 Submit button clicked!");
    console.log("📊 Complete form data from all pages:", formData);
    
    const techID = "";
    
    // Combine all data from the 3 pages
    const payload = {
      techID: techID,
      // Personal info from page 1
      ...formData.personal,
      // Skills from page 2
      ...formData.skills,
      // Certifications and portfolio from page 3
      certifications: formData.certifications,
      portfolio: formData.portfolio,
    };

    console.log("📦 Final payload to submit:", payload);
    console.log("🌐 API URL:", `https://nxg-job-hub-backend.onrender.com/api/v1/tech-talent/${techID}`);

    try {
      console.log("📡 Making API call...");
      showToast("Submitting complete profile...");
      
      const res = await fetch(`https://nxg-job-hub-backend.onrender.com/api/v1/tech-talent/${techID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("📨 Response received:", res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.text();
        console.error("❌ API Error:", errorData);
        throw new Error(`Failed to submit profile: ${res.status} - ${errorData}`);
      }

      const responseData = await res.json().catch(() => "No JSON response");
      console.log("✅ Profile submitted successfully:", responseData);
      
      showToast("Complete profile submitted successfully!");
    } catch (err) {
      console.error("💥 Submit error:", err);
      showToast(`Submission error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">  
      {/* Toast notification */}
      {/* {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toastMessage}
        </div>
      )} */}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex space-x-2 border-b mb-6">
          <div className="px-4 sm:px-6 py-2 border-b-2 border-blue-500 font-medium text-blue-600">
            Skills & Experience
          </div>
        </div>

        {/* Debug Panel - Remove this in production */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
          <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
          <p><strong>Personal Data:</strong> {Object.keys(formData.personal).length} fields</p>
          <p><strong>Skills Data:</strong> {Object.keys(formData.skills).length} fields</p>
          <p><strong>Certifications:</strong> {formData.certifications.length} items</p>
          <p><strong>Portfolio:</strong> {formData.portfolio.length} items</p>
        </div>

        {/* Certifications Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Certifications</h2>
                <p className="text-gray-600 mt-1">Upload and manage your professional certifications</p>
              </div>
              {!showCertForm && (
                <button 
                  onClick={() => setShowCertForm(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span className="text-lg">+</span>
                  Add Certification
                </button>
              )}
            </div>
          </div>

          <div className="p-6 space-y-4">
            {formData.certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-600 mt-1">{cert.issuer} • Issued on {cert.year}</p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-500 mt-1">Credential ID: {cert.credentialId}</p>
                      )}
                      {cert.expires && (
                        <p className="text-sm text-gray-500">Expires: {cert.expires}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">
                      View
                    </button>
                    <button
                      onClick={() => removeCertification(cert.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707A1 1 0 0117 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a1 1 0 01.293-.707L5 13.5V5zM8.5 7.5A1.5 1.5 0 017 9v4a1.5 1.5 0 003 0V9a1.5 1.5 0 00-1.5-1.5zM12.5 7.5A1.5 1.5 0 0011 9v4a1.5 1.5 0 003 0V9a1.5 1.5 0 00-1.5-1.5z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {showCertForm && (
              <div className="bg-gray-50 border-2 rounded-lg p-6">
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={certification.name}
                    onChange={(e) =>
                      setCertification({ ...certification, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={certification.issuer}
                    onChange={(e) =>
                      setCertification({ ...certification, issuer: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={certification.year}
                    onChange={(e) =>
                      setCertification({ ...certification, year: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button onClick={addCertification} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                      Save
                    </button>
                    <button
                      onClick={() => setShowCertForm(false)}
                      className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {formData.certifications.length === 0 && !showCertForm && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload a new certification</h3>
                <p className="text-gray-500 mb-4">Drag and drop your certification file or click to browse</p>
                <button 
                  onClick={() => setShowCertForm(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Select File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Portfolio</h2>
                <p className="text-gray-600 mt-1">Showcase your projects and work</p>
              </div>
              {!showPortfolioForm && (
                <button 
                  onClick={() => setShowPortfolioForm(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span className="text-lg">+</span>
                  Add Project
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.portfolio?.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">{proj.title}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{proj.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{proj.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {proj.projectUrl && (
                          <a
                            href={proj.projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-3 py-1 text-sm rounded transition-colors flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            View Project
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => removePortfolioProject(proj.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707A1 1 0 0117 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a1 1 0 01.293-.707L5 13.5V5z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {showPortfolioForm && (
                <div className="bg-gray-50 border-2 rounded-lg p-6 md:col-span-2">
                  <div className="grid gap-4">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={portfolioItem.title}
                      onChange={(e) =>
                        setPortfolioItem({ ...portfolioItem, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={portfolioItem.description}
                      onChange={(e) =>
                        setPortfolioItem({
                          ...portfolioItem,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Technologies (comma-separated)"
                      value={portfolioItem.technologies}
                      onChange={(e) =>
                        setPortfolioItem({
                          ...portfolioItem,
                          technologies: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Project URL (optional)"
                      value={portfolioItem.projectUrl}
                      onChange={(e) =>
                        setPortfolioItem({
                          ...portfolioItem,
                          projectUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="GitHub URL (optional)"
                      value={portfolioItem.githubUrl}
                      onChange={(e) =>
                        setPortfolioItem({
                          ...portfolioItem,
                          githubUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <button onClick={addPortfolioProject} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                        Save
                      </button>
                      <button
                        onClick={() => setShowPortfolioForm(false)}
                        className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {formData.portfolio?.length === 0 && !showPortfolioForm && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Add a new portfolio item</h3>
                <p className="text-gray-500">Showcase your best work to potential employers</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg transition-colors"
          >
            Submit Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProfileFormProvider>
      <CertificationsPage />
    </ProfileFormProvider>
  );
}