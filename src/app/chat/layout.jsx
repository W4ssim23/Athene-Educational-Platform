import { Inbox } from "./components";

export default function Layout({ children }) {
  return (
    <div className="font-poppins h-[88vh] sm:h-[80vh] sm:mb-0 mb-[30px] flex flex-col gap-5 sm:gap-9">
      <div className="relative flex rounded-xl bg-white justify-center overflow-hidden select-none gap-0 h-screen">
        <Inbox />
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
