import React, { useState, useEffect } from "react";
import avater from "../../../../static/images/user.png";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";

const JobApplication = () => {
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [noApp, setNoApp] = useState(false);
  const [app, setApp] = useState([]);
  // const {
  //   data: MyApplication,
  //   // loading,
  //   // error,
  // } = useApiRequest("/api/v1/tech-talent/my-applications");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!token.authKey) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${API_HOST_URL}/api/v1/tech-talent/my-applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.authKey,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setApp(data?.content);
          setLoading(false);
        })

        .catch((error) => {
          setError(true);
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="">
      {loading ? (
        <p className="loading">Loading jobs...</p>
      ) : !loading && error ? (
        <div className="error-message mt-5 text-center">
          <h2>Something went wrong, check internet connection.</h2>
        </div>
      ) : (
        <>
          <div className="jobresults grid lg:grid-cols-3 grid-cols-2 gap-4 p-[20px] lg:gap-7 lg:p-[70px]">
            {app.length > 0 ? (
              app?.map((data) => (
                <div
                  className="job-Post bg-white rounded shadow-md p-4 flex flex-col items-start lg:px-[30px] px-[10px] py-[8px] lg:py-[20px]"
                  key={data.id}>
                  <div className="employerimg flex items-center mb-4">
                    <div className="userimg mr-4">
                      <img
                        className="w-[50px] h-[50px]"
                        src={data?.jobPosting?.employer_profile_pic || avater}
                        alt=""
                      />
                    </div>
                    <div className="employerdetails">
                      <h4 className="name text-lg font-bold">
                        <b>
                          {data?.jobPosting?.employer_name || "Kristy Haag"}
                        </b>
                      </h4>
                      <h2>Employer</h2>
                    </div>
                  </div>
                  <div className="detail flex flex-col justify-between">
                    <div className="job-Details">
                      <h3>
                        <b>Job Category:</b> {data?.jobPosting?.job_title}
                      </h3>
                      <h3>
                        <b>Budget:</b> {data?.jobPosting?.salary}
                      </h3>
                      <h3 className="">
                        <b>Application Status:</b>
                        <span>{data?.applicationStatus}</span>
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center mt-6 font-bold">
                You do not any applications at the moment
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default JobApplication;
