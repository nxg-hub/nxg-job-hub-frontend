import React, { useState } from "react";
// import logo from "../static/images/nxg-logo.png";
import logo from "../static/images/splash.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jobLocations } from "../utils/data/jobLocations";
import Header from "../components/header/Header";
import { companyIndusrty, employerJobType } from "../utils/data/employer";
import PostJobModal from "../components/Modal/PostJobModal";
import axios from "axios";
import { API_HOST_URL } from "../utils/api/API_HOST";
import { nigerianStates } from "@/lib/utils";
import Footer from "@/components/footer/Footer";

const ProgressIndicator = ({ currentStep }) => {
  return (
    <div className="w-full flex items-center justify-between flex- sm:flex-row mb-6">
      {/* Step 1 */}
      <div className="flex-1 text-center mb-4 sm:mb-0">
        <div
          className={`w-8 h-8 mx-auto rounded-full border-2 ${
            currentStep >= 1
              ? "bg-[#1e3a8a] text-white"
              : "bg-white border-gray-300"
          } flex items-center justify-center`}>
          <span
            className={`text-sm font-semibold ${
              currentStep >= 1 ? "text-white" : "text-gray-500"
            }`}>
            1
          </span>
        </div>
        <div
          className={`mt-2 text-sm ${
            currentStep >= 1 ? "text-[#1e3a8a]" : "text-gray-500"
          }`}>
          Step 1
        </div>
      </div>

      {/* Connector between steps */}
      <div
        className={`w-20 h-1 sm:w-[30%] sm:h-1 sm:absolute sm:left-[18%] sm:right-1/4 sm:top-[43%] sm:transform sm:-translate-y-1/2 ${
          currentStep >= 2 ? "bg-[#1e3a8a]" : "bg-gray-300"
        }`}
      />

      {/* Step 2 */}
      <div className="flex-1 text-center mb-4 sm:mb-0">
        <div
          className={`w-8 h-8 mx-auto rounded-full border-2 ${
            currentStep >= 2
              ? "bg-[#1e3a8a] text-white"
              : "bg-white border-gray-300"
          } flex items-center justify-center`}>
          <span
            className={`text-sm font-semibold ${
              currentStep >= 2 ? "text-white" : "text-gray-500"
            }`}>
            2
          </span>
        </div>
        <div
          className={`mt-2 text-sm ${
            currentStep >= 2 ? "text-[#1e3a8a]" : "text-gray-500"
          }`}>
          Step 2
        </div>
      </div>

      {/* Connector between steps */}
      <div
        className={`w-20 h-1 sm:w-[30%] sm:h-1 sm:absolute sm:left-[52%] sm:right-1/4 sm:top-[43%] sm:transform sm:-translate-y-1/2 ${
          currentStep >= 3 ? "bg-[#1e3a8a]" : "bg-gray-300"
        }`}
      />

      {/* Step 3 */}
      <div className="flex-1 text-center">
        <div
          className={`w-8 h-8 mx-auto rounded-full border-2 ${
            currentStep >= 3
              ? "bg-[#1e3a8a] text-white"
              : "bg-white border-gray-300"
          } flex items-center justify-center`}>
          <span
            className={`text-sm font-semibold ${
              currentStep >= 3 ? "text-white" : "text-gray-500"
            }`}>
            3
          </span>
        </div>
        <div
          className={`mt-2 text-sm ${
            currentStep >= 3 ? "text-[#1e3a8a]" : "text-gray-500"
          }`}>
          Step 3
        </div>
      </div>
    </div>
  );
};

const StepOneSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Required"),

  jobDescription: Yup.string()
    .min(20, "job description must have at least 20 characters")
    .required("Required"),
  jobRequirement: Yup.string().required("Required"),
  jobClassification: Yup.string().required("Required"),
  jobMode: Yup.string().required("Required"),
  jobType: Yup.string().required("Required"),
  jobLocation: Yup.string().required("Required"),
  deadline: Yup.string().required("Required"),
  salary: Yup.string().required("Required"),
  tags: Yup.string().required("Required"),
});

