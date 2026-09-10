
const Login = () => {
  return (
    // <div>login
    //     <button className="button border-2 border-red-500 hover:bg-amber-950 hover:text-white" onClick={()=>{localStorage.setItem("user_token","abc")}}>add token</button>
    // </div>
    <div className="page">
      <div className="auth-page">
        <div className="auth-card">
          <div className="head">
            <h1>Welcomet Back</h1>
            <p>Login</p>
          </div>
          <form className="form">
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
            <button className="button" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login