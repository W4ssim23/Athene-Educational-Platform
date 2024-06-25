import TeacherCard from "./TeacherCard";
import { TeachersListSkeleton } from "./Skeleton";

export default function TeachersList() {
  // teachers = teachers || [];
  // teachers = teachers.filter((teach) => teach !== null || teach !== undefined);
  // teachers = teachers.filter((teach) => teach.id !== 9);

  //add skeleton when fetch !
  const teachers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      speciality: "Maths",
      pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
      phone: "1234567890",
      email: "dgg@gg.tt",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      speciality: "Maths",
      pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
      phone: "1234567890",
      email: "dgg@gg.tt",
    },
    {
      id: 3,
      firstName: "John",
      lastName: "Doe",
      speciality: "Maths",
      pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
      phone: "1234567890",
      email: "dgg@gg.tt",
    },
    {
      id: 4,
      firstName: "John",
      lastName: "Doe",
      speciality: "Maths",
      pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
      phone: "1234567890",
      email: "dgg@gg.tt",
    },
    {
      id: 5,
      firstName: "John",
      lastName: "Doe",
      speciality: "Maths",
      pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
      phone: "1234567890",
      email: "dgg@gg.tt",
    },
    {
      id: 6,
      firstName: "John",
      lastName: "Doe",
      speciality: "Maths",
      pfp: "https://www.japanfm.fr/wp-content/uploads/2021/10/Super-Saiyan-3-Goku-1.jpg",
      phone: "1234567890",
      email: "dgg@gg.tt",
    },
  ];

  return (
    <div className="flex flex-wrap w-auto gap-7 justify-center items-center sm:justify-start">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
