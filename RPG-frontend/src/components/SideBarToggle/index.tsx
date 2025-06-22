import clsx from "clsx";
import { MdClose, MdOutlineSettings } from "react-icons/md";
import { colorTransition } from "../../styles";
import { useMemo } from "react";

interface SideBarToggleProps {
  onToggle: () => void;
  value: boolean;
}

export const SideBarToggle = ({ onToggle, value }: SideBarToggleProps) => {
  const Icon = useMemo(() => (value ? MdClose : MdOutlineSettings), [value]);

  return (
    <Icon
      className={clsx(
        "cursor-pointer dark:text-gray-300 text-gray-800 size-6",
        colorTransition
      )}
      onClick={onToggle}
    />
  );
};
