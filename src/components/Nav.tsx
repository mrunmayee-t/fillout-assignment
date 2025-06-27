"use client";

import React, { useState } from "react";
import NavTab from "./NavTab";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SortableNavTab from "./SortableNavTab";
import ContextMenu from "./ContextMenu";
import { initialNavItems } from "@/constants/navItems";



const Nav: React.FC = () => {
  const [navItems, setNavItems] = useState(initialNavItems);
  const [hoveredGapIndex, setHoveredGapIndex] = useState<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // Only start dragging after moving 5px
    }}));
  const [activeId, setActiveId] = useState<string>(navItems[0].id);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; navId: string } | null>(null);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = navItems.findIndex((item) => item.id === active.id);
      const newIndex = navItems.findIndex((item) => item.id === over.id);
      setNavItems(arrayMove(navItems, oldIndex, newIndex));
    }
  };

  const insertPageAt = (index: number) => {};

  // Context menu handlers (implement as needed)
  const handleContextMenuAction = (action: string) => {
    if (!contextMenu) return;
    const navId = contextMenu.navId;
    switch (action) {
      case "setFirstPage":
        // Implement set as first page logic
        break;
      case "rename":
        // Implement rename logic
        break;
      case "copy":
        // Implement copy logic
        break;
      case "duplicate":
        // Implement duplicate logic
        break;
      case "delete":
        // Implement delete logic
        break;
      default:
        break;
    }
  };

  // Close context menu on click outside
  React.useEffect(() => {
    if (!contextMenu) return;
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [contextMenu]);

  return (
    <nav className="py-4 px-2 border-b border-[var(--active-border-color)] bg-[var(--background-color)]">
      <div className="flex items-center gap-8">
        <div className="relative flex items-center gap-8">
          <div className="group absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0 border-t-2 border-dotted border-[var(--active-border-color)] z-0" />
    
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={navItems.map((item) => item.id)}
              strategy={horizontalListSortingStrategy}
            >
              <ul className="relative z-10 flex items-center gap-0 p-0 m-0 list-none">
                {navItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index > 0 && (
                      <li
                        className="relative flex items-center justify-center w-8 h-8 p-0 m-0"
                        onMouseEnter={() => setHoveredGapIndex(index)}
                        onMouseLeave={() => setHoveredGapIndex(null)}
                        style={{ listStyle: 'none' }}
                      >
                        {hoveredGapIndex === index && (
                          <button
                            onClick={() => insertPageAt(index)}
                            className="cursor-pointer inline-flex items-center justify-center bg-[var(--background-color)] text-[var(--primary-text-color)] border border-[var(--active-border-color)] rounded-full text-lg w-6 h-6 transition-opacity z-10 shadow"
                            title="Add page"
                          >
                            +
                          </button>
                        )}
                      </li>
                    )}
                    <li className="p-0 m-0" style={{ listStyle: 'none' }}>
                      <SortableNavTab
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        active={item.id === activeId}
                        onClick={() => setActiveId(item.id)}
                        onMenuClick={item.id === activeId ? (e) => {
                          setContextMenu({ x: e.clientX, y: e.clientY, navId: item.id });
                        } : undefined}
                      />
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
        <button className="flex items-center bg-white text-[var(--primary-text-color)] border border-[var(--active-border-color)] rounded-lg px-5 py-1.5 font-medium text-[15px] ml-2 cursor-pointer outline-none shadow-none transition-colors hover:bg-gray-100">
          <span className="text-lg mr-1.5">+</span> Add page
        </button>
      </div>
      {contextMenu && (
        <ContextMenu
          open={!!contextMenu}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={handleContextMenuAction}
        />
      )}
    </nav>
  );
};

export default Nav;
