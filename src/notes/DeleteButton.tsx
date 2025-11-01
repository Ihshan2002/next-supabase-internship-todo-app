// Inside note detail page (or a separate component)
'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  
  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) alert(error.message);
      else router.push('/notes');
    }
  };

  return <button onClick={handleDelete}>Delete Note</button>;
}
