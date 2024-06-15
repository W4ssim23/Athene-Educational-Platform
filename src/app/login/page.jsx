import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Login = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/classes");
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Login;
