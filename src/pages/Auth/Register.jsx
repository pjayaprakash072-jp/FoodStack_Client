
const Registere = () => {
  return (
      <div className="auth-page">
        <div className="auth-card wide">
          <div className="head">
            <h1>Welcomet Back</h1>
            <p>Login</p>
          </div>
          <form className="form grid-2">
            <label>
              Email 
              <input 
              type="Email"
              placeholder="Email"
              />
            </label>
            <label>
              Password 
              <input
              type="password"
              placeholder="password"
              />
            </label>
            <button className="button primary" type="submit">Login</button>
          </form>
        </div>
      </div>
  )
}

export default Registere