
const Login = () => {
  return (
    <div>login
        <button className="button border-2 border-red-500 hover:bg-amber-950 hover:text-white" onClick={()=>{localStorage.setItem("user_token","abc")}}>add token</button>
    </div>
  )
}

export default Login