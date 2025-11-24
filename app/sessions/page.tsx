"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Session {
  _id: string;
  title: string;
  focus: string;
  totalDuration: number;
  createdAt: string;
  updatedAt: string;
}

export default function SessionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchSessions();
    }
  }, [status]);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/sessions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSessions(sessions.filter((s) => s._id !== id));
      } else {
        alert("Failed to delete session");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("Failed to delete session");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#2B4A11]">My Sessions</h1>
          <Link href="/sessions/new" className="btn btn_primary">
            Create New Session
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No sessions yet.</p>
            <Link href="/sessions/new" className="btn btn_primary">
              Create Your First Session
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="card bg-base-100 shadow-md border border-gray-200"
              >
                <div className="card-body">
                  <h2 className="card-title text-[#2B4A11]">{session.title}</h2>
                  <p className="text-gray-600">
                    <strong>Focus:</strong> {session.focus}
                  </p>
                  <p className="text-gray-600">
                    <strong>Duration:</strong> {session.totalDuration} minutes
                  </p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(session.createdAt).toLocaleDateString()}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      href={`/sessions/${session._id}`}
                      className="btn btn-sm btn_primary"
                    >
                      View
                    </Link>
                    <Link
                      href={`/sessions/${session._id}/edit`}
                      className="btn btn-sm btn_secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(session._id)}
                      disabled={deletingId === session._id}
                    >
                      {deletingId === session._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