const StepTwoSchema = Yup.object().shape({
  companyBio: Yup.string()
    .min(20, "Company bio must have at least 20 characters")
    .required("Required"),
  companyLogo: Yup.mixed()
    .required("A file is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 5048576; // 5MB limit
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
  companyName: Yup.string().required("Required"),
  industry: Yup.string().required("Required"),
  companyRegistrationNumber: Yup.string().required("Required"),
  companyEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  companyPhoneNumber: Yup.string().required("Required"),
  companyAddress: Yup.string().required("Required"),
});
const StepThreeSchema = Yup.object().shape({
  paymentReceipt: Yup.mixed()
    .required("A file is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= 5048576; // 5MB limit
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value &&
        [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "application/msword",
        ].includes(value.type)
      );
    }),
});
const PostJobForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const submitForm = async (url, formData) => {
    try {
      setLoading(true);
      await axios
        .post(url, formData, {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      // setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    document.documentElement.scrollTop = 0; // For most modern browsers
  };

  const handleNext = (values, { setSubmitting }) => {
    // Store the current step's data
    setFormData({ ...formData, ...values });

    if (step < 3) {
      setStep(step + 1);
      scrollToTop();
    } else {
      handleSubmit(formData);
    }
    setSubmitting(false);
  };

  const handleBack = () => {
    // Store the current step's data

    if (step > 1) {
      setStep(step - 1);
      scrollToTop();
    }
  };

  const handleChange = async (e, setFieldValue, field) => {
    const { value } = e.target;

    setFieldValue(field, value); // Update Formik's state
  };
  const handleSubmit = async (values, setSubmitting) => {
    setLoading(true);
    try {
      let { paymentReceipt, companyLogo, tags, ...otherValues } = values;

      // Create an array of file uploads
      let uploadFiles = [paymentReceipt, companyLogo].map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "tin4r1lt");

        return axios.post(
          `${API_HOST_URL}/api/v1/auth/upload-to-cloudinary`,
          formData
        );
      });

      // Wait for all uploads to complete
      let responses = await Promise.all(uploadFiles);

      // Get URLs of uploaded files
      let fileUrls = responses.map((response) => response.data);

      [paymentReceipt, companyLogo] = fileUrls;
      // Handle form submission with otherValues and the uploaded file URLs
      const submittedData = {
        ...otherValues,
        paymentReceipt: paymentReceipt,
        companyLogo: companyLogo,
        tags: [tags],
      };

      submitForm(`${API_HOST_URL}/api/v1/job-posts`, submittedData);
      setLoading(false);

      navigate("/successfulJobPost");
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }

    // setSubmitting(false);
  };

  const initialValues = {
    jobTitle: "",
    companyBio: "",
    jobDescription: "",
    deadline: "",
    jobRequirement: "",
    salary: "",
    jobLocation: "",
    // jobClassification: "",
    tags: "",
    jobMode: "",
    jobType: "",
    companyLogo: "",
    companyName: "",
    industry: "",
    companyRegistrationNumber: "",
    companyWebsiteLink: "",
    companyEmail: "",
    companyPhoneNumber: "",
    companyAddress: "",
    paymentReceipt: "",
  };
  const validationSchemas = [StepOneSchema, StepTwoSchema, StepThreeSchema];
  return (
    <div>
      <div className="bg-[#215E7D]">
        <Header />
      </div>
      <div className=" py-4 mb-4 w-[90%] md:w-[70%] m-auto mt-5 rounded-lg">
        <img className="h-[100px] m-auto" src={logo} alt="logo" />
      </div>
      <ProgressIndicator currentStep={step} />
      <div className="w-full bg-lightGray h-full">
        <div className="bg-gray-100 w-[90%] md:w-[70%] m-auto mt-5 rounded-lg py-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[step - 1]}
            onSubmit={handleNext}>
            {({ setFieldValue, isSubmitting, values }) => (
              <Form className="w-full">
                {step === 1 && (
                  <div className="w-[90%] md:w-[75%] mx-auto mt-6 rounded-2xl bg-white shadow-lg p-8">
                    <h2 className="font-bold text-2xl md:text-3xl text-center mb-8">
                      Job Details
                    </h2>

                    <div className="space-y-6">
                      {/* Job Title */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="jobTitle" className="font-medium">
                          Job Title
                        </label>
                        <Field
                          type="text"
                          name="jobTitle"
                          className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <ErrorMessage
                          name="jobTitle"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Job Description */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="jobDescription" className="font-medium">
                          Job Description
                        </label>
                        <Field
                          as="textarea"
                          name="jobDescription"
                          className="h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <ErrorMessage
                          name="jobDescription"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Job Requirement */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="jobRequirement" className="font-medium">
                          Job Requirement
                        </label>
                        <Field
                          as="textarea"
                          name="jobRequirement"
                          className="h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <ErrorMessage
                          name="jobRequirement"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Job Location */}
                      <div className="flex flex-col gap-1">
                        <label className="font-medium">Job Location</label>
                        <select
                          name="jobLocation"
                          value={values.jobLocation}
                          onChange={(e) =>
                            handleChange(
                              e,
                              setFieldValue,
                              "jobLocation",
                              values
                            )
                          }
                          className="h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                          {nigerianStates.map(({ id, value }) => (
                            <option key={id}>{value}</option>
                          ))}
                        </select>
                        <ErrorMessage
                          name="jobLocation"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      {/* Job Type + Job Mode */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <label className="font-medium">Job Type</label>
                          <select
                            name="jobType"
                            value={values.jobType}
                            onChange={(e) =>
                              handleChange(e, setFieldValue, "jobType", values)
                            }
                            className="h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                            {employerJobType.map(({ id, title }) => (
                              <option key={id}>{title}</option>
                            ))}
                          </select>
                          <ErrorMessage
                            name="jobType"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-medium">Job Mode</label>
                          <select
                            name="jobMode"
                            value={values.jobMode}
                            onChange={(e) =>
                              handleChange(e, setFieldValue, "jobMode", values)
                            }
                            className="h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                            {jobLocations.map(({ id, title }) => (
                              <option key={id}>{title}</option>
                            ))}
                          </select>
                          <ErrorMessage
                            name="jobMode"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* Classification + Salary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <label className="font-medium">
                            Job Classification
                          </label>
                          <select
                            name="jobClassification"
                            value={values.jobClassification}
                            onChange={(e) =>
                              handleChange(
                                e,
                                setFieldValue,
                                "jobClassification",
                                values
                              )
                            }
                            className="h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                            <option value="">Select Job Classification</option>
                            <option value="SERVICE">
                              Service / Operational roles
                            </option>
                            <option value="PROFESSIONAL">
                              Professional / Skilled roles
                            </option>
                          </select>
                          <ErrorMessage
                            name="jobClassification"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-medium">Salary</label>
                          <Field
                            type="number"
                            name="salary"
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <ErrorMessage
                            name="salary"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* Tags + Deadline */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <label className="font-medium">Tags</label>
                          <Field
                            name="tags"
                            placeholder="react, design, plumber..."
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <ErrorMessage
                            name="tags"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-medium">
                            Application Deadline
                          </label>
                          <Field
                            type="date"
                            name="deadline"
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <ErrorMessage
                            name="deadline"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="w-[90%] md:w-[75%] mx-auto mt-6 rounded-2xl bg-white shadow-lg p-8">
                    <h2 className="font-bold text-2xl md:text-3xl text-center mb-8">
                      Company Details
                    </h2>

                    <div className="space-y-6">
                      {/* Upload Company Logo */}
                      <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="companyLogo">
                          Upload Company Logo
                        </label>
                        <input
                          id="companyLogo"
                          name="companyLogo"
                          type="file"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("companyLogo", file);
                          }}
                          className="h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <ErrorMessage
                          className="text-red-500 text-sm"
                          name="companyLogo"
                          component="div"
                        />
                      </div>

                      {/* Company Bio */}
                      <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="companyBio">
                          Company Bio
                        </label>
                        <Field
                          as="textarea"
                          name="companyBio"
                          className="h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <ErrorMessage
                          className="text-red-500 text-sm"
                          name="companyBio"
                          component="div"
                        />
                      </div>

                      {/* Company Name + CAC Reg */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <label className="font-medium" htmlFor="companyName">
                            Company Name
                          </label>
                          <Field
                            type="text"
                            name="companyName"
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <ErrorMessage
                            className="text-red-500 text-sm"
                            name="companyName"
                            component="div"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label
                            className="font-medium"
                            htmlFor="companyRegistrationNumber">
                            CAC Reg. No
                          </label>
                          <Field
                            type="text"
                            name="companyRegistrationNumber"
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <ErrorMessage
                            className="text-red-500 text-sm"
                            name="companyRegistrationNumber"
                            component="div"
                          />
                        </div>
                      </div>

                      {/* Website + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <label
                            className="font-medium"
                            htmlFor="companyWebsiteLink">
                            Website
                          </label>
                          <Field
                            type="text"
                            name="companyWebsiteLink"
                            placeholder="https://example.com"
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label
                            className="font-medium"
                            htmlFor="companyPhoneNumber">
                            Phone Contact
                          </label>
                          <Field
                            type="number"
                            name="companyPhoneNumber"
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <ErrorMessage
                            className="text-red-500 text-sm"
                            name="companyPhoneNumber"
                            component="div"
                          />
                        </div>
                      </div>

                      {/* Email + Industry */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <label className="font-medium" htmlFor="companyEmail">
                            Email Contact
                          </label>
                          <Field
                            type="email"
                            name="companyEmail"
                            className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                          <ErrorMessage
                            className="text-red-500 text-sm"
                            name="companyEmail"
                            component="div"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-medium" htmlFor="industry">
                            Company Industry
                          </label>
                          <select
                            name="industry"
                            id="industry"
                            value={values.industry}
                            onChange={(e) =>
                              handleChange(e, setFieldValue, "industry", values)
                            }
                            className="h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                            <option value="">Select Industry</option>
                            {companyIndusrty.map(({ id, title }) => (
                              <option key={id} value={title}>
                                {title}
                              </option>
                            ))}
                          </select>
                          <ErrorMessage
                            className="text-red-500 text-sm"
                            name="industry"
                            component="div"
                          />
                        </div>
                      </div>

                      {/* Company Address */}
                      <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="companyAddress">
                          Company Address
                        </label>
                        <Field
                          as="textarea"
                          name="companyAddress"
                          className="h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <ErrorMessage
                          className="text-red-500 text-sm"
                          name="companyAddress"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="w-[90%] md:w-[75%] mx-auto mt-6 rounded-2xl bg-white shadow-lg p-8">
                    <h2 className="font-bold text-2xl md:text-3xl text-center mb-8">
                      Payment
                    </h2>

                    <div className="space-y-6 bg-[#2B749A] rounded-lg p-6 md:p-10 text-white">
                      {/* Payment Instructions */}
                      <div className="space-y-4 md:w-[90%] mx-auto">
                        <p className="font-bold text-lg">Choose Payment Mode</p>
                        <Link
                          to="https://paystack.com/pay/externaljobpost"
                          target="_blank"
                          className="text-green-400 underline">
                          Click Here To Pay With Card
                        </Link>

                        <p className="mt-6 font-bold text-lg">
                          Or Make a Direct Deposit/Transfer to the Accounts
                          below:
                        </p>

                        <div className="space-y-4 text-sm md:text-base">
                          <p>
                            <span className="font-semibold">
                              Account Details:
                            </span>{" "}
                            <br />
                            Account Number: 1027147237 <br />
                            Account Name: NXG HUB DIGITAL TECHNOLOGIES LTD{" "}
                            <br />
                            Bank: UBA
                          </p>

                          <p>
                            <span className="font-semibold">
                              DOM Account Details (USD):
                            </span>{" "}
                            <br />
                            Account Number: 3004434567 <br />
                            Account Name: NXG HUB DIGITAL TECHNOLOGIES LTD{" "}
                            <br />
                            Bank: UBA
                          </p>

                          <p>
                            <span className="font-semibold">
                              DOM Account Details (GBP):
                            </span>{" "}
                            <br />
                            Account Number: 3004434718 <br />
                            Account Name: NXG HUB DIGITAL TECHNOLOGIES LTD{" "}
                            <br />
                            Bank: UBA
                          </p>

                          <p>
                            <span className="font-semibold">
                              Account Details:
                            </span>{" "}
                            <br />
                            Account Number: 5610096099 <br />
                            Account Name: NXG HUB DIGITAL TECHNOLOGIES LTD{" "}
                            <br />
                            Bank: FIDELITY BANK
                          </p>
                        </div>
                      </div>

                      {/* Upload Payment Receipt */}
                      <div className="flex flex-col gap-2 md:w-[90%] mx-auto mt-4">
                        <label className="font-medium" htmlFor="paymentReceipt">
                          Upload Payment Receipt
                        </label>
                        <input
                          id="paymentReceipt"
                          name="paymentReceipt"
                          type="file"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("paymentReceipt", file);
                          }}
                          className="h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black"
                        />
                        <ErrorMessage
                          className="text-red-500 text-sm"
                          name="paymentReceipt"
                          component="div"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-1 w-[40%] md:w-[30%] m-auto">
                  {step > 1 && (
                    <button
                      onClick={handleBack}
                      type="button"
                      disabled={isSubmitting}
                      className="w-[100%] rounded-full text-center py-2 my-10 text-white font-bold m-auto border-none bg-[#215E7D] hover:bg-[#2B749A]">
                      {"Back"}
                    </button>
                  )}
                  <button
                    disabled={isSubmitting}
                    className="w-[100%] bg-[#215E7D] hover:bg-[#2B749A] border-none rounded-full text-center py-2 my-10 text-white font-bold m-auto"
                    type="submit">
                    {loading ? "Submitting..." : step < 3 ? "Next" : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* modal */}
      <PostJobModal />
      <Footer />
    </div>
  );
};

export default PostJobForm;
