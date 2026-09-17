import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='animate-fade-in'>
      {/* Hero Section */}
      <div className='text-center pt-16 pb-12 bg-gradient-to-br from-blue-50 via-white to-sky-50 rounded-3xl mb-14 shadow-sm border border-blue-100 relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-primary'></div>
        <h1 className='text-4xl text-gray-800 font-extrabold tracking-tight'>
          Contact <span className='text-primary'>Us</span>
        </h1>
        <p className='mt-4 text-base text-gray-600 max-w-2xl mx-auto px-4'>
          We’re here to assist you with bookings, payments, and any questions about your account.
        </p>
      </div>

      <div className='my-16 flex flex-col justify-center md:flex-row gap-16 items-center mb-28 text-sm'>
        <div className='w-full md:max-w-[420px] relative group'>
          <div className='absolute -inset-2 bg-gradient-to-r from-sky-400 to-primary rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500'></div>
          <div className='relative rounded-2xl overflow-hidden border border-white bg-white shadow-xl transform group-hover:scale-[1.02] transition duration-500'>
            <img className='w-full object-cover group-hover:opacity-90 transition duration-700' src={assets.contact_image} alt="Contact NarayanaCare" />
          </div>
        </div>

        <div className='flex flex-col justify-center items-start gap-6 w-full md:max-w-xl'>

          <div className='w-full relative group rounded-3xl border border-blue-50 bg-white p-8 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden'>
            <div className='absolute left-0 top-0 h-full w-2 bg-blue-100 group-hover:bg-primary transition-colors duration-500'></div>
            <div className='pl-4'>
              <h2 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
                <span className='text-2xl text-blue-500'>📞</span> SUPPORT
              </h2>
              <p className='mt-3 text-gray-500 font-light leading-relaxed'>
                Reach out during working hours — we typically respond within one business day. Your health is our priority.
              </p>
              <div className='mt-5 grid gap-3 text-gray-700 font-medium'>
                <p className='flex items-center gap-3'><span className='text-primary bg-blue-50 p-2 rounded-full'>📱</span> +91 90000 00000</p>
                <p className='flex items-center gap-3'><span className='text-primary bg-blue-50 p-2 rounded-full'>✉️</span> support@narayanacare.in</p>
                <p className='flex items-center gap-3'><span className='text-primary bg-blue-50 p-2 rounded-full'>🕒</span> Mon–Sat, 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

          <div className='w-full relative group rounded-3xl border border-blue-50 bg-white p-8 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden'>
            <div className='absolute left-0 top-0 h-full w-2 bg-sky-100 group-hover:bg-sky-400 transition-colors duration-500'></div>
            <div className='pl-4'>
              <h2 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
                <span className='text-2xl text-sky-500'>🏢</span> OUR OFFICE
              </h2>
              <p className='mt-4 text-gray-600 font-light leading-relaxed flex gap-3'>
                <span className='text-primary bg-blue-50 p-2 rounded-full h-fit'>📍</span>
                <span>
                  NarayanaCare (Demo Address)
                  <br /> 2nd Floor, Health Plaza, Main Road
                  <br /> Hyderabad, Telangana, India
                </span>
              </p>
            </div>
          </div>

          <div className='w-full relative group rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-sky-50 p-8 shadow-md hover:shadow-2xl transition-all duration-500'>
            <div className='absolute right-4 top-4 text-5xl opacity-10 group-hover:rotate-12 transition-transform duration-500'>🌀</div>
            <h2 className='font-bold text-xl text-primary group-hover:text-sky-600 transition-colors duration-300'>CAREERS AT NARAYANA CARE</h2>
            <p className='mt-3 text-gray-600 font-light'>Discover your perfect role and help us revolutionize healthcare.</p>
            <button className='mt-6 px-8 py-3 rounded-full bg-primary text-white font-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 transition-all duration-300'>
              Explore Opportunities →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
