import { useField } from "formik";
import React from "react";

const MyTextArea = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="block w-[100%] m-auto ">
      <label className="md:text-2xl font-bold" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        className={`bg-[#2596BE20] w-full rounded-lg h-[150px] `}
        {...field}
        {...props}>
        {value}
      </textarea>
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextArea;
