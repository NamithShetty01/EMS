//import react from "react";
import axios from "axios"
import { useState } from "react"
import {useAuth} from '../context/authContext'
import { useNavigate } from "react-router-dom"


 const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState(null)
   const {login} = useAuth()
   const navigate =useNavigate()

   const handleSubmit = async(e) => {
      
      e.preventDefault();
      try {
         const response = await axios.post("http://localhost:5000/api/auth/login",
          {email,password},
   
         );
         if(response.data.success){
            login(response.data.user)
            localStorage.setItem("token", response.data.token)
            if (response.data.user.role === "admin") {
               navigate('/admin-dashboard')
            } else {
               navigate('/employee-dashboard')
            }
         }
      } catch (error) {
        if (error.response && !error.response.data.success) {
         setError(error.response.data.error)
        }else{
         setError("Server Error")
        }
         
      }

   }

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top_left,_#c9f7f2,_#f1f5f9_45%,_#e2e8f0)]">
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 items-stretch">
               <div className="hidden md:flex rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-600 text-white p-8 shadow-xl flex-col justify-between">
                  <div>
                     <p className="text-xs uppercase tracking-[0.2em] text-teal-100">HR Suite</p>
                     <h2 className="text-3xl font-extrabold mt-4 leading-tight">Employee Management System</h2>
                  </div>
                  <p className="text-sm text-teal-50">Manage people, payroll, leaves, and operations in one clean dashboard.</p>
               </div>

               <div className="app-card p-7 md:p-8 bg-white/95 backdrop-blur">
               <h2 className="text-2xl font-extrabold mb-1 text-slate-900">Sign In</h2>
               <p className="text-sm text-slate-500 mb-5">Use your work account to continue</p>
               { error && <p className="text-red-600 text-sm mb-3">{error} </p>}
               <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                     <label htmlFor='email' className="app-label">Email</label>
                     <input
                     type="email"
                     className="app-input"
                     placeholder="Enter Email"
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     />
                     
                  </div>
                  <div className="mb-4">
                     <label htmlFor='password' className="app-label">Password</label>
                     <input
                     type="password"
                     className="app-input"
                     placeholder="Enter Password"
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     />

                  </div>
                  <div className="mb-5 flex items-center justify-between">
                     <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox"/>
                        <span className="ml-2 text-slate-600 text-sm">Remember me</span>
                     </label>
                  </div>
                  <div className="mb-4">
                     <button 
                     type="submit"
                     className="w-full app-btn-primary py-2.5">
                        Login
                     </button>
                  </div>
               </form>
               </div>
            </div>
         </div>
    )
 }

 export default Login