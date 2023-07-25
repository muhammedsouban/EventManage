"use client"
import Navbar from '@/Components/Navbar';
import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, Views, DateLocalizer, stringOrDate } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { props } from './props';
import { EventItem, Event } from '@/type';
import EventDetails from '@/Components/DetailsPopup';
import moment from 'moment';

const DnDCalendar = withDragAndDrop<EventItem>(Calendar);

function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [data, setData] = useState<EventItem[]>([])
  const [showModel, setShowModel] = useState(false)
  const [details, setDetails] = useState<EventItem>({})

  const onChangeEventTime = useCallback(
    ({ event, start, end }: { event: EventItem; start: stringOrDate; end: stringOrDate }) => {
      setData((prevEvents) =>
        prevEvents.map((prevEvent) =>
          prevEvent?.data?.event?.id === event?.data?.event?.id
            ? { ...event, start, end }
            : prevEvent
        )
      );
    },
    []
  );

  const [draggedEvent, setDraggedEvent] = useState<
    Event | "undroppable"
  >();

  const onDroppedFromOutside = useCallback(
    ({
      start,
      end,
    }: {
      start: stringOrDate;
      end: stringOrDate;
    }) => {
      if (draggedEvent === "undroppable") return;
      setData((prevEvents) => [
        ...prevEvents,
        {
          start,
          end,
          data: { event: draggedEvent },
          isDraggable: true,
          isResizable: true,
        },
      ]);
    },
    [draggedEvent]
  );

  const handleClick = () => {
    setShowModel(!showModel)
  };

  const handleEvent = (event?: EventItem) => {
    setDetails(event || {});
  }

  const onSelectEvent = (event: EventItem) => {
    handleClick()
    handleEvent(event)
  }

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('Events') || '[]');
    setEvents(storedEvents);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-24 bg-slate-200 py-5">
        <h2 className='text-2xl font-bold'>Events</h2>
        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 ">
      {events.map((item, index) => (
        <div
          className="bg-slate-700 text-white rounded-md p-3"
          key={index}
          draggable="true"
          onDragStart={() => setDraggedEvent(item)}
        >
          <p>{item.eventName}</p>
          <p>{item.address}</p>
          <p>{moment(item.time).format("HH:mm A")}</p>
        </div>
      ))}
    </div>

      </div>
      <main className="flex min-h-screen justify-center p-24 bg-slate-100">
        <div className="w-full ">
          <DnDCalendar
            {...props}
            events={data}
            onEventDrop={onChangeEventTime}
            onEventResize={onChangeEventTime}
            onDropFromOutside={onDroppedFromOutside}
            draggableAccessor={(event) => !!event.isDraggable}
            resizableAccessor={"isResizable"}
            onSelectEvent={(event) => onSelectEvent(event)}

          />
        </div>

      </main>
      {showModel && details && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex z-10 justify-center items-center">
          <EventDetails show={handleClick} details={details} />
        </div>
      )}
    </>
  );
}

export default Page;
