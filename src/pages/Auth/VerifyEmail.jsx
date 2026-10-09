import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getErrorMessage } from "../../utils/api";
import userService from "../../services/userService";
import Loader from "../../components/Common/Loader";
import { toast } from "sonner";


const VerifyEmail = () => {
  const {verificationToken} = useParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  useEffect(
    ()=>{
      if(!verificationToken || hasVerified.current) return;
      hasVerified.current = true;
      const verifyEmail = async()=>{
        try {
          await userService.verify(verificationToken)
          // if(response.ok){ it will work for only fetch method one not for axios, in axios if response.ok means it will continue to try bolck
            toast.success("Email Verification Successfull, You can Login!")
            navigate("/login",{replace:true});
          // }
        } catch (error) {
          console.log("Email Verification failed",getErrorMessage(error))
          toast.error(getErrorMessage(error));
          navigate("/login",{replace:true})
        }
      }
      if(verificationToken){
        verifyEmail();
      }
    },[verificationToken,navigate]
  )
  return (
    <Loader label="Verifying Email..."/>
  )
}

export default VerifyEmail