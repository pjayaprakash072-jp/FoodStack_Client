import { useEffect, useState } from "react"
import addressService from "../../services/addressService";
import { getErrorMessage } from "../../utils/api";
import Loader from "../../components/Common/Loader";
import AddressCard from "../../components/Card/AddressCard";
import EmptyState from "../../components/Common/EmptyState";
import { Link } from "react-router-dom";

const SelectAdderss = () => {
    const [addresses,setAddresses] = useState([]);
    const [busy,setbusy] = useState(true);
    const [error,setError] = useState("");
    useEffect(
        ()=>{
            (async()=>{
                try {
                    const respose = await addressService.getall();
                    setAddresses(respose.addresses);
                } catch (error) {
                    setError(getErrorMessage(error))
                }finally{
                    setbusy(false)
                }
            })()
        },[]
    )
if(busy) return <Loader label="Loading Addresses"/>
  return (
    <section className="section">
        <span className="eyebrow">DELIVERY</span>
        <h1>Select address</h1>
        {error && <div className="error">{error}</div>}
        {
            addresses.length ?(
                addresses.map(
                    (a)=>(
                        <AddressCard key={a._id} a={a} select/>
                    )
                )
            ):(
                <EmptyState
                title="No Saved Addresses"
                text="Add an address from your profile before placing an order"
                />
            )
        }
        <Link className="button" to="/profile/addaddress">Add</Link>
    </section>
  )
}

export default SelectAdderss