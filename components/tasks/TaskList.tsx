"use client";

import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "../common/EmptyState";

interface TaskListProps {
  tasks: Task[];
  emptyMessage?: string;
}

export function TaskList({
  tasks,
  emptyMessage = "No tasks found",
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
