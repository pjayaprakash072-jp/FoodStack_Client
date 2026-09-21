import { useContext } from "react"
import { CheckoutContext } from "./CheckoutContext"

const useCheckout = ()=>{
    return useContext(CheckoutContext)
}
export default useCheckout