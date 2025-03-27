"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/lib/store/useTaskStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilter } from "@/components/tasks/TaskFilter";
import { PageTitle } from "@/components/common/PageTitle";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { tasks, filteredTasks, filter, setFilter } = useTaskStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Auth status in tasks page:", { isAuthenticated, user });

      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setFilter("all");
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, router, setFilter, user]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const pendingTasksCount = tasks.filter((task) => !task.completed).length;
  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="container mx-auto py-8 px-4">
      <PageTitle
        title="Task Management"
        description="Manage your tasks efficiently"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <TaskForm />

          <div className="mt-8 p-4 border rounded-lg bg-muted/50">
            <h3 className="font-medium mb-2">Task Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Tasks:</span>
                <span className="font-medium">{tasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-medium">{pendingTasksCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-medium">{completedTasksCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <TaskFilter />

          <h2 className="text-xl font-semibold mb-4">
            {filter === "all"
              ? "All Tasks"
              : filter === "pending"
                ? "Pending Tasks"
                : "Completed Tasks"}
          </h2>

          <TaskList
            tasks={filteredTasks}
            emptyMessage={`No ${filter === "all" ? "" : filter} tasks found`}
          />
        </div>
      </div>
    </div>
  );
}
