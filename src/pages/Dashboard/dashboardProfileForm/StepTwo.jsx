import React from 'react';
import './profile.css';

const StepTwo = ({...props}) => {
  return (
    <div {...props}>
      <div class="tab">
      <div class="form">
        <label for="">Highest qualification</label>
        <select name="" id="">
          <option value="">select</option>
        </select>
    </div>
        <div class="form-row">
          <div class="form-col">
            <div class="form">
              <label for="">Years of work experience</label>
              <input type="text" placeholder=""  required />
          </div>
          </div>
          
        </div>
            <div class="form">
              <label for="">Professional Certification</label>
              <select name="" id="">
                <option value="">select</option>
              </select>
          </div>
          <div class="form">
            <label for="">Current Job</label>
            <input type="text" placeholder="Enter current job" />
        </div>
        <div class="form">
          <label for="">Job Interest</label>
          <select name="" id="">
            <option value="">select</option>
          </select>
      </div>
      <div class="form">
        <label for="">Level of experience for job</label>
        <select name="" id="">
          <option value="">select</option>
        </select>
    </div>
    <div class="form">
      <label for="">Type of job</label>
      <select name="" id="">
        <option value="">select</option>
      </select>
    </div>
        
  </div>
    </div>
  )
}

export default StepTwo
