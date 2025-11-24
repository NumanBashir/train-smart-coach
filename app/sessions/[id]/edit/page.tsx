"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import SessionBuilder from "@/components/sessions/SessionBuilder";
import { SessionDrill } from "@/components/sessions/types";

export default function EditSessionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && params.id) {
      fetchSession();
    }
  }, [status, params.id]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/sessions/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
      } else {
        router.push("/sessions");
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      router.push("/sessions");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!sessionData) {
    return null;
  }

  // Format dateTime for input
  const dateTimeValue = sessionData.dateTime
    ? new Date(sessionData.dateTime).toISOString().slice(0, 16)
    : "";

  return (
    <SessionBuilder
      sessionId={params.id as string}
      initialData={{
        title: sessionData.title,
        focus: sessionData.focus,
        notes: sessionData.notes || "",
        dateTime: dateTimeValue,
        drills: sessionData.drills as SessionDrill[],
        totalDuration: sessionData.totalDuration,
      }}
    />
  );
}

