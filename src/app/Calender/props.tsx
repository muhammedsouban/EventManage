import SelectEvent from "@/Components/Event";
import moment from "moment";
import { momentLocalizer, Views } from "react-big-calendar";

const localizer = momentLocalizer(moment);

const components: any = {
  event: ({ event }: any) => {
    const data = event?.data;
    if (data?.event)
      return <SelectEvent event={data?.event} />;
    return null;
  },
};

export const props = {
  components,
  localizer,
  defaultDate: new Date(),
  defaultView: Views.MONTH,
  max: moment("2023-10-10T16:00:00").toDate(),
  min: moment("2023-10-10T08:00:00").toDate(),
};