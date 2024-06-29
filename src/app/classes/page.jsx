//student redirect directly to his class

import GradesList from "./Grades";

//teacher gets a diffrent view of classes

export default async function Classes() {
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
