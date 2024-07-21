export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-[80vh] items-center">
      {children}{" "}
      <div className="sm:hidden">
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
