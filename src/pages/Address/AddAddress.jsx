import { useState } from "react"
import {useNavigate } from "react-router-dom";
import useLocation from "../../context/useLocation"
import addressService from './../../services/addressService';
import { getErrorMessage } from "../../utils/api";
import LocationPicker from "../../components/Location/LocationPicker";



const initial = {
    label:"Home",
    fullName:"",
    phone:"",
    addressLine1:"",
    addressLine2:"",
    city:"",
    state:"",
    pincode:"",
    latitude:null,
    longitude:null,
    isDefault:false
}
const AddAddress = () => {
  const navigate = useNavigate();
  const {useCurrentLocation} = useLocation();
  const [showMap,setShowMap] = useState(false)
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

  // Reverse GeoCoding
  const getAddressFromCorodinates = async(latitude,longitude)=>{
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    if(!response.ok){
      throw new Error("Unable to find addrss for this locations");
    }
    const data = await response.json();
    return data;
  }

  const applyLocation = async({latitude,longitude})=>{
    try {
      setLocationLoading(true);
      setError("");
      setForm(
        (prev)=>(
          {
            ...prev,latitude,longitude,
          }
        )
      )
      const data = await getAddressFromCorodinates(latitude,longitude);
      const address = data.address || {};
      setForm(
        (prev)=>(
          {
            ...prev,latitude,longitude,
            addressLine1:[address.house_number,address.road].filter(Boolean).join(","),
            addressLine2:address.suburb || address.neighbourhood || address.residential || "",
            city:address.city || address.town|| address.municipality || "",
            state:address.state ||"",
            pincode:address.postcode || "",
          }
        )
      )
    } catch (error) {
      console.log(error);
      setError("Location selected,but address details could not be loaded. you can enter the address manually ")
    }finally{
      setLocationLoading(false);
    }
  }
  const handleUseCurrentLocation = async()=>{
    try {
      setError("")
      const currentLocation = await useCurrentLocation();
      await applyLocation(currentLocation);
    } catch (error) {
      console.log(error);
      setError("unable to get current location, Please allow location access")
    }
  }

  const handleMapLocation = async(location)=>{
    await applyLocation(location);
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
      console.log("Final address being sent:",form);

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
      <div className="location-choose">
        <h3>Choose Location</h3>
        <div>
          <button className="button primary" type="button" disabled={locationLoading} onClick={handleUseCurrentLocation}>{locationLoading? "Getting Location...":"📍 Use Current Location"}</button>
          <button className="button primary" type="button" onClick={()=>setShowMap(true)}>Select on Map</button>
        </div>
        {
          form.latitude != null && form.longitude != null && (
            <div className="location-top">
              <p><strong>Selected Location</strong></p>
              <p>latitude:{" "} {form.latitude.toFixed(6)}</p>
              <p>longitude:{" "} {form.longitude.toFixed(6)}</p>
            </div>
          )
        }
      </div>
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
        {/* <label>
          Select State 
          <select 
          name="state"
          value={form.state}
          onChange={change}
          >
            <option value="">select State</option>
            <option value="Andra pradesh">Andra predesh</option>
          </select>
        </label> */}
        <label>
          State
          <input 
          type="text"
          name="state"
          value={form.state}
          onChange={change}
          placeholder="Enter state"
          required
          />
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
          checked={form.isDefault}
          onChange={change}
          />
          <span>set as Default</span>
        </label>
        <button className="button" type="submit"
        disabled={busy}
        >{busy?"Saving":"Save Address"}</button>
      </form>
      {
        showMap && (
          <LocationPicker 
          initialLocation ={
            form.latitude != null && form.longitude != null ?{ latitude:form.latitude, longitude:form.longitude} :null
          }
          onSelect={handleMapLocation}
          onClose={()=>setShowMap(false)}
          />
        )
      }
    </section>
  )
}

export default AddAddress