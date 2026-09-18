import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section className="section center">
        <div className="not-found">404</div>
        <h1>page not found</h1>
        <p>The page you requested does not exists</p>
        <Link to="/" className="button primary">Go Home</Link>
    </section>
  )
}

export default NotFound