import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../static/images/logo_colored.png";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import NXGRadioButtonGroup from "../../components/ui/nxgradiogroup";
import Notice from "../../components/Notice";
import { AiOutlineClose } from "react-icons/ai";

const SelectProfession = () => {
  const navigate = useNavigate();
  const [popup, showPopup] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get authkey from sources
  const authKey =
    // authkey from url
    (searchParams.get("authKey")
      ? "Bearer " + searchParams.get("authKey")
      : null) ||
    // authkey from sessionstorage
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey ||
    // authkey from localstorage
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey;

  let localStore =
    // retrieve already stored data from localstorage
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    {};

  const checkForUserTypeAndRedirect = async (auth) => {
    if (localStore) {
      try {
        const res = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
          headers: {
            "Content-Type": "application/json",
            authorization: auth,
          },
        });

        if (!res.data.userType) {
          return;
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error.data);
        navigate("/login");
      }
    }
  };

  if (authKey) {
    localStore = { ...localStore, authKey };
    // store in session to prevent expiry
    window.sessionStorage.setItem(
      "NXGJOBHUBLOGINKEYV1",
      JSON.stringify(localStore)
    );
    checkForUserTypeAndRedirect(authKey);
  } else {
    navigate("/login");
  }

  const [accountChoice, setAccountChoice] = useState("");

  const accountRadios = [
    { label: "Tech Talent", value: "techtalent" },
    { label: "Agent", value: "agent" },
    { label: "Employer", value: "employer" },
  ];

  const accountTypes = {
    techtalent: `${API_HOST_URL}/api/v1/tech-talent/register/`,
    agent: `${API_HOST_URL}/api/agents/createAgent`,
    employer: `${API_HOST_URL}/api/employers/createEmployer`,
  };

  const setAccountType = async () => {
    try {
      showPopup({
        type: "info",
        message: `Creating ${accountChoice} account...`,
      });
      await axios.post(
        accountTypes[accountChoice],
        {},
        {
          headers: {
            authorization: authKey,
            "Content-Type": "application/json",
          },
        }
      );
      showPopup({
        type: "success",
        message: `Created ${accountChoice} account successfully`,
      });
      // Updated the condition to navigate to the appropriate page based on the accountChoice
      navigate(accountChoice === "employer" ? "/profilelanding" : "/dashboard");
    } catch (err) {
      console.log(err);
      showPopup({
        type: "danger",
        message: `Account creation failed. Please try again.`,
      });
      setTimeout(() => showPopup(undefined), 5000);
    }
  };

  useEffect(() => {
    setSearchParams("");
  }, [setSearchParams]);

  return (
    <div className="flex flex-col space-y-10">
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <img
          className="w-1/12"
          src={Logo}
          alt=""
        />
        <Link
          className="self-end sm:hidden text-white sm:mr-5 sm:mt-5"
          to="/login"
          title="Close">
          {" "}
          <AiOutlineClose />{" "}
        </Link>
      </nav>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center w-full min-h-screen rounded-b-lg shadow-md sm:space-y-10 sm:w-[700px]">
          <Link
            className="hidden self-end sm:block sm:mr-5 sm:mt-5"
            to="/login"
            title="Close">
            {" "}
            <AiOutlineClose />{" "}
          </Link>
          <div
            className="flex flex-col items-center w-full sm:w-10/12 sm:p-6 sm:border sm:border-sky-400 
              sm:rounded-md">
            <div className="flex flex-col items-center mb-20 sm:mb-10">
              <h1 className="font-semibold text-2xl">
                Join our community of professionals
              </h1>
              <p className="text-base text-slate-500">
                Get started and connect with professionals!
              </p>
            </div>
            <NXGRadioButtonGroup
              radios={accountRadios}
              name="role"
              selectedRadio={accountChoice}
              onChange={setAccountChoice}
              className="space-y-4 mb-10"></NXGRadioButtonGroup>
            <button
              className={
                accountChoice === ""
                  ? "w-2/3 bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed"
                  : "w-2/3 bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer"
              }
              onClick={setAccountType}
              aria-disabled={!accountChoice}
              disabled={!accountChoice}
              to={`./${accountChoice}`}>
              Continue
            </button>
            <p>
              Already have an account?{" "}
              <Link
                className="text-sky-600"
                to={"/login"}>
                {" "}
                Log in{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
      {popup && (
        <Notice
          type={popup.type}
          message={popup.message}
        />
      )}
    </div>
  );
};

export default SelectProfession;
