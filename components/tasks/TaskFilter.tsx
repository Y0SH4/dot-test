"use client";

import { useTaskStore } from "@/lib/store/useTaskStore";
import { Button } from "@/components/ui/button";

export function TaskFilter() {
  const { filter, setFilter } = useTaskStore();

  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={filter === "all" ? "default" : "outline"}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "pending" ? "default" : "outline"}
        onClick={() => setFilter("pending")}
      >
        Pending
      </Button>
      <Button
        variant={filter === "completed" ? "default" : "outline"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
    </div>
  );
}
