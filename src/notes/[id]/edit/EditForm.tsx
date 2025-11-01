// app/notes/[id]/edit/EditForm.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function EditForm({ note }: { note: any }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', note.id);

    if (error) alert(error.message);
    else router.push(`/notes/${note.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}
