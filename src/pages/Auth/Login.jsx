import { useRef, useState } from "react";
import { useAuth } from "../../context/useAuth"
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import { Eye, EyeOff } from "lucide-react";
import useOpenModal from "../../context/useOpenModal";


const initial = {
  email:"",
  password:""
}
const Login = ({openReg}) => {
  const captchaRef = useRef(null);
  const {login} = useAuth();
  const {closeLogReg}= useOpenModal();
  const [form,setForm] = useState(initial);
  const [error,setError] = useState("");
  const [showPassword,setShowPassword]= useState(false)
  const [busy,setBusy] = useState(false);
  const navigate = useNavigate();
  const change = (e)=>{
    setForm({
      ...form , [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");
    const captchaToken = captchaRef.current?.getValue();
    if(!captchaToken){
      setError("Please complete the CAPTCHA")
      return;
    }
    
    try {
      setBusy(true);
      const response = await login({...form,captchaToken});
      console.log("Login successfull!" , response);
      closeLogReg();
      navigate("/dashboard");
    } catch (error) {
      setError(getErrorMessage(error));
    }finally{
      setBusy(false)
    }
  }
  return (
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Email
                <input 
                type="Email"
                name="email"
                placeholder="Email"
                onChange={change}
                />
              </label>
              <label>
                <div className="label-e">
                  <h1>Passwod</h1>
                  <p>abc</p>
                </div>
                <div className="password-container">
                <input
                type={showPassword?"text":"password"}
                name="password"
                placeholder="password"
                onChange={change}
                />
                <button
                onClick={()=>setShowPassword(!showPassword)}
                type="button">
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
                </div>
              </label>
              <ReCAPTCHA
              className="captcha"
              ref ={captchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              />
          {error && <div className="error">{error}</div>}
              <button className="button primary submitbtn" type="submit">{busy? "Login...":"Login"}</button>
              <p>
                Don't have Account ? <button className="cursor-pointer" onClick={openReg}>Register</button>
              </p>
            </form>
  )
}

export default Login

// import { useRef, useState } from "react";
// import { useAuth } from "../../context/useAuth"
// import { useNavigate } from "react-router-dom";
// import { getErrorMessage } from "../../utils/api";
// import ReCAPTCHA from "react-google-recaptcha";
// import { Eye, EyeOff } from "lucide-react";


// const initial = {
//   email:"",
//   password:""
// }
// const Login = () => {
//   const captchaRef = useRef(null);
//   const {login} = useAuth();
//   const [form,setForm] = useState(initial);
//   const [error,setError] = useState("");
//   const [showPassword,setShowPassword]= useState(false)
//   const [busy,setBusy] = useState(false);
//   const navigate = useNavigate();
//   const change = (e)=>{
//     setForm({
//       ...form , [e.target.name]:e.target.value
//     })
//   }

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     setError("");
//     const captchaToken = captchaRef.current?.getValue();
//     if(!captchaToken){
//       setError("Please complete the CAPTCHA")
//       return;
//     }
    
//     try {
//       setBusy(true);
//       const response = await login({...form,captchaToken});
//       console.log("Login successfull!" , response);
      
//       navigate("/dashboard");
//     } catch (error) {
//       setError(getErrorMessage(error));
//     }finally{
//       setBusy(false)
//     }
//   }
//   return (
//       <div className="auth-page">
//         <div className="auth-card">
//           <div className="head">
//             <h1>Welcomet Back</h1>
//             <p>Login</p>
//           </div>
//           {error && <div className="error">{error}</div>}
          // <form className="form" onSubmit={handleSubmit}>
          //   <label>
          //     <div className="label-e">
          //       <h1>Email</h1>
          //       <p>abc</p>
          //     </div>
          //     <input 
          //     type="Email"
          //     name="email"
          //     placeholder="Email"
          //     onChange={change}
          //     />
          //   </label>
          //   <label>
          //     Password 
          //     <div className="password-container">
          //     <input
          //     type={showPassword?"text":"password"}
          //     name="password"
          //     placeholder="password"
          //     onChange={change}
          //     />
          //     <button
          //     onClick={()=>setShowPassword(!showPassword)}
          //     type="button">
          //       {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
          //     </button>
          //     </div>
          //   </label>
          //   <ReCAPTCHA
          //   className="captcha"
          //   ref ={captchaRef}
          //   sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          //   />
          //   <button className="button primary submitbtn" type="submit">{busy? "Login...":"Login"}</button>
          // </form>
//         </div>
//       </div>
//   )
// }

// export default Login