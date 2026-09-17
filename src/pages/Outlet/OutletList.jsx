import { useEffect, useState } from "react"
import SearchBar from "../../components/Common/SearchBar"
import { useSearchParams } from "react-router-dom";
import outletService from './../../services/outletService';
import { getErrorMessage } from "../../utils/api";
import Loader from "../../components/Common/Loader";
import OutletCard from "../../components/Card/OutletCard";
import EmptyState from './../../components/Common/EmptyState';

const arr = (x)=> Array.isArray(x)? x:x.outlets || [];

const OutletList = ({compact}) => {
    const [outlets,setOutlets] = useState([]);
    const [busy,setBusy] = useState(true);
    const [error,setError] = useState("");
    const [params] = useSearchParams();
    const [search,setSearch] = useState( params.get("search") ||"");

    useEffect(()=>{
        (async ()=>{
            try {
                const response = await outletService.getAll();
                setOutlets(arr(response))
            }catch(error){
                setError(getErrorMessage(error))
            }
            finally {
                setBusy(false)
            }
        })();
    },[])

    const filtered = outlets.filter((o)=>`${o.name} ${o.city} ${o.area}`.toLowerCase().includes(search.toLowerCase()))

    if(busy) return <Loader Label = "Findign Outlets..."/>
  return (
    <section className={compact? "":"section"}>
        {
            !compact && (
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">EXPLORE</span>
                        <h1>Outlets</h1>
                    </div>
                </div>
            )
        }
        {
            !compact && (
                <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search Outlets..."
                />
            )
        }
        {error && <div className="error">{error}</div>}
        {
            filtered.length ? (
                <div className="outlet-grid">
                    {
                        (
                            compact? filtered.slice(0,4) : filtered 
                        ).map(
                            (o)=>(
                                <OutletCard key={o._id} outlet = {o}/>
                            )
                        )
                    }
                </div>
            ):(
                <EmptyState
                title = "No Outlets found"
                text = "Try a different Search"
                />
            )
        }
    </section>
  )
}

export default OutletList