import { colorTransition } from "../../styles";
import clsx from "clsx";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      className={clsx(
        "bg-stone-300 dark:bg-gray-800 dark:text-white h-16 flex items-center px-5 min-w-full min-h-20",
        className,
        colorTransition
      )}
    >
      {children}
    </header>
  );
};
