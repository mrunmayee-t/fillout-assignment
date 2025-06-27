
import React from "react";
import type { LucideIcon } from "lucide-react";

interface NavTabProps {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onMenuClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id?: string;
}

const NavTab: React.FC<NavTabProps> = ({
  label,
  icon,
  active,
  disabled,
  onClick,
  onMenuClick,
  id,
}) => {
    //console.log("Rendering NavTab:", label, active)
  return (
    
    <div
      id={id}
      onClick={(e) => {
        e.stopPropagation(); // ensure it's not bubbling to drag
        console.log("CLICKED:", label);
        onClick?.();
      }}
      className={`cursor-pointer gap-1 group flex items-center rounded-lg px-5 py-1.5 font-medium text-[15px] transition-all select-none 
        hover:bg-[var(--hover-background-color)] focus:border-[var(--focus-border-color)] 
        ${active ? "bg-white text-[var(--primary-text-color)] border border-[var(--active-border-color)] shadow-sm" : "bg-[var(--default-color)] text-[var(--default-text-color)]"}
        ${disabled ? "opacity-60 cursor-not-allowed pointer-events-none text-gray-400" : ""}
        `
      }
      
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {icon && (
  <span className="mr-1.5 w-4 h-4 flex items-center justify-center">
    {React.createElement(icon, {
      className: `w-4 h-4 ${active ? "text-[var(--primary-color)]" : "text-[var(--default-text-color)]"}`
    })}
  </span>
)}
      {label}
      {active && (
        <div
          className="font-extrabold text-2xl text-[var(--context-menu-icon)] cursor-pointer hover:text-gray-800 ml-2"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.(e);
          }}
        >
          ⋮
        </div>
      )}
    </div>
  );
};

export default NavTab;
