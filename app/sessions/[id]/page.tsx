"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { SessionDrill, Drill } from "@/components/sessions/types";

interface SessionData {
  _id: string;
  title: string;
  focus: string;
  notes: string;
  dateTime?: string;
  totalDuration: number;
  drills: SessionDrill[];
  createdAt: string;
  updatedAt: string;
}

export default function SessionViewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
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

  const handleExportPDF = () => {
    window.open(`/api/sessions/${params.id}/pdf`, "_blank");
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

  const sortedDrills = [...sessionData.drills].sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <Link href="/sessions" className="text-[#407734] hover:underline">
            ← Back to Sessions
          </Link>
        </div>

        <div className="bg-gradient-to-r from-[#407734] to-[#2B4A11] text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">{sessionData.title}</h1>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-sm opacity-90">Focus:</span>
              <span className="ml-2 font-semibold">{sessionData.focus}</span>
            </div>
            <div>
              <span className="text-sm opacity-90">Total Duration:</span>
              <span className="ml-2 font-semibold">
                {sessionData.totalDuration} minutes
              </span>
            </div>
          </div>
        </div>

        {sessionData.notes && (
          <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body">
              <h2 className="card-title text-[#2B4A11]">Notes</h2>
              <p className="whitespace-pre-line">{sessionData.notes}</p>
            </div>
          </div>
        )}

        {sessionData.dateTime && (
          <div className="mb-4 text-gray-600">
            <strong>Date & Time:</strong>{" "}
            {new Date(sessionData.dateTime).toLocaleString()}
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#2B4A11] mb-4">Drills</h2>
          <div className="space-y-4">
            {sortedDrills.map((drill, index) => {
              const drillData =
                typeof drill.drillId === "string" ? null : (drill.drillId as Drill);
              return (
                <div
                  key={index}
                  className="card bg-base-100 shadow-sm border border-gray-200"
                >
                  <div className="card-body">
                    <h3 className="font-bold text-lg text-[#2B4A11]">
                      {index + 1}. {drillData?.title || "Drill"}
                    </h3>
                    {drillData?.description && (
                      <p className="text-gray-600 mt-2">
                        {drillData.description}
                      </p>
                    )}
                    <div className="mt-2">
                      <span className="font-semibold">Duration:</span>{" "}
                      {drill.duration} minutes
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/sessions/${params.id}/edit`}
            className="btn btn_primary"
          >
            Edit Session
          </Link>
          <button
            type="button"
            className="btn btn_secondary"
            onClick={handleExportPDF}
          >
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
}

