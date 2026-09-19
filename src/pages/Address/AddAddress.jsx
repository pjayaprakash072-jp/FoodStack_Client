import { useState } from "react"
import {useNavigate } from "react-router-dom";
import useLocation from "../../context/useLocation"
import addressService from './../../services/addressService';
import { getErrorMessage } from "../../utils/api";



const initial = {
    label:"Home",
    fullName:"",
    phone:"",
    addressLine1:"",
    addressLine2:"",
    city:"",
    state:"",
    pincode:"",
    latitude:1235,
    longitude:2345,
    isDefault:false
}
const AddAddress = () => {
  const navigate = useNavigate();
  const {location,useCurrentLocation} = useLocation();
  const [form,setForm] = useState(initial);
  const [busy,setBusy] = useState(false);
  const [locationLoading,setLocationLoading] = useState(false)
  const [error,setError] = useState("");

  const change = (e)=>{
    const {name,value,type,checked} = e.target;
    setForm(
      (prev)=>{
        return (
          {
            ...prev,[name]:type === "checkbox"? checked : value
          }
        )
      }
    )
  }

  const handleUseCurrentLocation = async()=>{
    try {
      setLocationLoading(true);
      setError("")
      const currentLocation = await useCurrentLocation();
      setForm(
        (prev)=>(
          {
            ...prev,latitude:currentLocation.latitude,
            longitude:currentLocation.longitude
          }
        )
      )
    } catch (error) {
      console.log(error);
      setError("unable to get current location, Please allow location access")
    }finally{
      setLocationLoading(false);
    }
  }

  const submit = async(e)=>{
    e.preventDefault();
    console.log(form)
    try{
      setBusy(true);
      setError("");
      if(form.longitude === null  || form.latitude === null){
        setError("Please select your current locaiton");
        return ;
      }

      const response = await addressService.create(form);
      console.log("Address Created",response);
      navigate("/profile/addresses")
    }catch(error){
      setError(getErrorMessage(error));
    }finally{
      setBusy(false);
    }
  }
  return (
    <section className="section">
      <span className="eyebrow">Profile</span>
      <h1>Add Address</h1>
      {error && <div className="error">{error}</div>}
      <form className="form grid-2" onSubmit={submit}>
        <label>
          Address Type 
          <select 
          name="label"
          value={form.label}
          onChange={change}
          >
            <option value="">select</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Full Name 
          <input 
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={change}
          placeholder="Full Name"
          required
          />
        </label>
        <label>
          Phone 
          <input 
          type="tel"
          name="phone"
          value={form.phone}
          onChange={change}
          placeholder="Phone"
          required
          />
        </label>
        <label>
          AdreddLine 1 
          <input 
          type="text"
          name="addressLine1"
          value={form.addressLine1}
          onChange={change}
          placeholder="House no , street, area"
          required
          />
        </label>
        <label>
          AdreddLine 2 
          <input 
          type="text"
          name="addressLine2"
          value={form.addressLine2}
          onChange={change}
          placeholder="Apartment, landmart, etc."
          required
          />
        </label>
        <label>
          City
          <input 
          type="text"
          name="city"
          value={form.city}
          onChange={change}
          placeholder="Enter City"
          required
          />
        </label>
        <label>
          Select State 
          <select 
          name="state"
          value={form.state}
          onChange={change}
          >
            <option value="">select State</option>
            <option value="Andra pradesh">Andra predesh</option>
          </select>
        </label>
        <label>
          Pincode
          <input 
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={change}
          placeholder="Enter Pincode"
          required
          />
        </label>
        <label>
          <input 
          type="checkbox"
          name="isDefault"
          value={form.isDefault}
          onChange={change}
          required
          />
          <span>set as Default</span>
        </label>
        <button className="button" type="submit"
        disabled={busy}
        >{busy?"Saving":"Save Address"}</button>
      </form>
    </section>
  )
}

export default AddAddress