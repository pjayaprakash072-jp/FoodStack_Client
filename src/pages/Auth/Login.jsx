import { useRef, useState } from "react";
import { useAuth } from "../../context/useAuth"
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/api";
import ReCAPTCHA from "react-google-recaptcha";


const initial = {
  email:"",
  password:""
}
const Login = () => {
  const captchaRef = useRef(null);
  const {login} = useAuth();
  const [form,setForm] = useState(initial);
  const [error,setError] = useState("");
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
      
      navigate("/dashboard");
    } catch (error) {
      setError(getErrorMessage(error));
    }finally{
      setBusy(false)
    }
  }
  return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="head">
            <h1>Welcomet Back</h1>
            <p>Login</p>
          </div>
          {error && <div className="error">{error}</div>}
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <div className="label-e">
                <h1>Email</h1>
                <p>abc</p>
              </div>
              <input 
              type="Email"
              name="email"
              placeholder="Email"
              onChange={change}
              />
            </label>
            <label>
              Password 
              <input
              type="password"
              name="password"
              placeholder="password"
              onChange={change}
              />
            </label>
            <ReCAPTCHA
            ref ={captchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            />
            <button className="button primary submitbtn" type="submit">{busy? "Login...":"Login"}</button>
          </form>
        </div>
      </div>
  )
}

export default Login