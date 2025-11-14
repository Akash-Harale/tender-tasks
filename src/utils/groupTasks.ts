// Data logic: Groups flat tasks by status for rendering columns.
// Supports filtering (e.g., search) by passing pre-filtered array (Level 3: Separation of concerns).
import { Task } from '@/data/tasks';

export interface GroupedTasks {
  'to-do': Task[];
  'in-progress': Task[];
  'not-started': Task[];
  'completed': Task[]; // Added: Completed group.
}

export function groupTasks(tasks: Task[]): GroupedTasks {
  return {
    'to-do': tasks.filter((t) => t.status === 'To Do'),
    'in-progress': tasks.filter((t) => t.status === 'In Progress'),
    'not-started': tasks.filter((t) => t.status === 'Not Started'),
    'completed': tasks.filter((t) => t.status === 'Completed'), // Added.
  };
}