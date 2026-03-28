//import React from "react";
import { FaUser } from "react-icons/fa"
import { useAuth } from "../../context/authContext"
const Summary = () => {
    const {user} = useAuth()
    return(
        <div className='p-1'>
        <div className='app-card p-5 flex items-center gap-4'>
            <div className={`text-2xl h-12 w-12 rounded-xl flex justify-center items-center bg-teal-600 text-white`}>
                <FaUser/>
            </div>
            <div>
                <p className='text-sm font-semibold text-slate-500'>Welcome Back</p>
                <p className='text-xl font-extrabold text-slate-900'>{user.name}</p>
            </div>
        </div>
        </div>
    )

}

export default Summary