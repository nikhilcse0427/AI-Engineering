import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-white/10 bg-gray-800  text-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Certifications / security callout */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur shadow-sm">
              <p className="text-[11px] text-white/70">SOC II</p>
              <p className="text-sm font-semibold text-white">Type 2</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur shadow-sm">
              <p className="text-[11px] text-white/70">ISO</p>
              <p className="text-sm font-semibold text-white">27001</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur shadow-sm">
              <p className="text-[11px] text-white/70">GDPR</p>
              <p className="text-sm font-semibold text-white">&nbsp;</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur shadow-sm">
              <p className="text-[11px] text-white/70">CCPA</p>
              <p className="text-sm font-semibold text-white">&nbsp;</p>
            </div>
          </div>

          <div className="max-w-md">
            <p className="text-sm font-semibold text-white">We take security and privacy seriously!</p>
            <button
              type="button"
              className="mt-2 text-sm text-white/90 hover:text-white hover:underline underline-offset-4 font-medium"
            >
              View our certifications
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/10 backdrop-blur shadow-sm flex items-center justify-center">
                <span className="text-white font-semibold">NC</span>
              </div>
              <div>
                <p className="text-base font-semibold text-white">NarayanaCare</p>
                <p className="text-sm text-white/70">Care, made simple</p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/75">
              NarayanaCare helps patients discover doctors, book appointments, and manage their profile with a secure
              and hassle-free experience.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 font-medium">Secure</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 font-medium">Fast booking</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 font-medium">Online payments</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-3">Products</p>
            <ul className="flex flex-col gap-2 text-sm text-white/75">
              <li>
                <Link to="/doctors" className="hover:text-white hover:underline">Doctor directory</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white hover:underline">Appointment booking</Link>
              </li>
              <li>
                <Link to="/my-profile" className="hover:text-white hover:underline">Profile management</Link>
              </li>
              <li>
                <Link to="/my-appointments" className="hover:text-white hover:underline">Appointment history</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-3">Company</p>
            <ul className="flex flex-col gap-2 text-sm text-white/75">
              <li><Link to="/about" className="hover:text-white hover:underline">About us</Link></li>
              <li><button type="button" className="hover:text-white hover:underline">Careers</button></li>
              <li><button type="button" className="hover:text-white hover:underline">FAQs</button></li>
              <li><Link to="/contact" className="hover:text-white hover:underline">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-white/70">© {year} NarayanaCare. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span>Follow us:</span>
            <button type="button" className="hover:text-white hover:underline">X</button>
            <button type="button" className="hover:text-white hover:underline">LinkedIn</button>
            <button type="button" className="hover:text-white hover:underline">YouTube</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
