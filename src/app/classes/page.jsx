import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GradesList from "./Grades";
import TeacherClasses from "./TeacherClasses";
import { redirect } from "next/navigation";

export default async function Classes() {
  const session = await getServerSession(authOptions);
  const { user } = session;

  // console.log("User Class:", user.classId);
  if (user.classId && user.grade) {
    redirect(`/classes/${user.grade}/${user.classId}`);
  }

  if (!user || user.role === "student") {
    return (
      <main className="w-full min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary">
          You are not authorized to perform this action.
        </h1>
      </main>
    );
  }

  if (user.role === "teacher") {
    return <TeacherClasses user={user} />;
  }

  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center">
      <GradesList />
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </main>
  );
}
