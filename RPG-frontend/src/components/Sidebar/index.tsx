import clsx from "clsx";
import type React from "react";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
export const SideBar = ({ open, children }: SideBarProps) => {
  return (
    <div
      className={clsx(
        "overflow-x-hidden",
        open ? "w-300" : "w-0",
        "transition-all duration-300 ease-in-out",
        "bg-gray-200 dark:bg-gray-900 dark:text-white"
      )}
      style={{
        width: open ? "300px" : "0px",
        overflowX: "hidden",
        transition: "width 0.3s ease-in-out",
      }}
    >
      SideBar
      {children}
    </div>
  );
};
