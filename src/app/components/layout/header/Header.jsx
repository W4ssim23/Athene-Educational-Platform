import { Gear, Bell, logout, LogoW } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import UsreInfo from "./UsreInfo";
import Title from "./Title";
import Logoo from "./Logoo";

const Header = async () => {
  return (
    <div className="relative flex  font-poppins justify-between w-full">
      <div className="flex items-center gap-[6px]">
        <Logoo />
        <Title />
      </div>
      <UsreInfo />
      {/* {show && <Dropdown />} */}
    </div>
  );
};

export default Header;

// const Dropdown = () => {
//   const { Auth } = useAuth();
//   return (
//     <div className="absolute z-10 right-[-8px] rounded-md bg-white w-[150px] top-[60px] flex flex-col  ">
//       {Auth.role != "admin" && (
//         <div className=" hover:bg-[#FCC43E]  h-[50px] gap-2 rounded-t-md opacity-90 flex items-center justify-center hover:cursor-pointer p-2 transition-all">
//           <img src={Bell} className="w-[25px]" alt="" />
//           <Link to={"/notifications"} className="text-black  font-semibold">
//             Notification
//           </Link>
//         </div>
//       )}
//       <LogoutButton />
//     </div>
//   );
// };

// import { logout } from "../assets";
// import { useNavigate } from "react-router-dom";

// function LogoutButton() {
//   const { authTokens, setAuthTokens } = useAuthTokens();
//   const { setAuth } = useAuth();
//   const { Auth } = useAuth();

//   const navigate = useNavigate();
//   const logoutUser = async () => {
//     setAuthTokens(null);
//     setAuth(null);
//     localStorage.removeItem("authTokens");
//     navigate("/login");
//   };
//   return (
//     <div onClick={() => {logoutUser()}} className={`${Auth.role == 'admin' ? ' rounded-md' : 'rounded-b-md'} hover:bg-[#FF4550] h-[50px] gap-2  p-2 flex items-center justify-center hover:cursor-pointer transition-all`}>
//       <img src={logout} className="w-[20px]" alt="" />
//       <p className="text-black font-semibold">Logout</p>
//     </div>
//   );
// }
