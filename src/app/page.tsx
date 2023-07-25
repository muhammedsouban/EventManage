"use client"
import EventForm from '@/Components/EventForm'
import EventList from '@/Components/EventList'
import Navbar from '@/Components/Navbar'
import React, { useState } from 'react'

export default function Home() {
  const [isShow, setIsShow] = useState(false)

  const handleForm = () => {
    setIsShow(!isShow)
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen justify-center  p-24">
        <div className='w-full'>
          <div className='flex justify-between w-full mb-2'>
            <button className='border rounded-md py-1 border-gray-800 px-5' onClick={handleForm}>Create Event</button>
          </div>
          <div className='w-full'>
            <EventList  create={isShow}/>
          </div>
          {isShow && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex z-10 justify-center items-center">
              <EventForm show={handleForm} />
            </div>
          )}

        </div>

      </main>
    </>
  )
}
