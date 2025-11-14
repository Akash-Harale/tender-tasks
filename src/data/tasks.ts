// Task models and initial data: Flat array for easier manipulation (e.g., drag/drop updates status).
// Separated from UI for scalability (Level 3).
export type TaskStatus = 'To Do' | 'In Progress' | 'Not Started' | 'Completed'; // Added: 'Completed'.
export type Priority = 'Low' | 'High';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  comments: number; // Initial count (new comments added in detail page)
  attachments: number;
}

// Initial data: 12 tasks (3 per column), with corrected statuses and varied priorities.
// Added: 3 Completed tasks.
export const initialTasks: Task[] = [
  // To Do
  {
    id: 1,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'To Do',
    comments: 12,
    attachments: 3,
  },
  {
    id: 2,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'High',
    status: 'To Do',
    comments: 12,
    attachments: 3,
  },
  {
    id: 3,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'To Do',
    comments: 12,
    attachments: 3,
  },
  // In Progress
  {
    id: 4,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'In Progress',
    comments: 12,
    attachments: 3,
  },
  {
    id: 5,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'High',
    status: 'In Progress',
    comments: 12,
    attachments: 3,
  },
  {
    id: 6,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'In Progress',
    comments: 12,
    attachments: 3,
  },
  // Not Started
  {
    id: 7,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'Not Started',
    comments: 12,
    attachments: 3,
  },
  {
    id: 8,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'High',
    status: 'Not Started',
    comments: 12,
    attachments: 3,
  },
  {
    id: 9,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'Not Started',
    comments: 12,
    attachments: 3,
  },
  // Completed (New)
  {
    id: 10,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'Completed',
    comments: 12,
    attachments: 3,
  },
  {
    id: 11,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'High',
    status: 'Completed',
    comments: 12,
    attachments: 3,
  },
  {
    id: 12,
    title: 'Construction Tender 1',
    description: 'Description goes in here about the tender',
    assignee: 'John Doe',
    dueDate: '22 Dec 24',
    priority: 'Low',
    status: 'Completed',
    comments: 12,
    attachments: 3,
  },
];