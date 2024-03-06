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
  // Destructure localStorage data with default values to avoid potential issues
  const authKey =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey ||
    "Bearer " + searchParams.get("authKey");
  // setSearchParams("")

  let localStore =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    {};
  if (authKey) {
    localStore = { ...localStore, authKey };
    window.localStorage.setItem(
      "NXGJOBHUBLOGINKEYV1",
      JSON.stringify(localStore)
    );
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
