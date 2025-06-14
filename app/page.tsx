import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col items-center gap-y-4 mt-10">
        <h1 className="head_text">TrainSmartCoach</h1>
        <button className="btn_primary">Start Drill</button>
        <button className="btn_secondary">Add New</button>
        <button className="btn_outline">View Details</button>
      </div>
    </>
  );
}
