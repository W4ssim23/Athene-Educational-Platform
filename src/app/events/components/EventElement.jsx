import { CalendarR, Clock } from "../Icons";
import { Button } from "@nextui-org/react";
import EventButtons from "./EventButtons";

const EventElement = ({ role, eventData }) => {
  const time =
    eventData?.end && eventData.end !== ""
      ? eventData.start + " - " + eventData.end
      : eventData.start;

  return (
    <div className="relative flex flex-col sm:flex-row w-[100%] sm:w-[75%] min-h-[175px] rounded-lg overflow-hidden bg-white p-2">
      <div className="absolute top-0 left-0 sm:h-full sm:w-[10px] bg-orange w-full h-[10px]"></div>
      <div className="flex flex-col items-start p-2 pl-[4%] py-[18px] sm:pl-[8%] gap-2">
        <h3 className="text-[#303972] font-poppins font-bold text-[25px] capitalize">
          {eventData.title}
        </h3>
        <p className="sm:text-lg text-black pl-2 sm:max-w-[85%] sm:min-w-[372px] ">
          {eventData.description}
        </p>
        <div>
          <IconText
            picture={<CalendarR />}
            Text={eventData.date.split("-").reverse().join("-")}
          />
          <IconText picture={<Clock />} Text={time} />
        </div>
      </div>
      <EventButtons role={role} ableToVote={eventData.votes} data={eventData} />
    </div>
  );
};

export default EventElement;

const IconText = ({ picture, Text }) => {
  return (
    <div className="flex m-1 my-2 items-center rounded-full overflow-hidden ">
      <Button isIconOnly radius="full" className="p-2 bg-transparent">
        {picture}
      </Button>
      <p className={`text-[#303972]  m-1 ml-3 font-bold`}>{Text}</p>
    </div>
  );
};
