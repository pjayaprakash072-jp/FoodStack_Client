
const Loader = ({label = "Loading ..."}) => {
  return (
    <div className="loader-wrap">
        <div className="spinner"/>
        <span>{label}</span>
    </div>
  )
}

export default Loader