import { Event } from "@/type";

export default function SelectEvent({ event}: { event: Event; }) {
  const { eventName, address, time, } = event;
  return (
    <div className="bg-blue-200 p-1 text-black h-full"
    >
      <div>
        <p>{eventName}</p>
        <p>{address}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}
