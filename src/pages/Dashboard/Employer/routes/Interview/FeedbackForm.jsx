import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextArea from "./MyTextArea";
import MyInput from "./MyInput";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_HOST_URL } from "../../../../../utils/api/API_HOST";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import { status } from "../../../../../utils/data/interviewMode";
const FeedbackForm = ({ accepted }) => {
  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  const employerID = loggedInUser.employerID;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const setUpInterview = async (url, formData) => {
    try {
      setLoading(true);
      await axios
        .post(url, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        })
        .then(function (response) {
          response.status === 200 ? setSuccess(true) : null;
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[80%] bg-blue-100 m-auto py-6 md:w-[70%] z-50 relative md:right-[5%] bottom-[600px] rounded-2xl">
      <h2 className="capitalize text-center font-bold md:text-3xl mb-4">
        feedback!!
      </h2>
      {!success && !error && (
        <Formik
          initialValues={{
            recommendation: "",
            interviewDate: "",
            observation: "",
            employmentStatus: "",
            employerId: `${employerID}`,
            jobTitle: ``,
          }}
          validationSchema={Yup.object({
            observation: Yup.string().required("Required"),
            recommendation: Yup.string().required("Required"),
            interviewDate: Yup.string().required("Required"),
            employmentStatus: Yup.string().required("Required"),
            employerId: Yup.string().required("Required"),
            jobTitle: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setUpInterview(
              `${API_HOST_URL}/api/employer-feedback/submit-feedback`,
              values
            );
          }}>
          {(props) => (
            <Form>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyTextArea
                  label=" Recommendation :"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="text"
                  name="recommendation"
                  value={props.values.recommendation}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyTextArea
                  className="w-full h-[50px] pl-2 rounded-2xl bg-white border"
                  label="Observation:"
                  type="text"
                  name="observation"
                  value={props.values.observation}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label="Job Title"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="text"
                  name="jobTitle"
                  value={props.values.jobTitle}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label="Interview Date:"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="date"
                  name="interviewDate"
                  value={props.values.interviewDate}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <MyInput
                  label="ID:"
                  className="w-full h-[50px] rounded-2xl bg-white border pl-3"
                  type="text"
                  name="employerId"
                  value={props.values.employerId}
                  onChange={props.handleChange}
                />
              </div>
              <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
                <label className="block ">Employment Status</label>
                <select
                  className="w-full h-[50px] bg-white border rounded-2xl"
                  required
                  id={"employmentStatus"}
                  name="employmentStatus"
                  value={props.values.employmentStatus}
                  onChange={props.handleChange}>
                  {status.map(({ id, value, title }) => (
                    <option value={value} key={id}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-[50%] m-auto mt-5">
                <button
                  type="submit"
                  className="bg-blue-400 m-auto text-white h-[30px] md:h-[40px] w-full font-bold  text-center rounded-2xl ">
                  {loading ? "submitting..." : "submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {success && (
        <div className="w-[90%] m-auto h-[200px] bg-transparent border border-green-500 rounded-2xl">
          <h2 className="capitalize md:text-2xl text-center pt-[80px] ">
            Feed Back sent <span className="font-bold">Successfully.</span>
          </h2>
          <p className="text-center mt-3">Thank you for your feedback.</p>
        </div>
      )}
      {error && (
        <div className="w-[90%] m-auto h-[200px] bg-transparent border border-green-500 rounded-2xl">
          <h2 className="capitalize md:text-2xl text-center pt-[80px] ">
            something went wrong,
            <br />
            Check internet connection and try again.
          </h2>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
