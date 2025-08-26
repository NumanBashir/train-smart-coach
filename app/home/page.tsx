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

interface Category {
  technical: string[];
  tactical: string[];
  physical: string[];
  gameSituations: string[];
}

interface Equipment {
  name: string;
  quantity: number;
  bibColorQuantities: number[];
}

// Has to be same as in model/schema
interface Drill {
  title: string;
  description: string;
  images: string[];
  ageGroup: string[];
  category: Category;
  minPlayers: number;
  maxPlayers: number;
  equipment: Equipment[];
  duration: number;
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
      <div className="flex flex-row items-center justify-center gap-4 mb-6">
        <p className="text-lg text-gray-700">
          Here are some drills to get you started:
        </p>
        <button
          className="btn btn_secondary"
          onClick={() => router.push("/create-drill")}
        >
          Create New Drill
        </button>
      </div>

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
