import { Inbox, MobileInbox } from "./components";

//would be better if the inbox component handles both mobile and desktop view

export default function Layout({ children }) {
  return (
    <div className="font-poppins h-[88vh] sm:h-[80vh] sm:mb-0 mb-[30px] flex flex-col gap-5 sm:gap-9">
      <div className="relative flex rounded-xl bg-white justify-center overflow-hidden select-none gap-0 h-screen">
        <div className="h-full hidden sm:flex">
          <Inbox />
        </div>
        <MobileInbox />
        <div className="flex-1">{children}</div>
      </div>
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
