import React, { useState } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { parseISO } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { v4 as uuidv4 } from 'uuid';
import { Event, EventItem } from "@/type";
import moment from "moment";

type ShowFunction = () => void;


interface EventFormProps {
    show: ShowFunction;
    details: EventItem;
}

export default function EventDetails({ show,details}: EventFormProps) {

    return (
        <div>
            <div className='flex justify-center items-center absolute left-0 right-0 bottom-0 top-0'>
                <div className="bg-[#E8F5FF] min-w-[300px] max-w-[400px] py-5 px-4 rounded-lg shadow-lg">

                    <div className="flex justify-between items-center pb-5">
                        <button onClick={show} className="top-0 relative left-2" >
                            <BiArrowBack size={20} />
                        </button>
                        <h1 className="sm:text-xl text-center">Event Details</h1>
                        <div></div>
                    </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Event Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                disabled
                                    type="text"
                                    value={details.data?.event?.eventName}
                                    name="name"
                                    className="block w-full mt-1 px-2 rounded-md shadow-sm outline-none text-black py-1 border border-neutral-400"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                disabled
                                    type="text"
                                    value={details.data?.event?.address}
                                    name="address"
                                    className="block w-full mt-1 px-2 rounded-md shadow-sm outline-none text-black py-1 border border-neutral-400"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700">
                                Time
                            </label>
                            <div className="bg-white">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <div>
                                        <TimePicker
                                        disabled
                                            value={moment(`${details.data?.event?.time}`).toDate()}
                                            className="w-full"
                                        />
                                    </div>
                                </LocalizationProvider>
                            </div>
                            <p>To</p>
                            <div className="bg-white">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <div>
                                        <TimePicker
                                        disabled
                                            value={moment(`${details.data?.event?.end}`).toDate()}
                                            className="w-full"
                                        />
                                    </div>
                                </LocalizationProvider>
                            </div>
                        </div>

                        <div className="flex items-center mt-4">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-purple-600"
                            >
                                PROCEED
                            </button>
                        </div>
                </div>
            </div>
        </div>
    );
}
