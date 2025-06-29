"use client";

import DrillCard from "@/components/DrillCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface User {
  _id: string;
  username: string;
  email?: string;
  password?: string;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
        <DrillCard
          title={"3v1"}
          desc={"En øvelse"}
          imageUrl={
            "https://bc-storage-eu.ams3.digitaloceanspaces.com/platform/126.svg"
          }
        />
      </div>
    </div>
  );
}
