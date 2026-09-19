import { useEffect } from "react";
import { useState } from "react"
import addressService from '../../services/addressService';
import { getErrorMessage } from "../../utils/api";
import { Link } from "react-router-dom";
import EmptyState from '../../components/Common/EmptyState';
import Loader from "../../components/Common/Loader";
const Addresses = () => {
    const [items,setItems] = useState([]);
    const [busy,setBusy] = useState(true);
    const [error,setError] = useState("");
    useEffect(
        ()=>{
            (async()=>{
                try {
                    const response = await addressService.getall();
                    setItems(response.addresses);
                } catch (error) {
                    setError(getErrorMessage(error));
                }finally{
                    setBusy(false)
                }
            })();
        },[]
    )

    const remove = async(id)=>{
        await addressService.delete(id);
        setItems(
            (x)=> x.filter((a)=>a._id != id)
        )
    }
    if(busy) return <Loader label="Finding Saved Addresses"/>
  return (
    <section className="section">
        <div className="section-headign">
            <div>
                <span className="eyebrow">PROFILE</span>
                <h1>Addresses</h1>
            </div>
            <Link className="button primary" to="/profile/addaddress">
            Add
            </Link>
        </div>
        {error && <div className="error">{error}</div>}
        {
            items.length ?(
                items.map(
                    (a)=>(
                        <div className="address-card" key={a._id}>
                            <div className="row-between">
                                <b>{a.label || "Address"}</b>
                                {
                                    a.isDefault && (
                                        <span className="default-badge">Default</span>
                                    )
                                }
                                <button className="button text-danger" onClick={()=>remove(a._id)}>
                                    Delete
                                </button>
                            </div>
                            <div className="address-person">
                                <strong>{a.fullName}</strong>
                                <span>{a.phone}</span>
                            </div>
                            <div className="address-details">
                                <p>{a.addressLine1}</p>
                                {
                                    a.addressLine2 && (
                                        <p>{a.addressLine2}</p>
                                    )
                                }
                                <p>{a.city},{a.state},{a.pincode}</p>
                            </div>
                        </div>
                    )
                )
            ):(
                <EmptyState
                title="No saved Address"
                text="Add your first delivery Address"
                />
            )
        }
    </section>
  )
}

export default Addresses