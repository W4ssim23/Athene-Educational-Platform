import StudyClass from "./StudyClass";

function LevelList({ claSs }) {
  claSs = claSs || [];
  claSs = claSs.filter((classe) => classe !== null || classe !== undefined);

  return (
    <div className="flex flex-wrap w-auto gap-5  items-center  transition ease-in-out delay-50">
      {claSs.map((classObj) => (
        <StudyClass
          key={classObj.id}
          classId={classObj.id}
          grade={classObj.grade}
          year={String(classObj.year)}
          number={classObj.number}
        />
      ))}
    </div>
  );
}

export default LevelList;
