import React, { useState } from "react";
import { interviewMode } from "../../../../../utils/data/interviewMode";
import TextArea from "../../../../../components/TextArea";

const InterviewForm = ({ accepted }) => {
  const allEmails = accepted[0]?.applicant.email;
  //   console.log(allEmails);
  const data = {
    email: "",
    description: "",
    title: "",
    interview_mode: "",
    location: "",
    time: "",
    date: "",
  };
  const [emailErr, setEmailErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [titleErr, setTitleErr] = useState(false);
  const [modeErr, setModeErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [timeErr, setTimeErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, we'll add the code to post the form data using Axios

    console.log(formData);
  };
  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={{ name: "jared" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
    // <form className=" w-[90%] md:w-[80%] m-auto bg-white py-5 rounded-md">
    //   <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
    //     <label className="block font-bold md:text-2xl ">
    //       Applicant Email :
    //     </label>
    //     <input
    //       className="w-full h-[50px] rounded-2xl bg-blue-100 pl-2"
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //     />
    //     {emailErr && <h2 className="text-red-500">required</h2>}
    //   </div>

    //   <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
    //     <label className="block font-bold md:text-2xl ">Email Title :</label>
    //     <input
    //       className="w-full h-[50px] rounded-2xl bg-blue-100 pl-3"
    //       type="text"
    //       name="title"
    //       value={formData.title}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
    //     <label className="block font-bold md:text-2xl ">Description :</label>
    //     <TextArea
    //       textAreaProps={{
    //         required: true,
    //       }}
    //       className="w-full h-[200px] pl-2 rounded-2xl bg-blue-100"
    //       type="text"
    //       name="description"
    //       value={formData.description}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
    //     <label className="block font-bold md:text-2xl ">Interview Mode</label>
    //     <select
    //       className="w-full h-[50px] bg-blue-100 rounded-2xl"
    //       required
    //       id={"interview_mode"}
    //       name={"interview_mode"}
    //       value={formData.interview_mode}
    //       onChange={handleChange}
    //       //   err={formErrors.job_mode}
    //     >
    //       {interviewMode.map(({ id, value, title }) => (
    //         <option value={value} key={id}>
    //           {title}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //   {/* SHow field for interview location if onsite is selected */}
    //   {formData.interview_mode === "onsite" && (
    //     <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
    //       <label className="block font-bold md:text-2xl ">
    //         Interview Location :
    //       </label>
    //       <textarea
    //         className="w-full h-[50px] pl-2 rounded-2xl bg-blue-100"
    //         type="text"
    //         name="location"
    //         value={formData.location}
    //         onChange={handleChange}
    //       />
    //     </div>
    //   )}
    //   <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
    //     <label className="block font-bold md:text-2xl  ">
    //       Interview Time :
    //     </label>
    //     <input
    //       className="w-full h-[50px] rounded-2xl bg-blue-100 pl-3"
    //       type="time"
    //       name="time"
    //       value={formData.time}
    //       onChange={handleChange}
    //     />
    //   </div>

    //   <div className=" w-[90%] md:w-[60%] m-auto space-y-2">
    //     <label className="block font-bold md:text-2xl ">Interview Date :</label>
    //     <input
    //       className="w-full h-[50px] rounded-2xl bg-blue-100 pl-3"
    //       type="date"
    //       name="date"
    //       value={formData.date}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className="w-[50%] m-auto mt-5">
    //     <button
    //       type="submit"
    //       onClick={handleSubmit}
    //       className="bg-blue-400 m-auto text-white h-[30px] md:h-[40px] w-full font-bold  text-center rounded-2xl ">
    //       Submit
    //     </button>
    //   </div>
    // </form>
  );
};

export default InterviewForm;
