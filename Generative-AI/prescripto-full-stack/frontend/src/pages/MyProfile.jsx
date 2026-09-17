import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success("Profile successfully updated")
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='max-w-[900px] mx-auto my-6 animate-fade-in text-sm'>

            {/* Main Clerk-like Card Panel */}
            <div className='bg-white border border-[#e5e7eb] rounded-[14px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row'>

                {/* Left Sidebar (Desktop Only) */}
                <div className='w-56 bg-[#fcfcfd] border-r border-[#e5e7eb] p-5 hidden md:block flex-shrink-0'>
                    <div className='flex items-center gap-2 mb-4'>
                        <div className='w-7 h-7 rounded-sm bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm text-xs'>
                            {userData.name.charAt(0)}
                        </div>
                        <div className='leading-tight'>
                            <p className='text-[13px] font-semibold text-gray-900'>{userData.name}</p>
                            <p className='text-[11px] text-gray-500'>Personal account</p>
                        </div>
                    </div>

                    <h2 className='text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 pl-1'>Settings</h2>
                    <ul className='space-y-1 py-1'>
                        <li className='px-2.5 py-1.5 bg-gray-100/80 rounded-md text-gray-900 text-[13px] font-medium flex items-center gap-2.5 cursor-default'>
                            <span className='text-gray-500 text-xs'>👤</span> Profile
                        </li>
                    </ul>
                </div>

                {/* Right Main Content */}
                <div className='flex-1 p-5 md:p-7'>
                    <div className='flex items-center justify-between mb-5 pb-3 border-b border-gray-100'>
                        <h1 className='text-lg font-semibold text-gray-900 tracking-tight'>Profile details</h1>
                        <div className='flex gap-2.5'>
                            {isEdit ? (
                                <>
                                    <button
                                        onClick={() => { setIsEdit(false); setImage(false) }}
                                        className='text-[13px] font-medium text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50 shadow-sm transition-all'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={updateUserProfileData}
                                        className='text-[13px] font-medium text-white bg-primary rounded-md px-3 py-1.5 hover:bg-blue-600 shadow-sm transition-all'
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className='text-[13px] font-medium text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50 shadow-sm transition-all flex items-center gap-1.5'
                                >
                                    <span>✎</span> Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <div className='space-y-4'>

                        {/* 1. Profile Photo & Name Section */}
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 pb-4 border-b border-gray-100'>
                            <div className='sm:w-40 flex-shrink-0'>
                                <h3 className='text-[14px] font-semibold text-gray-900'>Profile</h3>
                                <p className='text-[12px] text-gray-500 mt-0.5 leading-relaxed'>Update your photo and personal details.</p>
                            </div>

                            <div className='flex-1 space-y-4'>
                                <div className='flex items-center gap-4'>
                                    {isEdit ? (
                                        <label htmlFor='image' className='cursor-pointer group flex items-center gap-4'>
                                            <div className='w-12 h-12 rounded-full overflow-hidden border border-gray-200 ring-2 ring-gray-50 group-hover:ring-gray-100 transition-all'>
                                                <img className='w-full h-full object-cover' src={image ? URL.createObjectURL(image) : userData.image} alt="Avatar" />
                                            </div>
                                            <div className='text-[12px] font-medium text-gray-700 bg-white border border-gray-300 rounded-md px-2.5 py-1 shadow-sm group-hover:bg-gray-50'>
                                                Change photo
                                            </div>
                                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                        </label>
                                    ) : (
                                        <div className='flex items-center gap-4'>
                                            <img className='w-12 h-12 rounded-full border border-gray-200 ring-2 ring-gray-50 object-cover' src={userData.image} alt="Avatar" />
                                        </div>
                                    )}
                                </div>

                                <div className='max-w-xs'>
                                    <label className='block text-[12px] font-medium text-gray-700 mb-1'>Full Name</label>
                                    {isEdit ? (
                                        <input
                                            className='w-full text-[13px] text-gray-900 border border-[#d1d5db] rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm'
                                            type="text"
                                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                            value={userData.name}
                                        />
                                    ) : (
                                        <div className='text-[14px] text-gray-900 py-0.5 font-medium'>{userData.name}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 2. Contact Information Section */}
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 pb-4 border-b border-gray-100'>
                            <div className='sm:w-40 flex-shrink-0'>
                                <h3 className='text-[14px] font-semibold text-gray-900'>Contact Info</h3>
                                <p className='text-[12px] text-gray-500 mt-0.5 leading-relaxed'>Where can we reach you and send medical updates.</p>
                            </div>

                            <div className='flex-1 space-y-3 max-w-xs'>
                                <div>
                                    <label className='block text-[12px] font-medium text-gray-700 mb-1'>Email Address</label>
                                    <div className='text-[13px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 cursor-not-allowed flex items-center justify-between'>
                                        {userData.email} <span className="text-[10px] text-gray-400">External</span>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-[12px] font-medium text-gray-700 mb-1'>Phone Number</label>
                                    {isEdit ? (
                                        <input
                                            className='w-full text-[13px] text-gray-900 border border-[#d1d5db] rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm'
                                            type="text"
                                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                            value={userData.phone}
                                        />
                                    ) : (
                                        <div className='text-[14px] text-gray-900 py-0.5'>{userData.phone}</div>
                                    )}
                                </div>

                                <div>
                                    <label className='block text-[12px] font-medium text-gray-700 mb-1'>Home Address</label>
                                    {isEdit ? (
                                        <div className='space-y-1.5'>
                                            <input
                                                className='w-full text-[13px] text-gray-900 border border-[#d1d5db] rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm'
                                                type="text"
                                                placeholder="Line 1"
                                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                                value={userData.address.line1}
                                            />
                                            <input
                                                className='w-full text-[13px] text-gray-900 border border-[#d1d5db] rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm'
                                                type="text"
                                                placeholder="Line 2"
                                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                                value={userData.address.line2}
                                            />
                                        </div>
                                    ) : (
                                        <div className='text-[13px] text-gray-900 leading-tight py-0.5'>{userData.address.line1}<br />{userData.address.line2}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 3. Basic Information Section */}
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 pb-2'>
                            <div className='sm:w-40 flex-shrink-0'>
                                <h3 className='text-[14px] font-semibold text-gray-900'>Personal Info</h3>
                                <p className='text-[12px] text-gray-500 mt-0.5 leading-relaxed'>Your demographic information.</p>
                            </div>

                            <div className='flex-1 flex gap-4 max-w-sm'>
                                <div className='w-1/2'>
                                    <label className='block text-[12px] font-medium text-gray-700 mb-1'>Gender</label>
                                    {isEdit ? (
                                        <select
                                            className='w-full text-[13px] text-gray-900 border border-[#d1d5db] rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm bg-white appearance-none'
                                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                            value={userData.gender}
                                        >
                                            <option value="Not Selected">Not Selected</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <div className='text-[14px] text-gray-900 py-0.5'>{userData.gender}</div>
                                    )}
                                </div>

                                <div className='w-1/2'>
                                    <label className='block text-[12px] font-medium text-gray-700 mb-1'>Date of Birth</label>
                                    {isEdit ? (
                                        <input
                                            className='w-full text-[13px] text-gray-900 border border-[#d1d5db] rounded-md px-2.5 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm'
                                            type="date"
                                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                            value={userData.dob}
                                        />
                                    ) : (
                                        <div className='text-[14px] text-gray-900 py-0.5'>{userData.dob}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile