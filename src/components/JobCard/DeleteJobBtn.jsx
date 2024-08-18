import React, { useState } from "react";
import { API_HOST_URL } from "../../utils/api/API_HOST";

const DeleteJobBtn = ({ jobID }) => {
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const handleDelete = async () => {
    try {
      setLoading(true);
      return await fetch(`${API_HOST_URL}/api/job-postings/delete/${jobID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.authKey,
        },
      })
        .then((res) => {
          res.status === 204
            ? setConfirm(false) && setSuccess(true) && setLoading(false)
            : setError(true);
          return res.json();
        })
        .then((data) => {
          setConfirm(false);

          return data;
        });
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  const confirmDelete = () => {
    setConfirm(true);
  };
  //   console.log(error, success, confirm);
  return (
    <>
      <button onClick={confirmDelete} className="!bg-red-600 min-w-[200px]">
        Delete Job
      </button>
      {confirm && (
        <>
          <div className="z-30 bg-white w-[90%] md:!w-[60%] m-auto h-[200px] absolute right-[5%] top-[25%] md:right-[25%] rounded-lg ">
            <div className="w-[80%] m-auto">
              <h2 className="text-center font-bold text-xl md:text-2xl mt-5 capitalize">
                {loading
                  ? "Deleting...."
                  : "Are you sure you want to delete this job?"}
              </h2>
            </div>
            <span className="w-[80%] m-auto flex gap-5 justify-center mt-11 pb-3">
              <button onClick={handleDelete} className="w-[40%] md:!w-[20%]">
                Yes
              </button>
              <button
                onClick={() => {
                  setConfirm(false);
                }}
                className="w-[40%] md:!w-[20%]">
                No
              </button>
            </span>
          </div>
          <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
        </>
      )}
    </>
  );
};

export default DeleteJobBtn;
