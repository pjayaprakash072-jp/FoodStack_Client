import { useState } from "react"
import userService from './../../services/userService';
import { getErrorMessage } from "../../utils/api";
import useOpenModal from "../../context/useOpenModal";

const initial = {
  name:"",
  email:"",
  password:"",
  phone:""
}
const Register = ({openLog}) => {
const {loginPage} = useOpenModal();
const [form,setForm] = useState(initial);
const [error,setError] = useState("");
const [busy,setBusy] = useState(false);
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
    const response = await userService.registerAuth(form);
    await userService.create(response.userAuth?._id,form);
    loginPage();
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
            <p className="grid-span-2">
              Already registered? <button className="cursor-pointer" onClick={openLog}>login</button>
            </p>
          </form>
  )
}

export default Register