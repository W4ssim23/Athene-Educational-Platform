import Image from "next/image";
import TempLogout from "./components/TempLogout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Home page</h1>
      <TempLogout />
    </main>
  );
}
