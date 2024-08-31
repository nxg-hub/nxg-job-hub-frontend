import { useField } from "formik";
import React from "react";

const MyInput = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="block w-[100%] m-auto ">
      <label className="md:text-2xl font-bold" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={`bg-white border w-full rounded-lg h-[150px] `}
        {...field}
        {...props}
        {...value}
      />

      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyInput;
