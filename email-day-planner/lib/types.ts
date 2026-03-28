export interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  body: string;
  isRead: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  type: 'meeting' | 'deadline' | 'reply' | 'action' | 'fyi';
  timeEstimate: string;
  suggestedTime: string;
  sourceEmailId: string;
  suggestedReply?: string;
  deadline?: string;
}

export interface DayPlan {
  date: string;
  summary: string;
  tasks: Task[];
  ignoredEmails: { id: string; reason: string }[];
  focusBlock?: string;
}
