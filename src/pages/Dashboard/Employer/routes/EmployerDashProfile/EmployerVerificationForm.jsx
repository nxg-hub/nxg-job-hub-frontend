import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BsArrowLeft } from 'react-icons/bs';
import FileUploader from '../../../../../components/accounts/FileUploader';
import { Dialog } from '@headlessui/react';
import { ReactComponent as Confetti } from "../../../../../static/icons/ConfettiBall.svg";
import { Link } from 'react-router-dom';

const EmployerVerificationForm = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        cacCert: "",
        taxCert: "",
        memoCert: "",
        taxId:"",
        directors:""
    });

    const [errors, setErrors] = useState({ errors: '' });

    const handleValue = (e, name) => {
        const {value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleBack = () => {
        navigate("/dashboard")
    };

    const onFileChange = (files, name) => {
        setFormData({
            ...formData,
            [name]: files,
        });
        console.log(files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData) {
          setErrors({ formData: 'Fill out the required field' });
        } else {
          setIsOpen(true);
        }
      }

  return (
    <div style={{padding:"2rem"}}>
        <BsArrowLeft className='verify-arrow' onClick={handleBack}/>
        <div className="verifiedForm-main">
            <h2>
                Verify Your Account To Enjoy All Our Services And Make New Recruits Without Any Restrictions To Your Account!
            </h2>
            <form  className="verified-section" onSubmit={handleSubmit}>
            {errors.formData && <p style={{ color: 'red', marginTop:'-.95rem', fontSize:'.8rem' }}>{errors.formData}</p>}
                <div className="tech-pro-form">
                    <FileUploader title="Upload CAC Certificate*" onFileChange={(files) => onFileChange(files, 'cacCert')} />
                </div>
                <div className="tech-pro-form">
                    <FileUploader title="Upload Tax Clearance Certificate*" onFileChange={(files) => onFileChange(files, 'taxCert')} />
                </div>
                <div className="tech-pro-form">
                    <FileUploader title="Upload Company Memorandum  Certificate*" onFileChange={(files) => onFileChange(files, 'memoCert')} />
                </div>
                <div className="my-profile-bio">
                    <label>Company Tax Identification Number</label>
                    <input type='text' value={formData.taxId} onChange={(e) => handleValue(e, 'taxId')}/>
                </div>
                <div className="my-profile-bio">
                    <label>List The Names Of Your Company Directors</label>
                    <textarea  cols="10" rows="10" value={formData.directors} onChange={(e) => handleValue(e, 'directors')}></textarea>
                </div>
                <div className="verified-btn">
                    <button type='submit'>Verify Account</button>
                </div>
            </form>
        </div>
        {isOpen && (
              <Dialog
                open={isOpen} onClose={() => setIsOpen(false)}
              >
                <div style={{background:"rgba(0, 0, 0, 0.6)", height:"100vh", paddingTop:"4%"}}>
                  <Dialog.Panel 
                    style={{ width: "100%", maxWidth:"800px", height: "584px", display: "flex", justifyContent: "center", alignItems: "center", background: '#ffffff', borderRadius: '30px', margin:"auto"}}
                  >
                    <Dialog.Title style={{ fontFamily: "Manrope", margin: '2rem 0', color: '#000000', textAlign: "center" }}>
                      <div className='veri-modal'>
                        <h2 >Verification Successful</h2>
                        <Confetti />
                        <p style={{ fontSize: "22px", fontWeight: "500", lineHeight:'30.05px', margin:'1rem 0', width:"100%", maxWidth:"500px"}}>
                          Congratulations your accunt has been verified successfully.
                        </p>
                      </div>
                      <div className='veri-modalBtn'>
                        <Link
                          style={{ background: "#006A90", padding:'10px', display:'block', color:'#ffffff', borderRadius:'0.6rem', textAlign:'center', fontSize: "1rem", fontWeight: "400"}}
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
  )
}

export default EmployerVerificationForm;
