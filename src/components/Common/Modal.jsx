import { X } from "lucide-react"

const Modal = ({children,title,open,close}) => {
    if(!open)return null;
  return (
    <div className="modal-backdrop" onClick={close}>
        <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-header">
                <div></div>
                <h3>{title}</h3>
                <button className="icon-button" onClick={close}>
                    <X/>
                </button>
            </div>
            {children}
        </div>
    </div>
  )
}

export default Modal