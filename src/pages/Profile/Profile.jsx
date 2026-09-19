
import { ChevronRight, MapPin, Pencil } from 'lucide-react';
import { useAuth } from './../../context/useAuth';
import { Link } from 'react-router-dom';
const Profile = () => {
    const {user} = useAuth();
  return (
    <section className="section">
        <span className="eyebrow">Account</span>
        <h1>Profile</h1>
        <div className="profile-card">
            <div className="avatar">{(user?.name || "U")[0].toUpperCase()}</div>
            <div>
                <h2>{user?.name || "FoodStack user"}</h2>
                <p>{user?.email || "No email"}</p>
            </div>
            <Link to="/profile/edit">
                <Pencil size={19}/>
            </Link>
        </div>
        <div className="profile-links">
            <Link to="/profile/addresses">
                <MapPin size={19}/>
                <span>Saved Addresses</span>
                <ChevronRight/>
            </Link>
            <Link to="/orders">
                <span>Order history</span>
                <ChevronRight/>
            </Link>
        </div>
    </section>
  )
}

export default Profile