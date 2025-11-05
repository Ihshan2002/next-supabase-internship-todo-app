import { supabase } from "./supabaseClient";

// 🧩 Helper: Validate UUIDs (for id columns)
function isValidUUID(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

// 📝 Fetch all notes for a user
export async function getNotes(user_id: string) {
  if (!user_id) {
    console.warn("⚠️ No user ID provided to getNotes().");
    return { data: [], error: { message: "Missing user ID" } };
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error && Object.keys(error).length > 0) {
    console.error("🚨 Supabase error fetching notes:", JSON.stringify(error, null, 2));
  }

  return { data, error };
}

// 📝 Fetch single note by id
export async function getNoteById(id: string) {
  // ✅ Validate UUID format first
  if (!isValidUUID(id)) {
    console.warn(`⚠️ Invalid UUID passed to getNoteById(): "${id}"`);
    return { data: null, error: { message: "Invalid note ID" } };
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // ✅ Use maybeSingle() instead of single()

  // 🧩 Handle Supabase response cleanly
  if (error && Object.keys(error).length > 0) {
    console.error("🚨 Supabase error fetching note:", error.message || JSON.stringify(error));
    return { data: null, error };
  }

  // 🕵️ If no data found but no actual error, log a warning
  if (!data) {
    console.warn(`⚠️ No note found for ID: ${id}`);
    return { data: null, error: { message: "Note not found" } };
  }

  return { data, error: null };
}

// ➕ Create note
export async function createNote(title: string, content: string, user_id: string) {
  if (!user_id) {
    console.warn("⚠️ No user ID provided to createNote().");
    return { data: null, error: { message: "Missing user ID" } };
  }

  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content, user_id }])
    .select()
    .single();

  if (error && Object.keys(error).length > 0) {
    console.error("🚨 Supabase error creating note:", error.message || error);
  }

  return { data, error };
}

// ✏️ Update note
export async function updateNote(id: string, title: string, content: string) {
  if (!isValidUUID(id)) {
    console.warn(`⚠️ Invalid UUID passed to updateNote(): "${id}"`);
    return { data: null, error: { message: "Invalid note ID" } };
  }

  const { data, error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", id)
    .select()
    .single();

  if (error && Object.keys(error).length > 0) {
    console.error("🚨 Supabase error updating note:", error.message || error);
  }

  return { data, error };
}

// ❌ Delete note
export async function deleteNote(id: string) {
  if (!isValidUUID(id)) {
    console.warn(`⚠️ Invalid UUID passed to deleteNote(): "${id}"`);
    return { error: { message: "Invalid note ID" } };
  }

  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  if (error && Object.keys(error).length > 0) {
    console.error("🚨 Supabase error deleting note:", error.message || error);
  }

  return { error };
}
