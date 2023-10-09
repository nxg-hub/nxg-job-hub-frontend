import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.scss"
const Agent = () => {
  
  useEffect(() => {
    let currentTab = 0; // Current tab index
    const tabs = document.querySelectorAll('.tab');
  
    // Function to hide all tabs
    function hideTabs() {
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = 'none';
        }
    }
  
    // Function to show the next tab
    function showNextTab() {
        // Hide all tabs
        hideTabs();
  
        // If we have reached the end of the tabs, submit the form
        if (currentTab >= tabs.length - 1) {
            document.querySelector('form').submit();
            return;
        }
  
        // Show the next tab with the "tab" class
        currentTab++;
        tabs[currentTab].style.display = 'block';
  
        // Hide the "Next" button if we are on the last tab
        if (currentTab >= tabs.length - 1) {
            document.querySelector('.next-button').style.display = 'none';
        }
    }

    // Initially, hide all tabs except the first one
   
        hideTabs();
        tabs[currentTab].style.display = 'block'; // Show the first tab
  })
  return (
    <div className="container">
      <form className="centralized-form" enctype="multipart/form-data">
        <div className="tab show">
          <h2>Create an Agent Account (1/2)</h2>
          <div className="form-row">
            <div className="form-col">
              <div className="  ">
                <label>First Name*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
            <div className="form-col">
              <div className="">
                <label>Last Name*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              name=""
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-group">
            <div className="password-container">
              <label>Create Password*</label>
              <input type="password" id="password" placeholder="Password" />
              <span style={{ marginTop: "8px" }} className="toggle-password">
                &#128065;
              </span>
            </div>
          </div>
          <div className="form-group">
            <div className="password-container">
              <label>Re-enter Password*</label>
              <input type="password" id="password" placeholder="Password" />
              <span style={{ marginTop: "8px" }} className="toggle-password">
                &#128065;
              </span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <div className="  ">
                <label>Nationality*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
            <div className="form-col">
              <div className="">
                <label>State/District*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Residential Address</label>
            <input type="text" name="" placeholder="" />
          </div>
          <div className="form-group">
            <label>Date of birth</label>
            <input type="date" placeholder="" name="" />
          </div>

          <div className="form-row">
            <div className="form-col">
              <div className="">
                <label>Gender*</label>
                <br />
                <input type="radio" id="male" name="" value="Male" />
                <label className="radio">Male</label>
                <br />
                <input type="radio" id="female" name="" value="Female" />
                <label className="radio">Female</label>
                <br />
                <input
                  type="radio"
                  id="N/A"
                  name=""
                  value="prefer not to say"
                />
                <label className="radio">Prefer not to say</label>
                <br />
              </div>
            </div>
          </div>
          <div className="label-container"></div>

          <div className="form-row">
            <div className="form-col01">
              <div className="  ">
                <span>Phone </span>
                <select name="" id="" style={{ borderRadius: "5px 0 0 5px" }}>
                  <option value="">+234</option>
                </select>
              </div>
            </div>
            <div className="form-col02">
              <div className="">
                <span style={{ marginLeft: "-15px;" }}>number*</span>
                <input
                  type="text"
                  style={{ borderRadius: "0 5px 5px 0" }}
                  name=""
                  required
                />
              </div>
            </div>
            <div className="form-col03">
              <div className="">
                <span>Zip code</span>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
          </div>
          <p
            style={{
              marginTop: "-10px",
              fontSize: "12px",
              fontWeight: 200,
              color: "#ccc",
            }}
          >
            We will send an OTP code to this number for validation{" "}
          </p>
        </div>
        <div className="tab">
          <h4>OTP VERIFICATION</h4>
          <h4>Please enter the one-time password to verify your account</h4>
          <div className="input-row">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </div>
          <button className="code-button" type="submit">
            Verify OTP Code
          </button>
          <h4>Resend One-Time Password</h4>
        </div>
        <div className="tab">
          <h2>Create an Agent Account (2/2)</h2>
          <div className="form-group">
            <label>Current Job Function</label>
            <select name="" id="" style={{ color: "#ccc", fontSize: "12px;" }}>
              <option value="">Select new job interest</option>
            </select>
          </div>
          <div className="form-row">
            <div className="form-col">
              <div className="">
                <label>Job Experience Level</label>
                <br />
                <input
                  type="radio"
                  id="internship"
                  name=""
                  value="internship"
                />
                <label className="radio">Internship</label>
                <br />
                <input
                  type="radio"
                  id="entry_level"
                  name=""
                  value="entry_level"
                />
                <label className="radio">Entry Level</label>
                <br />
                <input type="radio" id="mid_level" name="" value="mid_level" />
                <label className="radio">Mid Level</label>
                <br />
                <input
                  type="radio"
                  id="mid_senior_level"
                  name=""
                  value="mid_senior_level"
                />
                <label className="radio">Mid Senior Level</label>
                <br />
                <input type="radio" id="director" name="" value="director" />
                <label className="radio">Director</label>
                <br />
                <input type="radio" id="executive" name="" value="executive" />
                <label className="radio">Executive</label>
                <br />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <div className="">
                <label>Type of Tech Job</label>
                <br />
                <input type="radio" id="part-time" name="" value="part-time" />
                <label className="radio">Part-time</label>
                <br />
                <input type="radio" id="contract" name="" value="contract" />
                <label className="radio">Contract</label>
                <br />
                <input type="radio" id="full-time" name="" value="full-time" />
                <label className="radio">Full-time</label>
                <br />
                <input type="radio" id="volunteer" name="" value="volunteer" />
                <label className="radio">Volunteer</label>
                <br />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-col">
              <div className="">
                <label>Preferred Work Mode</label>
                <br />
                <input
                  type="radio"
                  id="fully-remote"
                  name=""
                  value="fully-remote"
                />
                <label className="radio">Fully-Remote</label>
                <br />
                <input type="radio" id="hybrid" name="" value="hybrid" />
                <label className="radio">Hybrid</label>
                <br />
                <input type="radio" id="on-site" name="" value="on-site" />
                <label className="radio">On-site</label>
                <br />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Upload a Profile Picture</label>
            <div className="container1">
              <div className="drag-area">
                <div className="icon">
                  <i className="bx bxs-file-find"></i>
                </div>
                <b>
                  <span className="header">Browse Files</span>
                </b>
                <br />
                <span className="header">Drag and drop file here</span>
              </div>
            </div>
          </div>
          <div
            className="form-group"
            style={{textAlign: "center", marginTop: "60px", marginLeft: "50px"}}
          >
            <input type="checkbox" />
            <label for="">
              I agree to the <span className="change-color">Terms</span>
              and <span className="change-color">Conditions</span>{" "}
            </label>
          </div>
          <button className="create-button" type="submit">
            Create Account
          </button>
          <div
            className="form-group"
            style={{textAlign: "center", marginTop: "10px", marginLeft: "10px"}}
          >
            <p>
              Already have an account? <Link to="">Log In</Link>
            </p>
          </div>
        </div>

        <button className="next-button" type="button" onclick="showNextTab()">
          Next
        </button>
      </form>
    </div>
  );
};

export default Agent;
