'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('notes').insert([
      { title, content },
    ]);

    if (error) {
      alert('Error adding note: ' + error.message);
    } else {
      alert('Note added!');
      setTitle('');
      setContent('');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Note'}
      </button>
    </form>
  );
}
