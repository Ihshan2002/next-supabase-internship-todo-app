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
      if (error) console.error(error);
      else if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };
    loadNote();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateNote(id as string, title, content);
    router.push("/notes");
  };

  if (loading) return <p className="p-4">Loading note...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-40"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Note
        </button>
      </form>
    </div>
  );
}
