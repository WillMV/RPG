import clsx from "clsx";
import type React from "react";
// import * as Motion from "motion/react-client";
import { SideBarToggle } from "../SideBarToggle";
import { Header } from "../Header";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: React.ReactNode;
}

export const SideBar = ({ open, children, title, onClose }: SideBarProps) => {
  return (
    <div
      className={clsx(
        "overflow-hidden  bg-gray-200 dark:bg-gray-900 dark:text-white",
        open ? "w-[100vw] md:w-[25vw]" : "w-0",
        "transition-all duration-300 delay-100 ease-in-out"
      )}
    >
      <Header className=" justify-between border-l border-gray-600">
        <SideBarToggle
          onToggle={() => {
            onClose();
          }}
          value={open}
        />
        <h1>{title ?? "SideBar"}</h1>
        <div />
      </Header>

      <div className="min-w-[20vw] p-4">{children}</div>
    </div>
  );
};
