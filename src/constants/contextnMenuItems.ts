import { Flag, Pencil, Copy, CopyPlus, Trash2 } from "lucide-react";

export const contextMenuItems = [
  {
    label: "Set as first page",
    icon: Flag,
    action: "setFirstPage",
  },
  {
    label: "Rename",
    icon: Pencil,
    action: "rename",
  },
  {
    label: "Copy",
    icon: Copy,
    action: "copy",
  },
  {
    label: "Duplicate",
    icon: CopyPlus,
    action: "duplicate",
  },
  { divider: true },
  {
    label: "Delete",
    icon: Trash2,
    action: "delete",
    danger: true,
  },
];