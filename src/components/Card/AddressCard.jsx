
const AddressCard = ({a,remove,select,onSelect}) => {
  return (
        <div className="address-card" key={a._id} onClick={select ? onSelect : undefined}>
            <div className="row-between">
                <b>{a.label || "Address"}</b>
                {
                    a.isDefault && (
                        <span className="default-badge">Default</span>
                    )
                }
                {
                    !select && (
                        <button className="button danger" onClick={()=>remove(a._id)}>
                            Delete
                        </button>
                    )
                }
            </div>
            <div className="address-person">
                <strong>{a.fullName}</strong>
                <span>{a.phone}</span>
            </div>
            <div className="address-details">
                <p>{a.addressLine1}</p>
                {
                    a.addressLine2 && (
                        <p>{a.addressLine2}</p>
                    )
                }
                <p>{a.city},{a.state},{a.pincode}</p>
            </div>
            {
                select && (<button type="button">Select</button>)
            }
        </div>
  )
}

export default AddressCard