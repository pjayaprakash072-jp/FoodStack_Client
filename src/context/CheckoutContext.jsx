import { createContext, useState } from "react";


export const CheckoutContext = createContext(null);

export const CheckoutProvicer = ({children})=>{
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    return (
        <CheckoutContext.Provider value={{selectedAddress,setSelectedAddress,selectedPayment, setSelectedPayment}}>{children}</CheckoutContext.Provider>
    )
}

