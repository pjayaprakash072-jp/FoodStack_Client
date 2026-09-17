
import { ShoppingBag,ArrowRight,UtensilsCrossed } from 'lucide-react';
import SearchBar from './../../components/Common/SearchBar';
import OutletList from '../Outlet/OutletList';
const Dashboard = () => {
  return (
    <div>
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
            <SearchBar/>
          </div>
          <div className="hero-actions">
            <ArrowRight/>
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
            <div>View all outlets <ArrowRight/></div>
        </div>
        <OutletList compact/>
      </section>
    </div>
  )
}

export default Dashboard