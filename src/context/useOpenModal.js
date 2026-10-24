import { useContext } from "react"
import { OpenModal } from './OpenModal';

const useOpenModal = ()=>{
    return useContext(OpenModal);
}
export default useOpenModal;