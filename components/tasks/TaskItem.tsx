"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/types/task";
import { useTaskStore } from "@/lib/store/useTaskStore";
import { Trash2, Edit, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, removeTask, updateTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditSave = () => {
    if (editedTitle.trim()) {
      updateTask(task.id, { title: editedTitle });
      setIsEditing(false);
    }
  };

  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="h-5 w-5"
            />

            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-1"
                autoFocus
              />
            ) : (
              <div className="flex-1">
                <p
                  className={cn(
                    "font-medium",
                    task.completed && "line-through text-gray-500",
                  )}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p
                    className={cn(
                      "text-sm text-gray-500 mt-1",
                      task.completed && "line-through",
                    )}
                  >
                    {task.description}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <Button size="sm" variant="outline" onClick={handleEditSave}>
                <Check className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => removeTask(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
