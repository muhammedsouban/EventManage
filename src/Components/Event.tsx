import { Event } from "@/type";
import moment from "moment";

export default function SelectEvent({ event}: { event: Event; }) {
  const { eventName, address, time,end } = event;
  return (
    <div className="bg-blue-200 p-1 text-black h-full"
    >
      <div>
        <p>{eventName}</p>
        <p>{address}</p>
        <div className="flex">
        <p className="me-2">{moment(time).format('HH:mm A')}</p>
        <p className="me-2">To</p>
        <p>{moment(end).format('HH:mm A')}</p>
        </div>

      </div>
    </div>
  );
}
