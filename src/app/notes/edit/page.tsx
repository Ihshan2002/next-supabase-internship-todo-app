"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNoteById, updateNote } from "@/lib/notesService";

export default function EditNotePage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      const { data, error } = await getNoteById(id as string);
      if (error) {
        console.error("Error fetching note:", error);
      } else if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };
    loadNote();
  }, [id]);

  const handleSave = async () => {
    const { error } = await updateNote(id as string, title, content);
    if (error) {
      console.error("Error updating note:", error);
    } else {
      router.push(`/notes/${id}`);
    }
  };

  if (loading) return <p>Loading note...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <input
        type="text"
        className="border rounded w-full mb-2 p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border rounded w-full h-48 p-2 mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
}
