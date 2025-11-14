"use client";
import React, { useState } from "react";
import {
  Menu,
  Search as SearchIcon,
  LayoutGrid,
  TrendingUp,
  Phone,
  Bell,
} from "lucide-react";
import Column from "@/components/Column";
import { groupTasks, GroupedTasks } from "@/utils/groupTasks";
import { initialTasks, Task } from "@/data/tasks";

const columns = [
  { id: "to-do", title: "To - Do List", dotColor: "bg-yellow-500" },
  { id: "in-progress", title: "In Progress", dotColor: "bg-cyan-500" },
  { id: "not-started", title: "Not Started", dotColor: "bg-orange-500" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTask || !draggedFrom) return;
    if (draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }
    const newStatus =
      targetColumnId === "to-do"
        ? "To Do"
        : targetColumnId === "in-progress"
        ? "In Progress"
        : "Not Started";
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggedTask.id ? { ...t, status: newStatus } : t
      )
    );
    setDraggedTask(null);
    setDraggedFrom(null);
  };

  // Filter for search
  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const groupedTasks = groupTasks(filteredTasks);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-neutral-900 border-r border-neutral-800 flex flex-col items-center py-4 gap-6">
        <button className="text-white hover:bg-neutral-800 p-2 rounded">
          <Menu size={24} />
        </button>
        <button className="text-white hover:bg-neutral-800 p-2 rounded">
          <SearchIcon size={24} />
        </button>
        <button className="text-orange-500 bg-orange-500/10 p-2 rounded">
          <LayoutGrid size={24} />
        </button>
        <button className="text-white hover:bg-neutral-800 p-2 rounded">
          <TrendingUp size={24} />
        </button>
        <button className="text-white hover:bg-neutral-800 p-2 rounded">
          <Phone size={24} />
        </button>
      </div>
      {/* Main Content */}
      <div className="ml-16">
        {/* Header */}
        <div className="border-b border-neutral-800 px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Tender Tasks</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Tenders"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 pl-10 w-96 focus:outline-none focus:border-neutral-600"
                />
                <SearchIcon
                  className="absolute left-3 top-2.5 text-neutral-500"
                  size={20}
                />
              </div>
              <button className="text-white hover:bg-neutral-800 p-2 rounded">
                <Bell size={24} />
              </button>
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center font-semibold">
                S
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-6 py-2 rounded-full bg-neutral-900 text-neutral-400 hover:bg-neutral-800">
                List View
              </button>
              <button className="px-6 py-2 rounded-full bg-neutral-900 border-2 border-orange-500 text-white">
                Board View
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800">
                View Tender Details
              </button>
              <button className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 flex items-center gap-2">
                <span className="text-lg">⚙</span> Columns
              </button>
            </div>
          </div>
        </div>
        {/* Board Columns */}
        <div className="p-8 overflow-x-auto">
          <div className="flex gap-6 min-w-max">
            {columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                dotColor={column.dotColor}
                tasks={groupedTasks[column.id as keyof GroupedTasks] || []}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
