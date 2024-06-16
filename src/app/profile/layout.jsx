import Header from "@/app/components/layout/header/Header";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Header title={"My Profile"} />
      {children}
    </div>
  );
}
