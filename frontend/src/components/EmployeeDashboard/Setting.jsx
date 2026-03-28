//import React from "react";
import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Setting =() => {
    const navigate =useNavigate();
    const{user} = useAuth();
    const [setting, setSetting] = useState ({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange= (e)=> {
        const {name,value } = e.target;
        setSetting({...setting,[name]: value})
    };

    const handleSubmit =async (e) =>{
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not mached")
        } else {
            try {
                const response =await axios.put(
                    "http://localhost:5000/api/setting/change-password",
                    setting,
                    {
                       headers:
                        { Authorization: `Bearer ${localStorage.getItem("token")}`,
                     },

                    }
                )
                if(response.data.success) {
                    navigate("/employee-dashboard");
                    setError("")
                }
            } catch (error) {
                if(error.response && !error.response.data.success) {
                    setError(error.response.data.error)
                }
            }
        }
    }
    return (
        <div className='max-w-3xl mx-auto mt-5 app-card p-8 w-full'>
            <h2 className='text-2xl font-extrabold mb-1'>Change Password</h2>
            <p className='text-sm text-slate-500 mb-5'>Update your account password securely.</p>
            {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}
            <form onSubmit={handleSubmit}>
            {/*Department Name */}
            <div>
                <label className='app-label'>
                    Old Password
                </label>
                <input
                    type='password'
                    name='oldPassword'
                    placeholder='Change Password'
                    onChange={handleChange}
                    className='app-input'
                    required
                />
            </div>
            <div>
                <label className='app-label'>
                    New Password
                </label>
                <input
                    type='password'
                    name='newPassword'
                    placeholder='New Password'
                    onChange={handleChange}
                    className='app-input'
                    required
                />
            </div>
            <div>
                <label className='app-label'>
                    Confirm Password
                </label>
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    className='app-input'
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full mt-6 app-btn-primary">
                    Change Password
                </button>
           </form>    
        </div>
    )
}

export default Setting