import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer select-none'>

        {/* Narayana Health Logo */}
        <svg className="w-9 h-9 sm:w-10 sm:h-10 transition-transform hover:scale-105" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top-Left Blue L */}
          <g fill="#004b90">
            <rect x="0" y="0" width="11" height="18" rx="5.5" />
            <rect x="0" y="0" width="18" height="11" rx="5.5" />
          </g>
          {/* Top-Right Red L */}
          <g fill="#e21937">
            <rect x="29" y="0" width="11" height="18" rx="5.5" />
            <rect x="22" y="0" width="18" height="11" rx="5.5" />
          </g>
          {/* Bottom-Left Red L */}
          <g fill="#e21937">
            <rect x="0" y="22" width="11" height="18" rx="5.5" />
            <rect x="0" y="29" width="18" height="11" rx="5.5" />
          </g>
        </svg>

        <div className='leading-tight'>
          <p className='text-base font-semibold text-gray-800'>NarayanaCare</p>
          <p className='text-xs text-gray-500 hidden sm:block'>Care you can trust</p>
        </div>
      </div>
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <div className='w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-[13px] font-semibold tracking-wider shadow-md border border-gray-800 transition-transform hover:scale-105'>
                {userData.name ? userData.name.trim().split(' ').filter(n => n).map((n, i, a) => i === 0 || i === a.length - 1 ? n[0] : '').join('').toUpperCase() : ''}
              </div>
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button
              onClick={() => navigate('/login')}
              className='bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hidden md:block hover:bg-slate-800 active:bg-slate-950 transition'
            >
              Create account
            </button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <p className='text-lg font-semibold text-gray-800'>NarayanaCare</p>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar