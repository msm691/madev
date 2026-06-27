"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { updateUserStatus } from "./actions";
import { useState } from "react";

export function UserActions({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);

  const handleAction = async (status: "APPROVED" | "REJECTED") => {
    setLoading(true);
    await updateUserStatus(userId, status);
    setLoading(false);
  };

  return (
    <div className="flex justify-end gap-2">
      <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" disabled={loading} onClick={() => handleAction("APPROVED")}>
        <Check className="h-4 w-4 mr-1" /> Valider
      </Button>
      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" disabled={loading} onClick={() => handleAction("REJECTED")}>
        <X className="h-4 w-4 mr-1" /> Refuser
      </Button>
    </div>
  );
}
