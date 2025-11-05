import { Task } from "@/types/task";
import Card from "@/components/ui/Card";

export default function TaskItem({ task }: { task: Task }) {
  return (
    <Card className="flex justify-between items-center">
      <span className={task.completed ? "line-through text-gray-500" : ""}>
        {task.title}
      </span>
      <span
        className={`text-xs px-2 py-1 rounded ${
          task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {task.completed ? "Done" : "Pending"}
      </span>
    </Card>
  );
}
