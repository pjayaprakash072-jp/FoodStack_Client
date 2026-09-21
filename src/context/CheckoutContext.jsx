import { createContext, useState } from "react";


export const CheckoutContext = createContext(null);

export const CheckoutProvicer = ({children})=>{
    const [selectedAddress, setSelectedAddress] = useState(null);
    return (
        <CheckoutContext.Provider value={{selectedAddress,setSelectedAddress}}>{children}</CheckoutContext.Provider>
    )
}

