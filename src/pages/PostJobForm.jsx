import React from "react";
import logo from "../static/images/nxg-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jobTypes } from "../utils/data/jobTypes";
import { jobLocations } from "../utils/data/jobLocations";
import Header from "../components/header/Header";
import {
  companyIndusrty,
  employerJobType,
  industry,
} from "../utils/data/employer";
import PostJobModal from "../components/Modal/PostJobModal";
// import axios from "axios";

const PostJobForm = () => {
  const validationSchemas = Yup.object().shape({
    job_title: Yup.string().required("Required"),
    company_bio: Yup.string()
      .min(20, "Company bio must have at least 20 characters")
      .required("Required"),
    job_description: Yup.string()
      .min(20, "job description must have at least 20 characters")

      .required("Required"),
    deadline: Yup.string().required("Required"),
    requirements: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
    job_location: Yup.string().required("Required"),
    tags: Yup.string().required("Required"),
    logo: Yup.mixed()
      .required("A file is required")
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 5048576; // 5MB limit
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return value && ["image/jpeg", "image/png"].includes(value.type);
      }),
    job_mode: Yup.string().required("Required"),
    job_type: Yup.string().required("Required"),
    employer_name: Yup.string().required("Required"),
    industry: Yup.string().required("Required"),
    regNum: Yup.string().required("Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    receipt: Yup.mixed()
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

  const handleChange = async (e, setFieldValue, field) => {
    const { value } = e.target;

    setFieldValue(field, value); // Update Formik's state
  };
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const initialValues = {
    job_title: "",
    company_bio: "",
    job_description: "",
    deadline: "",
    requirements: "",
    salary: "",
    job_location: "",
    tags: "",
    job_mode: "",
    job_type: "",
    logo: "",
    employer_name: "",
    industry: "",
    regNum: "",
    webUrl: "",
    email: "",
    phoneNumber: "",
    address: "",
    receipt: "",
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
                    <label className="font-bold" htmlFor="job_title">
                      Job Title
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="job_title"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="job_title"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="job_description">
                      Job Description
                    </label>
                    <Field
                      as="textarea"
                      className="h-[200px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="job_description"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="job_description"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="requirements">
                      Requirements
                    </label>
                    <Field
                      as="textarea"
                      className="h-[200px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="requirements"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="requirements"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col w-[90%] md:w-[70%] m-auto mt-4">
                    <label className="font-bold" htmlFor="job_type">
                      Job Type
                    </label>

                    <select
                      className="bg-primary py-4 px-2 rounded-lg"
                      required
                      id="job_type"
                      name="job_type"
                      onChange={(e) =>
                        handleChange(e, setFieldValue, "job_type", values)
                      }>
                      {employerJobType.map(({ id, title }) => (
                        <option key={id} className="block mt-2">
                          {title}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      className="text-red-500"
                      name="job_type"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col w-[90%] md:w-[70%] m-auto mt-4">
                    <label className="font-bold" htmlFor="job_mode">
                      Job Mode
                    </label>

                    <select
                      className="bg-primary py-4 px-2 rounded-lg"
                      name="job_mode"
                      onChange={(e) =>
                        handleChange(e, setFieldValue, "job_mode", values)
                      }>
                      {jobLocations.map(({ id, value }) => (
                        <option key={id} className="block mt-2">
                          {value}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      className="text-red-500"
                      name="job_mode"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="job_location">
                      Job Location
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="job_location"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="job_location"
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
                      id="logo"
                      name="logo"
                      type="file"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("logo", file);
                      }}
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="logo"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="company_bio">
                      Company Bio
                    </label>
                    <Field
                      as="textarea"
                      className="h-[200px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="company_bio"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="company_bio"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="employer_name">
                      Company Name
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="employer_name"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="employer_name"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="regNum">
                      CAC REG. NO:
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="regNum"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="regNum"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="webUrl">
                      Website
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="webUrl"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="webUrl"
                      component="div"
                    />
                  </div>

                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="phoneNumber">
                      Phone Contact
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="number"
                      name="phoneNumber"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="phoneNumber"
                      component="div"
                    />
                  </div>
                  <div className="block w-[90%] md:w-[70%] m-auto mt-4  ">
                    <label className="font-bold" htmlFor="email">
                      Email Contact
                    </label>
                    <Field
                      className="h-[50px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="email"
                      name="email"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="email"
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
                    <label className="font-bold" htmlFor="address">
                      Company Address
                    </label>
                    <Field
                      as="textarea"
                      className="h-[150px] px-3 pt-3 w-[100%] m-auto rounded-lg border-none border-b-4 border-b-darkGray outline-none"
                      type="text"
                      name="address"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="address"
                      component="div"
                    />
                  </div>
                </div>
                <div className="border-2 border-black mt-8 rounded-2xl w-[90%] m-auto pb-5">
                  <div className=" w-[90%] md:w-[70%] m-auto mt-4 outline-none bg-primary rounded-lg py-4">
                    <article className="md:w-[90%] m-auto">
                      <p className="mb-5 font-bold">Choose Payment Mode</p>

                      <Link
                        to="https://paystack.com/pay/nxg-reg"
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
                      <label className="font-bold block" htmlFor="receipt">
                        Upload Payment Receipt
                      </label>
                      <input
                        id="receipt"
                        name="receipt"
                        type="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("receipt", file);
                        }}
                      />
                      <ErrorMessage
                        className="text-red-500"
                        name="receipt"
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
                    {"Submit"}
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
