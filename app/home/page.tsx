"use client";

import DrillCard from "@/components/DrillCard";
import DrillModal from "@/components/DrillModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email?: string;
  password?: string;
}

// Has to be same as in model/schema
interface Drill {
  title: string;
  description: string;
  images: string[];
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [allDrills, setAllDrills] = useState<Drill[]>([]);
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrillClick = (drill: Drill) => {
    setSelectedDrill(drill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDrill(null);
  };

  const fetchDrills = async () => {
    const response = await fetch("/api/drill");
    const data = await response.json();

    setAllDrills(data);
  };

  useEffect(() => {
    fetchDrills();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text_primary my-6">
        Welcome, {session?.user?.username}
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Here are some drills to get you started:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        {allDrills.map((drill, index) => (
          <DrillCard
            key={index}
            title={drill.title}
            desc={drill.description}
            imageUrl={
              drill.images.length > 0
                ? drill.images[0]
                : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            onClick={() => handleDrillClick(drill)}
          />
        ))}
        {isModalOpen && selectedDrill && (
          <DrillModal drill={selectedDrill} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
