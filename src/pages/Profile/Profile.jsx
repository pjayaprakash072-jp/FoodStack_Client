
import { ChevronRight, MapPin, Pencil, X } from 'lucide-react';
import { useAuth } from './../../context/useAuth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import userService from '../../services/userService';
import { getErrorMessage } from '../../utils/api';
import { toast } from 'sonner';
const Profile = () => {
    const {user,updateUser} = useAuth();
    const [edit,setEdit] = useState(false);
    const [busy,setBusy] = useState(false);
    const [form,setForm] = useState(
        {
            name:user.name,
            email:user.email,
            phone:user.phone
            // profileImg:null
        }
    )
    const change = (e)=>{
        const {type,name,value,files} = e.target;
        setForm(
            {
                ...form,[name]:type === "file"? files[0]:value
            }
        )
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            setBusy(true);
            const response = await userService.update(form);
            console.log("updated Rsponse:",response);
            updateUser(response.user);
            setEdit(false)
            toast.success("Profile Updated Successfully!");
        } catch (error) {
            console.log("Error, while updating profile!",error);
            toast.error(getErrorMessage(error));
        }finally{
            setBusy(false)
        }
    }
  return (
    <section className="section">
        <span className="eyebrow">Account</span>
        <h1>Profile</h1>
        <div className="profile-card">
            <div className="details">
                <div className="avatar">{(user?.name || "U")[0].toUpperCase()}</div>
                <div>
                    <h2>{user?.name || "FoodStack user"}</h2>
                    <p>{user?.email || "No email"}</p>
                </div>
                <button className='button primary' onClick={()=>setEdit(!edit)}>
                    {
                        edit?(
                            <X size={19}/>
                        ):(
                            <Pencil size={19}/>
                        )
                    }
                </button>
            </div>
            {
                edit && (
                    <form className="form grid-2" onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input 
                            name='name'
                            value={form.name}
                            onChange={change}
                            />
                        </label>
                        <label>
                            Email
                            <input 
                            name='email'
                            value={form.email}
                            disabled
                            onChange={change}
                            />
                        </label>
                        <label>
                            phone
                            <input 
                            name='phone'
                            value={form.phone}
                            onChange={change}
                            />
                        </label>
                        <label>
                            Image
                            <input 
                            type="file"
                            name='profileImg'
                            accept="image/*"
                            disabled
                            onChange={change}
                            />
                        </label>
                    <button className="button primary submitbtn grid-span-2">{busy ? "Saving changes..." : "Save changes"}</button>
                    </form>
                )
            }
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