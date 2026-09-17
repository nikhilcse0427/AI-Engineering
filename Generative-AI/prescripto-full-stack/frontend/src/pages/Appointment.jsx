import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='animate-fade-in'>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-6 mt-4 relative'>
                {/* Image Section */}
                <div className='w-full sm:max-w-72 relative group'>
                    <div className='absolute -inset-1 bg-gradient-to-br from-blue-400 to-sky-300 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-500'></div>
                    <img className='bg-blue-500 w-full rounded-2xl relative shadow-lg group-hover:-translate-y-1 transition duration-500' src={docInfo.image} alt={docInfo.name} />
                </div>

                {/* Doctor Info Card */}
                <div className='flex-1 border border-blue-50 rounded-3xl p-8 py-7 bg-white shadow-xl shadow-blue-50/50 mx-2 sm:mx-0 mt-[-80px] sm:mt-0 relative overflow-hidden group hover:border-blue-100 transition-colors'>
                    <div className='absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-sky-400 to-primary'></div>

                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-3xl font-bold text-gray-800 tracking-tight'>
                        {docInfo.name} <img className='w-6' src={assets.verified_icon} alt="Verified" title="Verified Professional" />
                    </p>
                    <div className='flex items-center gap-3 mt-2 text-gray-600 font-medium'>
                        <span className='flex items-center gap-1 bg-blue-50 text-primary px-3 py-1 rounded-full text-sm inline-flex'>
                            <span className='text-lg'>🎓</span> {docInfo.degree} - {docInfo.speciality}
                        </span>
                        <span className='bg-sky-50 text-sky-600 px-4 py-1 border border-sky-100 text-xs font-semibold rounded-full shadow-sm'>{docInfo.experience}</span>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className='mt-6 bg-blue-50/30 p-5 rounded-2xl border border-blue-50'>
                        <p className='flex items-center gap-2 text-sm font-bold text-gray-800'>
                            About <img className='w-3 opacity-70' src={assets.info_icon} alt="Info" />
                        </p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-2 leading-relaxed'>
                            {docInfo.about}
                        </p>
                    </div>

                    <div className='mt-6 flex flex-col sm:flex-row sm:items-center gap-2 font-medium'>
                        <p className='text-gray-500'>Appointment fee:</p>
                        <span className='text-xl text-primary font-bold bg-blue-50 px-4 py-1 rounded-lg'>{currencySymbol}{docInfo.fees}</span>
                    </div>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-[19.5rem] mt-12 bg-white p-8 rounded-3xl shadow-lg shadow-blue-50 border border-blue-50'>
                <p className='font-bold text-xl text-gray-800 flex items-center gap-2'>
                    <span className='text-2xl'>📅</span> Select Booking Slot
                </p>

                {/* Date scroller */}
                <div className='flex gap-4 items-center w-full overflow-x-scroll mt-6 pb-4 scrollbar-hide'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div
                            onClick={() => setSlotIndex(index)}
                            key={index}
                            className={`flex flex-col items-center justify-center py-4 min-w-[5rem] rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${slotIndex === index ? 'bg-gradient-to-br from-primary to-sky-500 text-white scale-105 border-0' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'}`}
                        >
                            <p className={`text-sm font-medium ${slotIndex === index ? 'text-blue-100' : 'text-gray-400'}`}>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-2xl font-bold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time scroller */}
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 pb-4 scrollbar-hide'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p
                            onClick={() => setSlotTime(item.time)}
                            key={index}
                            className={`text-sm font-medium flex-shrink-0 px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${item.time === slotTime ? 'bg-gradient-to-r from-blue-500 to-primary text-white shadow-md shadow-primary/30' : 'text-gray-500 bg-gray-50 hover:bg-blue-50 hover:text-primary border border-gray-100'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button
                    onClick={bookAppointment}
                    className='w-full sm:w-auto mt-8 bg-gradient-to-r from-primary to-sky-500 text-white font-semibold px-12 py-4 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-lg flex items-center justify-center gap-2'
                >
                    Book an Appointment <span>→</span>
                </button>
            </div>

            {/* Listing Releated Doctors */}
            <div className='mt-16'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>

        </div>
    ) : null
}

export default Appointment