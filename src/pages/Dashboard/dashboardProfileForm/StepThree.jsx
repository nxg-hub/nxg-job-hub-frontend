import React from 'react';
import './profile.css';

const StepThree = ({...props}) => {
  return (
    <div {...props}>
       <div class="tab">
      <div class="form">
        <label for="">Preferred work mode</label>
        <select name="" id="">
          <option value="">select</option>
        </select>
      </div>
      <div class="form">
        <label>Upload Passport</label>
        <div class="container1">
            <label class="drag-area">
                <div class="icon">
                    <i class='bx bxs-cloud-upload'></i>
                </div>
                <input type="file" accept=".jpg, .jpeg, .png, .pdf" />
                <b><span  style={{fontSize: "10px"}}>Browse Files</span></b>
            </label>
        </div>
    </div>
    <div class="form">
      <label>Upload Resume/CV</label>
      <div class="container1">
          <label class="drag-area">
              <div class="icon">
                  <i class='bx bxs-cloud-upload'></i>
              </div>
              <input type="file" accept=".jpg, .jpeg, .png, .pdf" />
              <b><span style={{fontSize: "10px"}}>Browse Files</span></b>
          </label>
      </div>
  </div>
  <div class="form">
    <label>Upload Cover Letter</label>
    <div class="container1">
        <label class="drag-area">
            <div class="icon">
                <i class='bx bxs-cloud-upload'></i>
            </div>
            <input type="file" accept=".jpg, .jpeg, .png, .pdf" />
            <b><span style={{fontSize: "10px"}}>Browse Files</span></b>
        </label>
    </div>
</div>
      
      <div class="form">
        <label >Write Cover letter</label>
        <textarea name="" id="" ></textarea>
      </div>
      <div class="form">
        <label for="">Portfolio/Linkedin link</label>
       <input type="text" />
      </div>
  </div>
    </div>
  )
}

export default StepThree
