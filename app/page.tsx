import Hero from "@/components/Hero";
import USP from "@/components/USP";

export default function Home() {
  return (
    <>
      <Hero />
      <USP />
      <div className="flex flex-col items-center gap-y-4 mt-10">
        <h1 className="head_text">TrainSmartCoach</h1>
        <button className="btn_primary">Start Drill</button>
        <button className="btn_secondary">Add New</button>
        <button className="btn_outline">View Details</button>
      </div>
    </>
  );
}
