import { useState } from "react"
import userService from './../../services/userService';
import { Link,useNavigate } from 'react-router-dom';
import { getErrorMessage } from "../../utils/api";

const initial = {
  name:"",
  email:"",
  password:"",
  phone:""
}
const Registere = () => {

const [form,setForm] = useState(initial);
const [error,setError] = useState("");
const [busy,setBusy] = useState(false);
const navigate = useNavigate();
const update = (e)=>setForm(
  {
    ...form,[e.target.name]:e.target.value
  }
)

const submit = async (e)=>{
  e.preventDefault();
  setError("");
  setBusy(true);
  try{
    await userService.register(form);
    navigate("/login")
  }catch(error){
    setError(getErrorMessage(error));
  }finally{
    setBusy(false);
  }
}

  return (
      <div className="auth-page">
        <div className="auth-card wide">
          <div className="head">
            <h1>Welcomet Back</h1>
            <p>Login</p>
          </div>
          {error && <div className="error">{error}</div>}
          <form className="form grid-2"  onSubmit={submit}>
            <label>
              Name 
              <input 
              type="text"
              name="name"
              placeholder="Name"
              onChange={update}
              />
            </label>
            <label>
              Email 
              <input 
              type="email"
              name="email"
              placeholder="Email"
              onChange={update}
              />
            </label>
            <label>
              Password 
              <input
              type="password"
              name="password"
              placeholder="password"
              onChange={update}
              />
            </label>
            <label>
              Phone 
              <input 
              type="tel"
              name="phone"
              placeholder="phone"
              onChange={update}
              />
            </label>
            <button className="button primary" type="submit" disabled={busy} >{busy?"Creating...":"Create Account"}</button>
          </form>
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
  )
}

export default Registere