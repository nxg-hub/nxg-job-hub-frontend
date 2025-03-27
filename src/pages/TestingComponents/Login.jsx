import { useState } from "react";
import Loginbg from "../../static/images/login-left-bg.png";
import Googleicon from "../../static/images/icon_google.png";
import Linkedinicon from "../../static/images/icon_linkedin.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function LoginTest(){
  const {register , handleSubmit, formState:{errors}} = useForm();
  const registrationOPtions = {
    email:{required:"Email is required"},
    password:{
      required: "Password is required",
      minLength: {
        value:8,
        message: "Password must have at least 8 characters"
      }
    }
  };

  const submitForm = (data) =>{console.log(data)}

  function handleError(error){
    console.log(error);
  }


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(false);
    const [popup, showpopUp] = useState(undefined);
    
    const navigate = useNavigate();

    function handleLogin(){

    }
    function onCheck(){setCheck(!check);}
    
    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex w-[750px] rounded-b-lg shadow-md">
                <img className="w-1/2 rounded-l-lg" src={Loginbg} alt="Loginpics" />
                <div className="w-1/2 px-10 pt-5">
                    <section className="mb-10">
                        <h1 className="text-2xl font-semibold">Sign in to your Account</h1>
                        <p className="text-base text-gray-400">Login to your account</p>
                    </section>
                    <form onSubmit={handleSubmit(submitForm,handleError)}>
                      <div className="flex flex-col space-y-2 mb-5">
                        <label htmlFor="mail">E-mail</label>
                        <input 
                          id="mail" type="email" 
                          name="email" 
                          placeholder="Enter your email address"
                          className="border border-gray-300 rounded-md p-2" 
                          {...register('email',registrationOPtions.email)} 
                        />
                        <small className="text-red-600">
                          {errors?.email && errors.email.message}
                        </small>
                      </div>
                      <div className="flex flex-col space-y-2 mb-2">
                        <label htmlFor="pass">Password</label>
                        <input 
                          id="pass" type="password" 
                          name="password"
                          placeholder="Enter your password" 
                          className="border border-gray-300 rounded-md p-2" 
                          {...register('password',registrationOPtions.password)} 
                        />
                        <small className="text-red-600">
                          {errors?.password && errors.password.message}
                        </small>
                      </div>
                        <Link
                            to="/forgotpassword"
                            className="text-sm text-gray-500 underline block mb-10">
                            Forgot Password?
                        </Link>
                        <label className="flex space-x-2 text-sm font-medium mb-10" key="checkbox">
                          <input
                            id="checkbox"
                            type="checkbox"
                            aria-label="checkbox"
                            checked={check}
                            onChange={onCheck}
                          />
                          <span> Keep me logged in</span>
                        </label>
                        <button className="bg-sky-600 w-full text-white border-none py-2 mb-5">Sign In</button>
                        <div className="relative text-center text-gray-600 before:content-[''] before:absolute before:left-0 
                            before:top-1/2 before:w-[45%] before:border-t before:border-gray-400 after:content-[''] 
                            after:absolute after:right-0 after:top-1/2 after:w-[45%] after:border-t after:border-gray-400 mb-3"
                        >
                          or
                        </div>
                        <button className="w-full flex justify-center items-center space-x-1 border-none py-2 shadow-lg mb-3">
                          <img className="w-5 h-5" src={Googleicon} alt="" />
                          <span>Sign In with Google</span>
                        </button>
                        <button className="w-full flex justify-center items-center space-x-1 border-none py-2 shadow-lg mb-3">
                          <img className="w-5 h-5" src={Linkedinicon} alt="" />
                          <span>Sign In with LinkedIn</span>
                        </button>
                        <p className="signup">Don't have an account? <Link to="/register" className="underline text-sky-400">Sign Up</Link></p>
                   

                              {/* <AuthOptions login={true} /> */}
                              
                    </form>
                </div>
            </div>
        </div>
    );
}