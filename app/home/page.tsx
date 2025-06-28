"use client";

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
      <h1 className="text-3xl font-bold text_primary mb-4">
        Welcome, {session?.user?.username}
      </h1>
    </div>
  );
}
