import { useState } from "react"
import userService from './../../services/userService';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from "../../utils/api";

const initial = {
  name:"",
  email:"",
  password:"",
  phone:""
}
const Register = ({openLog}) => {

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
            {error && <div className="error">{error}</div>}
            <button className="button primary submitbtn grid-span-2" type="submit" disabled={busy} >{busy?"Creating...":"Create Account"}</button>
            <p>
              Already registered? <button className="cursor-pointer" onClick={openLog}>login</button>
            </p>
          </form>
  )
}

export default Register