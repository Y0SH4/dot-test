import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/types/task";

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  filter: "all" | "pending" | "completed";
  addTask: (title: string, description?: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, data: Partial<Omit<Task, "id">>) => void;
  setFilter: (filter: "all" | "pending" | "completed") => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      filteredTasks: [],
      filter: "all",
      addTask: (title, description = "") => {
        const newTask: Task = {
          id: Date.now().toString(),
          title,
          description,
          completed: false,
          createdAt: new Date(),
        };
        set((state) => {
          const updatedTasks = [...state.tasks, newTask];
          return {
            tasks: updatedTasks,
            filteredTasks: filterTasks(updatedTasks, state.filter),
          };
        });
      },
      toggleTask: (id) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          );
          return {
            tasks: updatedTasks,
            filteredTasks: filterTasks(updatedTasks, state.filter),
          };
        }),
      removeTask: (id) =>
        set((state) => {
          const updatedTasks = state.tasks.filter((task) => task.id !== id);
          return {
            tasks: updatedTasks,
            filteredTasks: filterTasks(updatedTasks, state.filter),
          };
        }),
      updateTask: (id, data) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, ...data } : task,
          );
          return {
            tasks: updatedTasks,
            filteredTasks: filterTasks(updatedTasks, state.filter),
          };
        }),
      setFilter: (filter) =>
        set((state) => ({
          filter,
          filteredTasks: filterTasks(state.tasks, filter),
        })),
    }),
    {
      name: "task-storage",
    },
  ),
);

const filterTasks = (
  tasks: Task[],
  filter: "all" | "pending" | "completed",
): Task[] => {
  switch (filter) {
    case "all":
      return tasks;
    case "pending":
      return tasks.filter((task) => !task.completed);
    case "completed":
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};
