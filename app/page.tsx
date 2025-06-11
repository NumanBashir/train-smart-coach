export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center gap-y-4 mt-10">
        <h1 className="text-3xl">TrainSmartCoach</h1>
        <button className="btn-primary">Start Drill</button>
        <button className="btn-secondary">Add New</button>
        <button className="btn-outline">View Details</button>
      </div>
    </>
  );
}
