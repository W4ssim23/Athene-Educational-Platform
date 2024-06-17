//loading the profile page
//might put the skeleton loader here

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary"></div>
    </div>
  );
}
