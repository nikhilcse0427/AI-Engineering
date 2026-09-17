import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='animate-fade-in'>
      <div className='text-center pt-16 pb-12 bg-gradient-to-br from-blue-50 via-white to-sky-50 rounded-3xl mb-14 shadow-sm border border-blue-100 relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-primary'></div>
        <h1 className='text-4xl text-gray-800 font-extrabold tracking-tight'>
          About <span className='text-primary'>NarayanaCare</span>
        </h1>
        <p className='mt-4 text-base text-gray-600 max-w-2xl mx-auto px-4'>
          Empowering your wellness journey with a modern, simple, and secure way to connect with trusted healthcare professionals.
        </p>
      </div>

      <div className='my-16 flex flex-col md:flex-row gap-16 items-center'>
        <div className='w-full md:max-w-[420px] relative group'>
          <div className='absolute -inset-2 bg-gradient-to-r from-blue-400 to-primary rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500'></div>
          <div className='relative rounded-2xl overflow-hidden border border-white bg-white shadow-xl transform group-hover:-translate-y-2 transition duration-500'>
            <img className='w-full object-cover group-hover:scale-105 transition duration-700' src={assets.about_image} alt="NarayanaCare" />
          </div>
        </div>

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-base text-gray-600 leading-relaxed font-light'>
          <p>
            Welcome to <span className='font-bold text-gray-900'>NarayanaCare</span>, your trusted partner for managing healthcare needs conveniently and efficiently. We understand the everyday challenges of scheduling doctor appointments and keeping your medical life organized.
          </p>
          <p>
            We are committed to building a reliable, state-of-the-art platform that drastically improves the booking experience and supports you throughout your entire care journey — from your very first appointment to ongoing wellness visits.
          </p>

          <div className='mt-4 rounded-2xl border-l-4 border-l-primary bg-gradient-to-r from-blue-50 to-transparent p-6 shadow-sm hover:shadow-md transition-shadow'>
            <b className='text-xl text-gray-900 flex items-center gap-2'>
              <span className='text-primary'>✨</span> Our Vision
            </b>
            <p className='mt-3 text-gray-600'>
              To create a seamless, digitized healthcare experience bridging the gap between patients and top-tier providers, making it effortlessly easy to access the right care at the absolute right time.
            </p>
          </div>
        </div>
      </div>

      <div className='text-center text-3xl my-16'>
        <h2 className='font-bold text-gray-800'>Why <span className='text-primary'>Choose Us</span></h2>
        <div className='w-24 h-1 bg-primary mx-auto mt-4 rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-24'>
        {[
          {
            title: 'EFFICIENCY',
            desc: 'Streamlined, lightning-fast appointment scheduling that seamlessly fits into your busy lifestyle.',
            icon: '⚡'
          },
          {
            title: 'CONVENIENCE',
            desc: 'Instant access to a vast network of highly trusted and verified healthcare professionals in your area.',
            icon: '🏥'
          },
          {
            title: 'PERSONALIZATION',
            desc: 'Tailored automated reminders and a beautiful health profile to help you effortlessly stay on top of your well-being.',
            icon: '💙'
          }
        ].map((item, index) => (
          <div key={index} className='group relative rounded-3xl border border-blue-50 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-3 p-10 flex flex-col gap-4 text-gray-600 transition-all duration-500 overflow-hidden cursor-default'>
            <div className='absolute top-0 left-0 w-full h-1 bg-blue-100 group-hover:bg-primary transition-colors duration-500'></div>
            <div className='absolute -right-6 -top-6 text-7xl opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-primary'>
              {item.icon}
            </div>
            <div className='text-4xl mb-2 text-primary drop-shadow-sm'>{item.icon}</div>
            <b className='text-lg tracking-wide text-gray-900 group-hover:text-primary transition-colors'>{item.title}</b>
            <p className='leading-relaxed text-sm'>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
