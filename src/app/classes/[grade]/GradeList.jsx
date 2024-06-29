import AddClass from "./AddClass";
import LevelList from "./LevelList";

function GradeList({ grade, levels }) {
  return (
    <div>
      <AddClass grade={grade} />
      <div className="m-[15px] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
        <div className="pl-2 flex flex-col gap-12 transition ease-in-out delay-50">
          {levels.map(
            (lvl, indx) =>
              lvl.length > 0 && (
                <div className="flex flex-col gap-2" key={indx}>
                  <h1 className="text-[#303972] text-[27px] font-bold mb-4 ml-5">
                    {String(indx + 1) +
                      " " +
                      (indx === 0 ? "ère" : "éme") +
                      " " +
                      "année" +
                      " " +
                      (grade.toLowerCase() == "cem"
                        ? "moyenne"
                        : grade.toLowerCase())}
                  </h1>
                  <LevelList key={indx} claSs={lvl} />
                </div>
              )
          )}
        </div>
        <div className="sm:hidden">
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default GradeList;
