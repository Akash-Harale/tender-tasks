// Column: Renders header and scrollable task list (Level 1 core UI).
// Handles drop for drag/drop; passes columnId to tasks for drag start.
import { Plus, MoreHorizontal } from "lucide-react";
import TaskCard from "./TaskCard";
import { Task } from "@/data/tasks";

interface ColumnProps {
  id: string;
  title: string;
  dotColor: string;
  tasks: Task[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragStart: (task: Task, columnId: string) => void;
}

export default function Column({
  id,
  title,
  dotColor,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
}: ColumnProps) {
  return (
    <div className="w-96 shrink-0">
      <div
        className="bg-neutral-900 rounded-lg"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, id)}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
            <h2 className="font-semibold text-lg">{title}</h2>
            <span className="bg-cyan-500 text-black text-xs font-semibold px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white hover:bg-neutral-800 p-1 rounded">
              <Plus size={20} />
            </button>
            <button className="text-white hover:bg-neutral-800 p-1 rounded">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={id}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
