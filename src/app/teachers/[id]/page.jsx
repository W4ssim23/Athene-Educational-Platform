import Content from "./components/Content";

export default function TeacherProfile({ params }) {
  return (
    <main className="w-full sm:mb-0 mb-20">
      <Content id={params.id} />
    </main>
  );
}
