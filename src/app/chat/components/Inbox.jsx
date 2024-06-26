import SearchBar from "@/app/components/ui/SearchBar";
import Conversation from "./Conversation";
const Inbox = () => {
  return (
    <div className="sm:py-9 sm:pl-7  flex flex-col gap-[30px] overflow-y-scroll border-r-2">
      <h1 className="text-[rgb(48,57,114)] text-[20px] font-[600] hidden sm:block">
        Messages
      </h1>
      <div className="hidden sm:block">
        <SearchBar />
      </div>
      <div className="flex flex-col gap-3 bg-bgfakeWhite rounded-tl-xl rounded-bl-xl items-center sm:items-start p-2 sm:bg-white">
        <p className="text-[19px] text-[#A098AE] font-[500] hidden sm:block">
          Groups
        </p>
        <div className="flex flex-col">
          {Groups.map((data, index) => (
            <Conversation data={data} conversationId={data.unreadMessages} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-bgfakeWhite rounded-tl-xl rounded-bl-xl items-center sm:items-start p-2 sm:bg-white">
        <p className="text-[19px] text-[#A098AE] font-[500] hidden sm:block">
          Chats
        </p>
        <div className="flex flex-col">
          {Chats.map((data, index) => (
            <Conversation data={data} conversationId={data.unreadMessages} />
          ))}
        </div>
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Inbox;

const Chats = [
  {
    name: "Action|Adventure|Drama|War",
    lastMessage: "King Arthur",
    messageDate: "23:27",
    unreadMessages: 3,
  },
  {
    name: "Romance",
    lastMessage: "Breaking Upwards",
    messageDate: "2:10",
    unreadMessages: 4,
  },
  {
    name: "Comedy|Drama",
    lastMessage: "Follow Me, Boys!",
    messageDate: "1:32",
    unreadMessages: 5,
  },
  {
    name: "Drama",
    lastMessage: "Newlyweds",
    messageDate: "5:46",
    unreadMessages: 1,
  },
  {
    name: "Drama|Romance",
    lastMessage: "Possessed",
    messageDate: "3:56",
    unreadMessages: 1,
  },
];

const Groups = [
  {
    name: "Crime|Drama|Mystery|Thriller",
    lastMessage: "Twin Peaks: Fire Walk with Me",
    messageDate: "7:58",
    unreadMessages: 2,
  },
  {
    name: "Documentary",
    lastMessage: "Bill Cunningham New York",
    messageDate: "4:08",
    unreadMessages: 1,
  },
  {
    name: "Horror|Thriller",
    lastMessage: "Octane",
    messageDate: "9:52",
    unreadMessages: 6,
  },
  {
    name: "Action|Drama|Thriller|Western",
    lastMessage: "Jonah Hex",
    messageDate: "19:40",
    unreadMessages: 3,
  },
  {
    name: "Drama|Mystery|Thriller",
    lastMessage: "Da Vinci Code, The",
    messageDate: "9:45",
    unreadMessages: 4,
  },
];
