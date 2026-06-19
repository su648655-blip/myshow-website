"use client";

import { useState, DragEvent } from "react";

export interface DragHandlers<T> {
  draggingId: string | null;
  overId: string | null;
  onDragStart: (id: string) => (e: DragEvent) => void;
  onDragOver: (id: string) => (e: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (id: string) => (e: DragEvent) => void;
  onDragEnd: () => void;
}

export function useDragSort<T extends { id: string }>(
  items: T[],
  onReorder: (next: T[]) => void
): DragHandlers<T> {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  return {
    draggingId,
    overId,
    onDragStart: (id) => (e) => {
      setDraggingId(id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", id);
    },
    onDragOver: (id) => (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (id !== draggingId) setOverId(id);
    },
    onDragLeave: () => setOverId(null),
    onDrop: (id) => (e) => {
      e.preventDefault();
      const sourceId = e.dataTransfer.getData("text/plain") || draggingId;
      if (!sourceId || sourceId === id) {
        setDraggingId(null);
        setOverId(null);
        return;
      }
      const sourceIdx = items.findIndex((x) => x.id === sourceId);
      const targetIdx = items.findIndex((x) => x.id === id);
      if (sourceIdx === -1 || targetIdx === -1) return;
      const next = [...items];
      const [moved] = next.splice(sourceIdx, 1);
      next.splice(targetIdx, 0, moved);
      onReorder(next);
      setDraggingId(null);
      setOverId(null);
    },
    onDragEnd: () => {
      setDraggingId(null);
      setOverId(null);
    },
  };
}
