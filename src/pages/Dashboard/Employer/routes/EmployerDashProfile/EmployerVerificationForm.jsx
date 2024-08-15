import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import FileUploader from "../../../../../components/accounts/FileUploader";
import { Dialog } from "@headlessui/react";
import Confetti from "../../../../../static/icons/ConfettiBall.svg?react";
import Spinner from "../../../../../assets/svg/spinner.svg?.react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_HOST_URL } from "../../../../../utils/api/API_HOST";
import { useVerification } from "./VerificationContext";

const EmployerVerificationForm = ({ onVerificationSuccess }) => {
  const { setVerificationStatus } = useVerification();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    CACCertificate: "",
    taxClearanceCertificate: "",
    companyMemorandum: "",
    TIN: "",
    namesOfDirectors: [],
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const [errors, setErrors] = useState("");
  // console.log(errors);
  const handleValue = (e, name) => {
    const { value } = e.target;
    const updatedValue =
      name === "namesOfDirectors"
        ? value.split("\n").filter((name) => name.trim() !== "")
        : value;
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const onFileChange = (files, name) => {
    setFormData({
      ...formData,
      [name]: files,
    });
    console.log(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.CACCertificate ||
      !formData.taxClearanceCertificate ||
      !formData.companyMemorandum || !formData.namesOfDirectors.length === 0
    ) {
      setErrors("Fill out the required field");
      setLoading(false);
      return;
    } else {
      setErrors("")
      try {
        setLoading(true);
        const loginKey =
          window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
          window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

        if (!loginKey) {
          console.error("Authentication key not available.");
          setLoading(false);
          return;
        }

        let authKey;
        try {
          authKey = JSON.parse(loginKey).authKey;
        } catch (error) {
          console.error("Error parsing authentication key:", error);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_HOST_URL}/api/employers/get-employer`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: authKey,
            },
          }
        );

        const employerId = response.data.employerID;

        const res = await axios.put(
          `${API_HOST_URL}/api/employers/${employerId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: authKey,
            },
          }
        );

        // Reset errors and navigate on successful submission
        setErrors("");
        // Call onVerificationSuccess if it's a function
        if (typeof onVerificationSuccess === "function") {
          onVerificationSuccess();
        }
        setIsOpen(true);
        setVerificationStatus(true);
        console.log("Response Data:", res.data);
      } catch (error) {
        console.log(
          "Error posting data:",
          error.response ? error.response.data : error
        );
        setErrors("Unable to update user data.");
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <BsArrowLeft className="verify-arrow" onClick={handleBack} />
      <div className="verifiedForm-main">
        <h2>
          Verify Your Account To Enjoy All Our Services And Make New Recruits
          Without Any Restrictions To Your Account!
        </h2>
        <form className="verified-section" onSubmit={handleSubmit}>
     
          <div className="tech-pro-form">
            <FileUploader
              title="Upload CAC Certificate*"
              onFileChange={(files) => onFileChange(files, "CACCertificate")}
            />
          </div>
          <div className="tech-pro-form">
            <FileUploader
              title="Upload Tax Clearance Certificate*"
              onFileChange={(files) =>
                onFileChange(files, "taxClearanceCertificate")
              }
            />
          </div>
          <div className="tech-pro-form">
            <FileUploader
              title="Upload Company Memorandum  Certificate*"
              onFileChange={(files) => onFileChange(files, "companyMemorandum")}
            />
          </div>
          <div className="my-profile-bio">
            <label>Company Tax Identification Number</label>
            <input
              type="text"
              value={formData.TIN}
              onChange={(e) => handleValue(e, "TIN")}
            />
          </div>
          <div className="my-profile-bio">
            <label>List The Names Of Your Company Directors</label>
            <textarea
              cols="10"
              rows="10"
              value={formData.namesOfDirectors.join("\n")}
              onChange={(e) => handleValue(e, "namesOfDirectors")}
            ></textarea>
          </div>
          {errors && (
            <span
            className="text-base text-[#dd3737]"
            >
              {errors}
            </span>
          )}
          <div className="verified-btn">
            {/* <button type='submit'>Verify Account</button> */}
            <button type="submit" disabled={loading} className="flex items-center justify-center mx-auto">
              {loading ? <img src={Spinner} className="w-[30px]" alt="loading" /> : "Verify Account"}
            </button>
          </div>
        </form>
      </div>
      {isOpen && (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              height: "100vh",
              paddingTop: "4%",
            }}
          >
            <Dialog.Panel
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "584px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "30px",
                margin: "auto",
              }}
            >
              <Dialog.Title
                style={{
                  fontFamily: "Manrope",
                  margin: "2rem 0",
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                <div className="veri-modal flex flex-col justify-center items-center">
                  <h2>Verification Successful</h2>
                  <Confetti />
                  <p
                    style={{
                      fontSize: "22px",
                      fontWeight: "500",
                      lineHeight: "30.05px",
                      margin: "1rem 0",
                      width: "100%",
                      maxWidth: "500px",
                    }}
                  >
                    Congratulations your account has been verified successfully.
                  </p>
                </div>
                <div className="veri-modalBtn">
                  <Link
                    style={{
                      background: "#006A90",
                      padding: "10px",
                      display: "block",
                      color: "#ffffff",
                      borderRadius: "0.6rem",
                      textAlign: "center",
                      fontSize: "1rem",
                      fontWeight: "400",
                    }}
                    to={"/dashboard"}
                  >
                    Back To Dashboard
                  </Link>
                </div>
              </Dialog.Title>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default EmployerVerificationForm;
