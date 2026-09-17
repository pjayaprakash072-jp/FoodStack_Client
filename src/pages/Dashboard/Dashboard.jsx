
import { ShoppingBag,ArrowRight,UtensilsCrossed } from 'lucide-react';
import SearchBar from './../../components/Common/SearchBar';
import OutletList from '../Outlet/OutletList';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Dashboard = () => {
  const [search,setSearch] = useState("");
  return (
    <div className='section'>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">FoodStack Delivery</span>
          <h1>Your favorite food,
            <br />
            <em>delivered</em>
          </h1>
          <p>
            Discover Outlets, explore menus, and get delicious meals delivered to your door.
          </p>
          <div className="hero-search">
            <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search Outlets"
            />
            <Link to={`/outlets${search? `?search=${encodeURIComponent(search)}`:""}`} >Search</Link>
          </div>
          <div className="hero-actions">
            <Link className="button primary" to="/outlets">
            Explore more<ArrowRight/>
            </Link>
            <ShoppingBag/>
          </div>
        </div>
        <div className="hero-art">
        <UtensilsCrossed size={100}/>
        <span>🍕</span>
        <span>🍔</span>
        <span>🥗</span>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Discover</span>
            <h2>Popular Outlets</h2>
          </div>
            <Link to="/outlets">View all<ArrowRight/></Link>
        </div>
        <OutletList compact/>
      </section>
    </div>
  )
}

export default Dashboard