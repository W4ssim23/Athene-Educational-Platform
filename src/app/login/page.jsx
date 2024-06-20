import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Login = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <main className="sm:pr-[100px] lg:pr-[22.3%] mt-[-67px]">
      <LoginForm />
    </main>
  );
};

export default Login;
