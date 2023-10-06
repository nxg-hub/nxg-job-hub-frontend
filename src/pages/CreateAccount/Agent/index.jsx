import React from "react";
import { Link } from "react-router-dom";

const Agent = () => {
  return (
    <div class="container">
      <form class="centralized-form" enctype="multipart/form-data">
        <div class="tab show">
          <h2>Create an Agent Account (1/2)</h2>
          <div class="form-row">
            <div class="form-col">
              <div class="  ">
                <label>First Name*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
            <div class="form-col">
              <div class="">
                <label>Last Name*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Email*</label>
            <input
              type="email"
              name=""
              placeholder="Enter your email address"
              required
            />
          </div>
          <div class="form-group">
            <div class="password-container">
              <label>Create Password*</label>
              <input type="password" id="password" placeholder="Password" />
              <span style={{ marginTop: "8px" }} class="toggle-password">
                &#128065;
              </span>
            </div>
          </div>
          <div class="form-group">
            <div class="password-container">
              <label>Re-enter Password*</label>
              <input type="password" id="password" placeholder="Password" />
              <span style={{ marginTop: "8px" }} class="toggle-password">
                &#128065;
              </span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-col">
              <div class="  ">
                <label>Nationality*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
            <div class="form-col">
              <div class="">
                <label>State/District*</label>
                <input type="text" placeholder="" name="" required />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Residential Address</label>
            <input type="text" name="" placeholder="" />
          </div>
          <div class="form-group">
            <label>Date of birth</label>
            <input type="date" placeholder="" name="" />
          </div>

          <div class="form-row">
            <div class="form-col">
              <div class="">
                <label>Gender*</label>
                <br />
                <input type="radio" id="male" name="" value="Male" />
                <label class="radio">Male</label>
                <br />
                <input type="radio" id="female" name="" value="Female" />
                <label class="radio">Female</label>
                <br />
                <input
                  type="radio"
                  id="N/A"
                  name=""
                  value="prefer not to say"
                />
                <label class="radio">Prefer not to say</label>
                <br />
              </div>
            </div>
          </div>
          <div class="label-container"></div>

          <div class="form-row">
            <div class="form-col01">
              <div class="  ">
                <span>Phone </span>
                <select name="" id="" style={{ borderRadius: "5px 0 0 5px" }}>
                  <option value="">+234</option>
                </select>
              </div>
            </div>
            <div class="form-col02">
              <div class="">
                <span style={{ marginLeft: "-15px;" }}>number*</span>
                <input
                  type="text"
                  style={{ borderRadius: "0 5px 5px 0" }}
                  name=""
                  required
                />
              </div>
            </div>
            <div class="form-col03">
              <div class="">
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
        <div class="tab">
          <h4>OTP VERIFICATION</h4>
          <h4>Please enter the one-time password to verify your account</h4>
          <div class="input-row">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </div>
          <button class="code-button" type="submit">
            Verify OTP Code
          </button>
          <h4>Resend One-Time Password</h4>
        </div>
        <div class="tab">
          <h2>Create an Agent Account (2/2)</h2>
          <div class="form-group">
            <label>Current Job Function</label>
            <select name="" id="" style={{ color: "#ccc", fontSize: "12px;" }}>
              <option value="">Select new job interest</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="">
                <label>Job Experience Level</label>
                <br />
                <input
                  type="radio"
                  id="internship"
                  name=""
                  value="internship"
                />
                <label class="radio">Internship</label>
                <br />
                <input
                  type="radio"
                  id="entry_level"
                  name=""
                  value="entry_level"
                />
                <label class="radio">Entry Level</label>
                <br />
                <input type="radio" id="mid_level" name="" value="mid_level" />
                <label class="radio">Mid Level</label>
                <br />
                <input
                  type="radio"
                  id="mid_senior_level"
                  name=""
                  value="mid_senior_level"
                />
                <label class="radio">Mid Senior Level</label>
                <br />
                <input type="radio" id="director" name="" value="director" />
                <label class="radio">Director</label>
                <br />
                <input type="radio" id="executive" name="" value="executive" />
                <label class="radio">Executive</label>
                <br />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="">
                <label>Type of Tech Job</label>
                <br />
                <input type="radio" id="part-time" name="" value="part-time" />
                <label class="radio">Part-time</label>
                <br />
                <input type="radio" id="contract" name="" value="contract" />
                <label class="radio">Contract</label>
                <br />
                <input type="radio" id="full-time" name="" value="full-time" />
                <label class="radio">Full-time</label>
                <br />
                <input type="radio" id="volunteer" name="" value="volunteer" />
                <label class="radio">Volunteer</label>
                <br />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <div class="">
                <label>Preferred Work Mode</label>
                <br />
                <input
                  type="radio"
                  id="fully-remote"
                  name=""
                  value="fully-remote"
                />
                <label class="radio">Fully-Remote</label>
                <br />
                <input type="radio" id="hybrid" name="" value="hybrid" />
                <label class="radio">Hybrid</label>
                <br />
                <input type="radio" id="on-site" name="" value="on-site" />
                <label class="radio">On-site</label>
                <br />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Upload a Profile Picture</label>
            <div class="container1">
              <div class="drag-area">
                <div class="icon">
                  <i class="bx bxs-file-find"></i>
                </div>
                <b>
                  <span class="header">Browse Files</span>
                </b>
                <br />
                <span class="header">Drag and drop file here</span>
              </div>
            </div>
          </div>
          <div
            class="form-group"
            style={{textAlign: "center", marginTop: "60px", marginLeft: "50px"}}
          >
            <input type="checkbox" />
            <label for="">
              I agree to the <span class="change-color">Terms</span>
              and <span class="change-color">Conditions</span>{" "}
            </label>
          </div>
          <button class="create-button" type="submit">
            Create Account
          </button>
          <div
            class="form-group"
            style={{textAlign: "center", marginTop: "10px", marginLeft: "10px"}}
          >
            <p>
              Already have an account? <Link to="">Log In</Link>
            </p>
          </div>
        </div>

        <button class="next-button" type="button" onclick="showNextTab()">
          Next
        </button>
      </form>
    </div>
  );
};

export default Agent;
