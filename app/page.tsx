import Hero from "@/components/Hero";
import FeaturedClubs from "@/components/FeaturedClubs";
import Features from "@/components/Features";
import ImageHeaderTextBlockRight from "@/components/ImageHeaderTextBlockRight";
import ImageHeaderTextBlockLeft from "@/components/ImageHeaderTextBlockLeft";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedClubs />
      <Features />
      <ImageHeaderTextBlockRight reverse={true} />
      <ImageHeaderTextBlockLeft />
      {/* <div className="flex flex-col items-center gap-y-4 mt-10">
        <h1 className="head_text">TrainSmartCoach</h1>
        <button className="btn_primary">Start Drill</button>
        <button className="btn_secondary">Add New</button>
        <button className="btn_outline">View Details</button>
      </div> */}
    </>
  );
}
