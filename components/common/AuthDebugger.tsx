"use client";

import { useAuthStore } from "@/lib/store/useAuthStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AuthDebugger() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDebug(true)}
          className="opacity-50 hover:opacity-100"
        >
          Debug
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-white border rounded-md shadow-lg max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Auth Debug</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowDebug(false)}>
          X
        </Button>
      </div>
      <div className="text-xs space-y-1">
        <p>
          <span className="font-semibold">isAuthenticated:</span>{" "}
          {isAuthenticated ? "true" : "false"}
        </p>
        <p>
          <span className="font-semibold">user:</span>{" "}
          {user ? JSON.stringify(user) : "null"}
        </p>
      </div>
      <div className="mt-3 flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Clear Storage
        </Button>
        <Button size="sm" variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
