import React, { useEffect, useRef } from "react";
import { contextMenuItems } from "@/constants/contextnMenuItems";

interface ContextMenuProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  open,
  x,
  y,
  onClose,
  onAction,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-[var(--background-color)] rounded-lg shadow-lg border border-[var(--active-border-color)] w-56"
      style={{ top: y, left: x }}
      tabIndex={-1}
    >
      <div className="px-4 py-2 font-semibold text-[var(--primary-text-color)] border-b border-[var(--active-border-color)]">Settings</div>
      {contextMenuItems.map((item, idx) => {
        if (item.divider) {
          return <div key={"divider-" + idx} className="border-t border-[var(--active-border-color)] my-1"></div>;
        }
        if (!item.icon || !item.action) return null;
        const Icon = item.icon;
        return (
          <button
            key={item.action}
            className={`flex items-center text-[var(--primary-text-color)] w-full px-4 py-2 hover:bg-gray-100 text-sm ${item.danger ? "text-[var(--context-menu-delete-text)] hover:bg-red-50" : ""}`}
            onClick={() => {
              onAction(item.action!);
              onClose();
            }}
          >
            {Icon && <Icon className={`w-4 h-4 mr-2 ${item.danger ? "text-[var(--context-menu-delete-text)]" : "text-[var(--context-menu-icon)]"}`} />} {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu; 