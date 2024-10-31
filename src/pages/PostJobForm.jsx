import React, { useState } from "react";
import logo from "../static/images/nxg-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jobLocations } from "../utils/data/jobLocations";
import Header from "../components/header/Header";
import { companyIndusrty, employerJobType } from "../utils/data/employer";
import PostJobModal from "../components/Modal/PostJobModal";
import axios from "axios";
import { API_HOST_URL } from "../utils/api/API_HOST";

const PostJobForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const validationSchemas = Yup.object().shape({
    jobTitle: Yup.string().required("Required"),
    companyBio: Yup.string()
      .min(20, "Company bio must have at least 20 characters")
      .required("Required"),
    jobDescription: Yup.string()
      .min(20, "job description must have at least 20 characters")

      .required("Required"),
    deadline: Yup.string().required("Required"),
    jobRequirement: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    jobLocation: Yup.string().required("Required"),
    tags: Yup.string().required("Required"),
    companyLogo: Yup.mixed()
      .required("A file is required")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 5048576; // 5MB limit
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return value && ["image/jpeg", "image/png"].includes(value.type);
      }),
    jobMode: Yup.string().required("Required"),
    jobType: Yup.string().required("Required"),
    companyName: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    companyRegistrationNumber: Yup.string().required("Required"),
    companyEmail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    companyPhoneNumber: Yup.string().required("Required"),
    companyAddress: Yup.string().required("Required"),
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

  const handleChange = async (e, setFieldValue, field) => {
    const { value } = e.target;

    setFieldValue(field, value); // Update Formik's state
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
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
          // `${API_HOST_URL}/api/cloudinary/upload-file`,
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
      console.log(submittedData);
      submitForm(`${API_HOST_URL}/api/v1/job-posts`, submittedData);
      setLoading(false);

      navigate("/successfulJobPost");
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }

    setSubmitting(false);
  };

  const initialValues = {
    jobTitle: "",
    companyBio: "",
    jobDescription: "",
    deadline: "",
    jobRequirement: "",
    salary: "",
    jobLocation: "",
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
  return (
    <div>
      <div className="bg-black">
        <Header />
      </div>
      <div className="w-full bg-lightGray h-full">
        <div className="bg-[#2596BE20] w-[90%] md:w-[70%] m-auto mt-5 rounded-lg py-5">
          <div className=" w-[90%] md:w-[70%] m-auto mt-5 rounded-lg">
            <img className="h-[100px] m-auto" src={logo} alt="logo" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas}
            onSubmit={handleSubmit}>
            {({ setFieldValue, isSubmitting, values }) => (
              <Form className="w-full">
                <div className="border-2 border-black mt-3 rounded-2xl w-[90%] m-auto py-5 ">
                  <h2 className="font-bold md:text-xl text-center mt-5">
                    Job Details
                  </h2>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4 ">
                    <label className="font-bold" htmlFor="jobTitle">
                      Job Title
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="jobTitle"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="jobTitle"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="jobDescription">
                      Job Description
                    </label>
                    <Field
                      as="textarea"
                      className="h-[200px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="jobDescription"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="jobDescription"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="jobRequirement">
                      Job Requirement
                    </label>
                    <Field
                      as="textarea"
                      className="h-[200px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="jobRequirement"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="jobRequirement"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col w-[90%] md:w-[70%] m-auto mt-4">
                    <label className="font-bold" htmlFor="jobType">
                      Job Type
                    </label>

                    <select
                      className="bg-primary py-4 px-2 rounded-lg"
                      required
                      id="jobType"
                      name="jobType"
                      onChange={(e) =>
                        handleChange(e, setFieldValue, "jobType", values)
                      }>
                      {employerJobType.map(({ id, title }) => (
                        <option key={id} className="block mt-2">
                          {title}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      className="text-red-500"
                      name="jobType"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col w-[90%] md:w-[70%] m-auto mt-4">
                    <label className="font-bold" htmlFor="jobMode">
                      Job Mode
                    </label>

                    <select
                      className="bg-primary py-4 px-2 rounded-lg"
                      name="jobMode"
                      onChange={(e) =>
                        handleChange(e, setFieldValue, "jobMode", values)
                      }>
                      {jobLocations.map(({ id, value }) => (
                        <option key={id} className="block mt-2">
                          {value}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      className="text-red-500"
                      name="jobMode"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="jobLocation">
                      Job Location
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="jobLocation"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="jobLocation"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="salary">
                      Salary
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="number"
                      name="salary"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="salary"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="tags">
                      Tags
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="tags"
                      placeholder="tags:frontend, product manager..."
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="tags"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="deadline">
                      Application Deadline
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="date"
                      name="deadline"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="deadline"
                      component="div"
                    />
                  </div>
                </div>

                <div className="border-2 border-black mt-8 rounded-2xl w-[90%] m-auto pb-5">
                  <h2 className="font-bold md:text-xl text-center mt-5">
                    Company Details
                  </h2>
                  <div className="w-[90%] md:w-[70%] m-auto mt-4">
                    <label className="font-bold block" htmlFor="logo">
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
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyLogo"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="companyBio">
                      Company Bio
                    </label>
                    <Field
                      as="textarea"
                      className="h-[200px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="companyBio"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyBio"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="companyName">
                      Company Name
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="companyName"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyName"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label
                      className="font-bold"
                      htmlFor="companyRegistrationNumber">
                      CAC REG. NO:
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="companyRegistrationNumber"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyRegistrationNumber"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="companyWebsiteLink">
                      Website
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="companyWebsiteLink"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyWebsiteLink"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="companyPhoneNumber">
                      Phone Contact
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="number"
                      name="companyPhoneNumber"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyPhoneNumber"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="companyEmail">
                      Email Contact
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="email"
                      name="companyEmail"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyEmail"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col w-[90%] md:w-[70%] m-auto mt-4">
                    <label className="font-bold" htmlFor="industry">
                      Company Indutsry
                    </label>

                    <select
                      className="bg-primary py-4 px-2 rounded-lg"
                      required
                      id="industry"
                      name="industry"
                      onChange={(e) =>
                        handleChange(e, setFieldValue, "industry", values)
                      }>
                      {companyIndusrty.map(({ id, title }) => (
                        <option key={id} className="block mt-2">
                          {title}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      className="text-red-500"
                      name="industry"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="companyAddress">
                      Company Address
                    </label>
                    <Field
                      as="textarea"
                      className="h-[150px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="companyAddress"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="companyAddress"
                      component="div"
                    />
                  </div>
                </div>
                <div className="border-2 border-black mt-8 rounded-2xl w-[90%] m-auto pb-5">
                  <div className=" w-[90%] md:w-[70%] m-auto mt-4 outline-none bg-primary rounded-lg py-4">
                    <article className="md:w-[90%] m-auto">
                      <p className="mb-5 font-bold">Choose Payment Mode</p>

                      <Link
                        to="https://paystack.com/pay/externaljobpost"
                        target="_blank"
                        className="text-secondary underline md:text-md">
                        Click Here To Pay With Card
                      </Link>
                      <p className="mt-5 font-bold">
                        Or Make a Direct Deposit/Transfer to the Accounts below:
                      </p>
                      <p className="my-5">
                        Account Details: Account Number: 1027147237 <br />
                        Account Name: NXG HUB DIGITAL TECHNOLOGIES LTD, Bank:
                        UBA
                      </p>
                      <p className="my-5">
                        DOM Account Details(USD): Account Number: 3004434567{" "}
                        <br />
                        Account Name: NXG HUB DIGITAL TECHNOLOGIES LTD, Bank:
                        UBA
                      </p>
                      <p className="my-5">
                        DOM Account Details(GBP): Account Number: 3004434718{" "}
                        <br />
                        Account Name: NXG HUB DIGITAL TECHNOLOGIES LTD, Bank:
                        UBA
                      </p>
                      <p className="my-5">
                        Account Details: Account Number: 5610096099 <br />
                        Account Name: NXG-HUB DIGITAL TECHNOLOGIES LTD, Bank:
                        FIDELITY BANK *
                      </p>
                    </article>
                    <div className="w-[90%] md:w-[90%] m-auto mt-4">
                      <label
                        className="font-bold block"
                        htmlFor="paymentReceipt">
                        Upload Payment paymentReceipt
                      </label>
                      <input
                        id="paymentReceipt"
                        name="paymentReceipt"
                        type="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("paymentReceipt", file);
                        }}
                      />
                      <ErrorMessage
                        className="text-red-500"
                        name="paymentReceipt"
                        component="div"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[40%] md:w-[30%] m-auto">
                  <button
                    disabled={isSubmitting}
                    className="w-[100%] rounded-full text-center py-2 my-10 text-white font-bold m-auto bg-[#006A90]"
                    type="submit">
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* modal */}
      <PostJobModal />
    </div>
  );
};

export default PostJobForm;
