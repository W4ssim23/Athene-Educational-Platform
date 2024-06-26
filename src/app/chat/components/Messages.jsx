import DotsIcon from "@/app/students/components/table/actions/DotsIcon";
import Send from "./Send";
import { Avatar } from "@nextui-org/react";
const Messages = () => {
  return (
    <div className="flex flex-col h-full  ">
      <div>
        <Head />
      </div>
      <hr />
      <div className="overflow-y-scroll">
        <Msgs data={Receivedmsgs} type={"r"} />
        <Msgs data={Sentmsgs} type={"s"} />
        <Msgs data={[{ msg: "hahah thank u", time: "12:04AM" }]} type={"r"} />
      </div>
      <hr />
      <div className="py-4 w-full flex justify-center ">
        <div
          className="relative flex px-4 justify-start 
        items-center gap-3 py-4 sm:py-2  w-[95%] h-[65px] rounded-full bg-white border  "
        >
          <div>
            {/* will get the pfp from the session , to do later */}
            <Avatar className="w-[48px] h-[48px]" fallback />
          </div>
          <div className="flex-1">
            <input
              placeholder="Write your message..."
              type="text"
              id="SendMessageInput"
              className=" text-center sm:text-left font-poppins font-[500] bg-transparent outline-none flex-1 w-full"
            />
          </div>
          <div className=" cursor-pointer w-[25px] h-[25px]">
            {/* <img className="w-[25px] h-[25px]" src={Send} /> */}
            <Send />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
// Head component
const Head = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-7">
      <div className="w-[45px] h-[45px] bg-bgfakeWhite rounded-full"></div>
      <p className="text-[#303972] text-[16px] font-[600] flex-1">
        Abd Lhadi Boughiout
      </p>
      {/* <img className="cursor-pointer" src={dots} alt="" /> */}
      <div className="cursor-pointer">
        <DotsIcon />
      </div>
    </div>
  );
};

const Msgs = ({ data, type }) => {
  return (
    <div
      className={`flex-1 p-5 flex gap-3 w-full flex-col ${
        type == "r" ? "" : "items-end"
      }`}
    >
      {type == "r" &&
        data.map((msgs, index) => (
          <Received
            key={index}
            msgs={msgs}
            last={index === Receivedmsgs.length - 1}
          />
        ))}
      {type == "s" &&
        data.map((msgs, index) => (
          <Sent key={index} msgs={msgs} last={index === Sentmsgs.length - 1} />
        ))}
    </div>
  );
};

// RECEVING MESSAGES COMPONENTS

const Received = ({ msgs, last = false }) => {
  return (
    <div
      className={` bg-[#F5F5F5] w-fit p-3 ${
        last ? "rounded-tl-xl rounded-r-xl" : "rounded-xl"
      } text-[#303972]`}
    >
      {msgs.msg}
    </div>
  );
};

const Receivedmsgs = [
  { msg: "Hey, how are you?" },
  { msg: "I love the girls ." },
  { msg: "give me ur number." },
]; // received messages in short period of time

// SENDING MESSAGES COMPONENTS

const Sent = ({ msgs, last = false }) => {
  return (
    <div
      className={` bg-primary w-fit p-3 ${
        last ? "rounded-tr-xl rounded-l-xl" : "rounded-xl"
      } text-white`}
    >
      {msgs.msg}
    </div>
  );
};

const Sentmsgs = [
  { msg: "I am good ", time: "12:00AM" },
  { msg: "i think u'r boughiout ...🤔", time: "12:01AM" },
  { msg: "u'r soo handsome , here's my number", time: "12:02AM" },
  { msg: "0542243592", time: "12:02AM" },
]; // sent messages in short period of time
