import Inbox from "./Inbox";
import Messages from "./Messages";
const Chat = () => {
  return (
    <div className="font-poppins h-[80vh] sm:mb-0 mb-[30px]  flex flex-col gap-5 sm:gap-9">
      <div className="relative flex rounded-xl bg-white justify-center overflow-hidden select-none gap-0 h-screen ">
        <Inbox />
        <div className="flex-1">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Chat;
