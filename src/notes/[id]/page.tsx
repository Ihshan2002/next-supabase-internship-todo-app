// app/notes/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient';

export default async function NotePage({ params }: { params: { id: string } }) {
  const { data: note, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) return <p>Note not found</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <a href={`/notes/${note.id}/edit`}>Edit</a>
    </div>
  );
}
