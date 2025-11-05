import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Task } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (!error && data) setTasks(data);
  };

  return { tasks, fetchTasks };
}
