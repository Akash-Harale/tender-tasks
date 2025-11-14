// TaskCard: Renders individual task with drag, hover effects, and link to details (Level 2 interactivity).
// Key decision: Inline styles for status/priority colors; Link replaces modal for routing (Level 3).
import {
  MoreHorizontal,
  Calendar,
  Paperclip,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Task } from "@/data/tasks";

interface TaskCardProps {
  task: Task;
  columnId: string;
  onDragStart: (task: Task, columnId: string) => void;
}

export default function TaskCard({
  task,
  columnId,
  onDragStart,
}: TaskCardProps) {
  const getPriorityColor = (priority: Task["priority"]) => {
    if (priority === "High") return "bg-red-500/20 text-red-400";
    if (priority === "Low") return "bg-green-500/20 text-green-400";
    return "bg-gray-500/20 text-gray-400";
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(task, columnId);
  };

  // ... (rest unchanged)
  const getStatusColor = (status: Task["status"]) => {
    if (status === "In Progress") return "bg-cyan-500/20 text-cyan-400";
    if (status === "Not Started") return "bg-orange-500/20 text-orange-400";
    if (status === "To Do") return "bg-yellow-500/20 text-yellow-400";
    if (status === "Completed") return "bg-green-500/20 text-green-400"; // Added.
    return "bg-gray-500/20 text-gray-400";
  };

  // Status dot in JSX:
  const statusDotColor =
    task.status === "In Progress"
      ? "bg-cyan-500"
      : task.status === "Not Started"
      ? "bg-orange-500"
      : task.status === "To Do"
      ? "bg-yellow-500"
      : "bg-green-500"; // Added: Green for Completed.

  // ... (rest unchanged)

  return (
    <Link href={`/tasks/${task.id}`} className="block">
      <div
        draggable
        onDragStart={handleDragStart}
        className="bg-neutral-800 rounded-lg p-4 border border-neutral-700 cursor-pointer transition-all duration-200 hover:bg-neutral-750 hover:border-neutral-600 hover:shadow-lg hover:shadow-black/50 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between mb-3">
          <span
            className={`text-xs px-2 py-1 rounded ${getStatusColor(
              task.status
            )}`}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${statusDotColor}`}
            ></span>
            {task.status}
          </span>
          <button className="text-neutral-400 hover:text-white">
            <MoreHorizontal size={18} />
          </button>
        </div>
        <h3 className="font-semibold mb-2">{task.title}</h3>
        <p className="text-sm text-neutral-400 mb-4">{task.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-neutral-400">Assignee</span>
          <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Calendar size={14} />
            <span>{task.dueDate}</span>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-400 pt-3 border-t border-neutral-700">
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>{task.comments} Comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip size={14} />
            <span>{task.attachments} Attachments</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
