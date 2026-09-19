import { useContext } from "react"
import { LocationContext } from "./LocationContext"

const useLocation = ()=>{
    return useContext(LocationContext)
}
export default useLocation;