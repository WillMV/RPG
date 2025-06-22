import clsx from "clsx";
import * as Motion from "motion/react-client";
import { MdOutlineSettings, MdClose } from "react-icons/md";
import { colorTransition } from "../../styles";

interface SideBarToggleProps {
  value: boolean;
  onToggle: () => void;
}

export const SideBarToggle = ({ value, onToggle }: SideBarToggleProps) => {
  return (
    <Motion.div
      layoutId="sidebar-button"
      className="cursor-pointer"
      onClick={onToggle}
    >
      {value ? (
        <MdClose
          className={clsx(
            "text-gray-700 dark:text-gray-300 size-6",
            colorTransition
          )}
        />
      ) : (
        <MdOutlineSettings
          className={clsx(
            "text-gray-700 dark:text-gray-300 size-6",
            colorTransition
          )}
        />
      )}
    </Motion.div>
  );
};
