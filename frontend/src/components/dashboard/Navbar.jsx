//import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const{user, logout} = useAuth()
    return(
        <div className='h-16 app-card sticky top-0 z-10 px-5 flex items-center justify-between'>
            <div>
                <p className='text-xs uppercase tracking-wide text-slate-500 font-semibold'>Workspace</p>
                <p className='text-slate-900 font-bold'>Welcome, {user.name}</p>
            </div>
            <button className='app-btn-primary !py-2 !px-4 text-sm' onClick={logout}>Logout</button>
        </div>
    )
}
export default Navbar