import s from "./index.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import RadioButton from "../RadioButton";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../static/images/logo_colored.png";
import axios from "axios";
import Notice from "../Notice";
import { API_HOST_URL } from "../../utils/api/API_HOST";

const SelectAccountType = () => {
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
    console.log(error.data)
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
  const accountTypes = {
    techtalent: `${API_HOST_URL}/api/v1/tech-talent/register/`,
    agent: `${API_HOST_URL}/api/agents/createAgent`,
    employer: `${API_HOST_URL}/api/employers/createEmployer`,
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setAccountChoice(value);
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
    <>
      <div className={s.page}>
        <nav className={s.navBar}>
          <img src={Logo} alt="" />
        </nav>
        <div className={s.main}>
          <div className={s.AccountChoiceModularWrapper}>
            <h2>Join our community of professionals</h2>
            <p>Select an account type that suits you.</p>

            <Link to="/login" title="Close">
              {" "}
              <AiOutlineClose />{" "}
            </Link>
            <div className={s.AccountChoiceModular}>
              <RadioButton
                label={"I'm a tech talent"}
                value={"techtalent"}
                id={"techtalent"}
                name={"account_choice"}
                onchange={handleChange}
              />
              <RadioButton
                label={"I'm an employer"}
                value={"employer"}
                id={"employer"}
                name={"account_choice"}
                onchange={handleChange}
              />
              <RadioButton
                label={"I'm an agent"}
                value={"agent"}
                id={"agent"}
                name={"account_choice"}
                onchange={handleChange}
              />
            </div>
            <button
              className={s.ContinueButton}
              onClick={setAccountType}
              style={{
                backgroundColor: accountChoice
                  ? "#2596be"
                  : "rgb(194, 192, 192)",
              }}
              aria-disabled={!accountChoice}
              disabled={!accountChoice}
              to={`./${accountChoice}`}
            >
              Continue
            </button>
            <p>
              Already have an account? <Link to={"/login"}> Log in </Link>
            </p>
          </div>
        </div>
      </div>
      {popup && <Notice type={popup.type} message={popup.message} />}
    </>
  );
};

export default SelectAccountType;
