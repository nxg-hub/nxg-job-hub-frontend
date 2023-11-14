import React from 'react';
import './profile.css';

const StepOne = ({...props}) => {
  return (
    <div {...props}>
      <div class="tab show">
          <div class="form-row">
            <div class="form-col">
              <div class="form">
                <label for="">First Name*</label>
                <input type="text"  placeholder="Enter your first name"  required />
            </div>
            </div>
            <div class="form-col">
              <div class="form">
                <label for="">Last Name*</label>
                <input type="text" placeholder="Enter your last name"  required />
            </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <label for="">Gender*</label>
                  <div class="radio-container">
                        <label for="">
                          <input type="radio" name="option" value="option1" /> Male
                        </label>
                        <label for="">
                          <input type="radio" name="option" value="option2" /> Female
                        </label>
                    </div>
            </div>
            <div class="form-col">
              <div class="form">
                <label for="">Nationality*</label>
                <select name="" id="">
                  <option value="">select here</option>
                </select>
            </div>
            </div>
          </div>

          <div class="form-row1">
              <div class="form-col1">
                  <div class="form">
                    <label for="">Phone </label>
                    <select name="" id="">
                      <option value="">+234</option>
                    </select>
                </div>
                </div>
              <div class="form-col2">
                <div class="form">
                  <label for="" class="label-sep">Number</label>
                  <input type="text" placeholder="Enter your phone number" />
              </div>
              </div>
              
            </div>

            <div class="form-row1">
              <div class="form-col1">
                  <div class="form">
                    <label for="">Date </label>
                    <select name="" id="">
                      <option value="">DD</option>
                    </select>
                </div>
                </div>
              <div class="form-col3">
                <div class="form">
                  <label for="" class="label-sep1">of</label>
                  <select name="" id="">
                      <option value="">Month</option>
                    </select>
              </div>
              </div>
              <div class="form-col3">
                  <div class="form">
                    <label for="" class="label-sep2">Birth</label>
                    <select name="" id="">
                      <option value="">Year</option>
                    </select>
                </div>
                </div>
            </div>
          
          <div class="form">
            <label for="">City, State*</label>
            <input type="text" placeholder="Enter current city, state"  required />
        </div>
        <div class="form">
          <label for="">Residential Address</label>
          <input type="text" placeholder="Enter your address"  required />
      </div>
      <div class="form">
          <label for="">Postal or Zip Code</label>
          <input type="text" placeholder="Enter your zip code"  required />
      </div>
      </div>
    </div>
  )
}

export default StepOne
