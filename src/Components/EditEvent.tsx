import React, { useEffect, useState } from "react";
import { BiArrowBack } from 'react-icons/bi';
import { parseISO } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Event } from "@/type";

type ShowFunction = () => void;
type Id = string;

interface EventFormProps {
    show: ShowFunction;
    id: Id;
}

export default function EditEvent({ show, id }: EventFormProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [time, setTime] = useState<Date | null>(parseISO('2023-7-23T00:00:00'));
    const [endTime, setEndTime] = useState<Date | null>(parseISO('2023-7-23T00:00:00'));

    const [eventName, setEventName] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const handleTimeChange = (newValue: Date | null) => {
        setTime(newValue);
    };

    const handleEndTimeChange = (newValue: Date | null) => {
        setEndTime(newValue);
    };

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('Events') || '[]');
        setEvents(storedEvents);
        const eventToEdit = storedEvents.find((event: Event) => event.id === id);
        if (eventToEdit) {
            setEventName(eventToEdit.eventName);
            setAddress(eventToEdit.address);
            setTime(parseISO(eventToEdit.time));
            setEndTime(parseISO(eventToEdit.end))
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (eventName && address && time && endTime) {
            const timeDifference = (endTime.getTime() - time.getTime()) / (1000 * 60);
    
            if (timeDifference >= 30) {
                const updatedEvents = events.map((event: Event) =>
                    event.id === id ? { ...event, eventName, address, time: time.toISOString(), end: endTime.toISOString() } : event
                );
    
                setEvents(updatedEvents);
    
                localStorage.setItem('Events', JSON.stringify(updatedEvents));
                show();
            } else {
                alert("End time must be greater than 30 minutes from the start time.");
            }
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center absolute left-0 right-0 bottom-0 top-0'>
                <div className="bg-[#E8F5FF] min-w-[300px] max-w-[400px] py-5 px-4 rounded-lg shadow-lg">

                    <div className="flex justify-between items-center pb-5">
                        <button onClick={show} className="top-0 relative left-2" >
                            <BiArrowBack size={20} />
                        </button>
                        <h1 className="sm:text-xl text-center">Edit Event</h1>
                        <div></div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Event Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    onChange={(e) => setEventName(e.target.value)}
                                    value={eventName}
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
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
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
                                            value={time}
                                            onChange={handleTimeChange}
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
                                            value={endTime}
                                            onChange={handleEndTimeChange}
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
                    </form>
                </div>
            </div>
        </div>
    );
}
