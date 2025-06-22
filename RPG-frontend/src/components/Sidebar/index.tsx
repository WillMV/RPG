import clsx from "clsx";
import type React from "react";
// import * as Motion from "motion/react-client";
import { SideBarToggle } from "../SideBarToggle";
import { Header } from "../Header";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
// export const SideBar = ({ open, children }: SideBarProps) => {
//   return (
//     <div
//       className={clsx(
//         "overflow-x-hidden",
//         open ? "w-300" : "w-0",
//         "transition-all duration-300 ease-in-out",
//         "bg-gray-200 dark:bg-gray-900 dark:text-white"
//       )}
//       style={{
//         width: open ? "300px" : "0px",
//         overflowX: "hidden",
//         transition: "width 0.3s ease-in-out",
//       }}
//     >
//       SideBar
//       {children}
//     </div>
//   );
// };

export const SideBar = ({ open, onClose, children }: SideBarProps) => {
  return (
    <div
      className={clsx(
        "overflow-x-hidden transition-all duration-300 ease-in-out",
        "bg-gray-200 dark:bg-gray-900 dark:text-white",
        open ? "w-[300px]" : "w-0"
      )}
      style={{
        overflowX: "hidden",
        transition: "width 0.5s ease-in-out",
      }}
    >
      <Header className="bg-red-500">
        {open && (
          <div className="flex items-center justify-start p-4">
            <SideBarToggle value={open} onToggle={onClose} />
          </div>
        )}
      </Header>

      {open && children}
    </div>
  );
};
