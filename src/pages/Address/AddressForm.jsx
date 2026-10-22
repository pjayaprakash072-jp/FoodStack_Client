

const AddressForm = ({form,change,submit,busy}) => {
  return (
      <form className="form grid-2" onSubmit={submit}>
        <label>
          Address Type 
          <select 
          name="label"
          value={form.label}
          onChange={change}
          >
            <option value="">select</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Full Name 
          <input 
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={change}
          placeholder="Full Name"
          required
          />
        </label>
        <label>
          Phone 
          <input 
          type="tel"
          name="phone"
          value={form.phone}
          onChange={change}
          placeholder="Phone"
          required
          />
        </label>
        <label>
          AdreddLine 1 
          <input 
          type="text"
          name="addressLine1"
          value={form.addressLine1}
          onChange={change}
          placeholder="House no , street, area"
          required
          />
        </label>
        <label>
          AdreddLine 2 
          <input 
          type="text"
          name="addressLine2"
          value={form.addressLine2}
          onChange={change}
          placeholder="Apartment, landmart, etc."
          required
          />
        </label>
        <label>
          City
          <input 
          type="text"
          name="city"
          value={form.city}
          onChange={change}
          placeholder="Enter City"
          required
          />
        </label>
        {/* <label>
          Select State 
          <select 
          name="state"
          value={form.state}
          onChange={change}
          >
            <option value="">select State</option>
            <option value="Andra pradesh">Andra predesh</option>
            </select>
            </label> */}
        <label>
          State
          <input 
          type="text"
          name="state"
          value={form.state}
          onChange={change}
          placeholder="Enter state"
          required
          />
        </label>
        <label>
          Pincode
          <input 
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={change}
          placeholder="Enter Pincode"
          required
          />
        </label>
        <label className="grid-span-2">
            <div className="checkbox">
                <span>
                set as Default
                </span>
                <input 
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={change}
                />
            </div>
        </label>
        <button className="button primary submitbtn grid-span-2" type="submit"
        disabled={busy}
        >{busy?"Saving":"Save Address"}</button>
      </form>
  )
}

export default AddressForm