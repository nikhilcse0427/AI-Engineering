import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (loading) return
    setLoading(true)

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      console.log(err)
      toast.error("Internal Server Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-[85vh] flex items-center justify-center p-4 bg-[#f8fafc]'>
      <div className='w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'>

        {/* Left Minimalist Presentation Panel */}
        <div className='hidden md:flex flex-col justify-center w-full bg-white border border-gray-200 rounded-[1.5rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden'>

          <div className='flex items-center gap-2 mb-10'>
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="#004b90"><rect x="0" y="0" width="11" height="18" rx="5.5" /><rect x="0" y="0" width="18" height="11" rx="5.5" /></g>
              <g fill="#e21937"><rect x="29" y="0" width="11" height="18" rx="5.5" /><rect x="22" y="0" width="18" height="11" rx="5.5" /></g>
              <g fill="#e21937"><rect x="0" y="22" width="11" height="18" rx="5.5" /><rect x="0" y="29" width="18" height="11" rx="5.5" /></g>
            </svg>
            <p className='text-xl font-bold tracking-tight text-gray-900'>Narayana<span className="font-medium text-gray-500">Care</span></p>
          </div>

          <h1 className='text-3xl lg:text-[2.5rem] font-bold tracking-tight text-gray-900 leading-[1.15] mb-5'>
            World-class care <br /> management.
          </h1>
          <p className='text-[15px] text-gray-500 leading-relaxed mb-10 max-w-md'>
            Join our hospital network to manage appointments, overview doctor earnings, and maintain top productivity across all channels.
          </p>

          <div className='space-y-4'>
            {['Administer Specialists', 'Track Appointments', 'End-to-End Analytics'].map((feature, idx) => (
              <div key={idx} className='flex items-center gap-3'>
                <div className='w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0'>
                  <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className='font-medium text-[14px] text-gray-700'>{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Authenication Card (Clerk style) */}
        <div className='flex justify-center w-full'>
          <div className='w-full bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center h-full'>

            {/* Decorative Top Accent */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-primary'></div>

            <div className='flex flex-col items-center mb-8 md:hidden'>
              <svg className="w-10 h-10 mb-4" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="#004b90"><rect x="0" y="0" width="11" height="18" rx="5.5" /><rect x="0" y="0" width="18" height="11" rx="5.5" /></g>
                <g fill="#e21937"><rect x="29" y="0" width="11" height="18" rx="5.5" /><rect x="22" y="0" width="18" height="11" rx="5.5" /></g>
                <g fill="#e21937"><rect x="0" y="22" width="11" height="18" rx="5.5" /><rect x="0" y="29" width="18" height="11" rx="5.5" /></g>
              </svg>
            </div>

            <div className='flex flex-col mb-8 text-center'>
              <h2 className='text-xl sm:text-[24px] font-bold text-gray-900 tracking-tight'>
                Sign in to <span className="text-primary">{state}</span>
              </h2>
              <p className='text-[13px] text-gray-500 mt-2'>
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className='space-y-4'>
              <div className='space-y-1.5'>
                <label className='text-[13px] font-medium text-gray-700'>Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                  className='w-full text-[14px] text-gray-900 border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm'
                  placeholder='name@company.com'
                />
              </div>

              <div className='space-y-1.5'>
                <label className='text-[13px] font-medium text-gray-700'>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                  className='w-full text-[14px] text-gray-900 border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm'
                  placeholder='••••••••'
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className='w-full bg-primary text-white text-[14px] font-semibold tracking-wide py-3 rounded-lg shadow-sm hover:-translate-y-[1px] hover:shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4'
              >
                {loading ? 'Please wait...' : 'Sign In'}
              </button>
            </form>

            <div className='mt-8 pt-6 border-t border-gray-100 text-center'>
              <p className='text-[13px] text-gray-600'>
                {state === 'Admin' ? "Doctor Login? " : "Admin Login? "}
                <span
                  onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
                  className='text-primary font-semibold cursor-pointer hover:underline underline-offset-2'
                >
                  Click here
                </span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Login