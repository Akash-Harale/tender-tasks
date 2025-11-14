"use client"; // Client-side for local comment state.

// Task detail page: Full task view + comment thread (Level 3: Separate page with local state).
// Key decision: Local comments (no global state); initial count shown, new ones appended dynamically.
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { initialTasks, Task } from "@/data/tasks";
import { Calendar, Paperclip, MessageSquare, Send, X } from "lucide-react";
import Link from "next/link";

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

export default function TaskDetail() {
  const params = useParams();
  const taskId = parseInt(params.id as string, 10);
  const task = initialTasks.find((t) => t.id === taskId);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  if (!task) {
    return (
      <div className="min-h-screen bg-neutral-900 p-8 text-white">
        Task not found.
      </div>
    );
  }

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newComment,
        author: "Current User",
        timestamp: new Date().toLocaleString(),
      },
    ]);
    setNewComment("");
  };

  const getStatusColor = (status: Task["status"]) => {
    if (status === "In Progress") return "bg-cyan-500/20 text-cyan-400";
    if (status === "Not Started") return "bg-orange-500/20 text-orange-400";
    if (status === "To Do") return "bg-yellow-500/20 text-yellow-400";
    return "bg-gray-500/20 text-gray-400";
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    if (priority === "High") return "bg-red-500/20 text-red-400";
    if (priority === "Low") return "bg-green-500/20 text-green-400";
    return "bg-gray-500/20 text-gray-400";
  };

  const statusDotColor =
    task.status === "In Progress"
      ? "bg-cyan-500"
      : task.status === "Not Started"
      ? "bg-orange-500"
      : "bg-yellow-500";

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <Link
            href="/"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </Link>
        </div>
        <div className="p-6 space-y-6">
          {/* Task Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 mb-2">
                Description
              </h3>
              <p className="text-neutral-200">{task.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-2">
                  Status
                </h3>
                <span
                  className={`inline-block text-xs px-3 py-1 rounded ${getStatusColor(
                    task.status
                  )}`}
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${statusDotColor}`}
                  ></span>
                  {task.status}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-2">
                  Priority
                </h3>
                <span
                  className={`inline-block text-xs px-3 py-1 rounded ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-2">
                  Due Date
                </h3>
                <div className="flex items-center gap-2 text-neutral-200">
                  <Calendar size={16} />
                  <span>{task.dueDate}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-2">
                  Assignee
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                  <span className="text-neutral-200">{task.assignee}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 mb-2">
                Attachments
              </h3>
              <div className="flex items-center gap-2 text-neutral-300">
                <Paperclip size={16} />
                <span>{task.attachments} files attached</span>
              </div>
            </div>
          </div>
          {/* Comments Section */}
          <div className="border-t border-neutral-800 pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Comments ({task.comments + comments.length})
            </h3>
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-neutral-800 rounded-lg p-4 border border-neutral-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {comment.author}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-neutral-300 text-sm">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Comment Form */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-600 text-white"
              />
              <button
                onClick={addComment}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Send size={18} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
