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
      <ImageHeaderTextBlockRight mobileReverse={true} />
      <ImageHeaderTextBlockLeft mobileReverse={false} />
    </>
  );
}
