import { supabase } from '@/lib/supabaseClient';
import NoteForm from '@/src/notes/new/NoteForm';

export default async function NotesPage() {
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p>Error loading notes: {error.message}</p>;
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong> — {note.content}
          </li>
        ))}
      </ul>

      <h2>Create a new note</h2>
      <NoteForm />
    </div>
  );
}
