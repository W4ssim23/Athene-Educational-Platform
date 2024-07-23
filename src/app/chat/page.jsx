// import { ChatEngine } from "react-chat-engine";
import Chatt from "./components/Chat";

export default function Chat() {
  return <h1 className="text-4xl font-bold text-blue-700">Soon ...</h1>;
  return (
    // <main className="flex min-h-screen  flex-col items-center justify-between pt-24">
    //   <h1 className="text-4xl font-bold">Chat page</h1>
    // </main>
    <main className="w-full">
      <Chatt />
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </main>
  );
  // return (
  //   <main className="w-full">
  //     {/* <ChatEngine
  //       projectID="1336cab6-40ad-4ba4-b3a4-6ea408c8b85e"
  //       userName="admin"
  //       userSecret="admin"
  //     /> */}
  //   </main>
  // );
}
