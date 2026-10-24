import { createContext, useMemo, useState } from "react";


export const OpenModal = createContext(null);

export const OpenModalProvicer =({children})=>{
  const [openLogin,setOpenLogin] = useState(false);
  const [openRegister,setOpenRegister] = useState(false);
  const loginPage =()=>{
    setOpenLogin(true);
    setOpenRegister(false);
  }
  const registerPage =()=>{
    setOpenLogin(false);
    setOpenRegister(true);
  }
  const closeLogReg = ()=>{
    setOpenLogin(false);
    setOpenRegister(false);
  }
  const value = useMemo(
    ()=>(
        {openLogin,openRegister,setOpenLogin,setOpenRegister,loginPage,registerPage,closeLogReg}
    ),[openLogin,openRegister]
  )
    return(
        <OpenModal.Provider value={value}>
            {children}
        </OpenModal.Provider>
    )
}