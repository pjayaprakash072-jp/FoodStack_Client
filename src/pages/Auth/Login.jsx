import { useState } from "react";
import { useAuth } from "../../context/useAuth"
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/api";


const initial = {
  email:"",
  password:""
}
const Login = () => {
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
    setBusy(true);
    try {
      const response = await login(form);
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
              Email 
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
            <button className="button primary" type="submit">{busy? "Logging In":"Login"}</button>
          </form>
        </div>
      </div>
  )
}

export default Login