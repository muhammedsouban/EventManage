import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { Event } from '@/type';
import EditEvent from './EditEvent';
import DeleteModal from './DeleteModal';

interface EventFormProps {
    create: boolean;
}

const EventList = ({ create }: EventFormProps) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [eventId, setEventId] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('Events') || '[]');
        setEvents(storedEvents)
    }, [showEditModal, create])

    const Delete = (id: string) => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
        localStorage.setItem('Events', JSON.stringify(updatedEvents));
        handleDeletModal()
    }

    const handleEditModal = () => {
        setShowEditModal(!showEditModal)
    }
    const handleDeletModal = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const handleDelete = (id: string) => {
        handleDeletModal()
            setEventId(id)
    }

    const handleEdit = (id: string) => {
        handleEditModal()
            setEventId(id)
    }

    return (
        <div className="">
            <div className="overflow-x-auto">
                <table className="table-auto w-full ">
                    <thead className='text-white text-left'>
                        <tr className='bg-gray-800 '>
                            <th className="px-4 py-2">Event Name</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Start Time</th>
                            <th className="px-4 py-2">End Time</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {events.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.eventName}</td>
                                <td className="border px-4 py-2">{item.address}</td>
                                <td className="border px-4 py-2">{moment(item.time).format("HH:mm A")}</td>
                                <td className="border px-4 py-2">{moment(item.end).format("HH:mm A")}</td>

                                <td className="border px-4 py-2">
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <BsFillTrashFill size={22} color="red" className="me-5" onClick={() => handleDelete(item.id)} />
                                        <BsFillPencilFill color="green" size={22} onClick={() => handleEdit(item.id)} />
                                    </span>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
            {showEditModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex z-10 justify-center items-center">
                    <EditEvent show={handleEditModal} id={eventId} />
                </div>
            )}
            {showDeleteModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex z-10 justify-center items-center">
                    <DeleteModal delete={Delete} show={handleDeletModal} id={eventId} />
                </div>
            )}
        </div>
    );
};

export default EventList;


