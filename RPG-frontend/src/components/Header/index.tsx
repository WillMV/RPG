import { colorTransition } from "../../styles";
import clsx from "clsx";

interface HeaderProps {
  isDark: boolean;
  onChangeTheme: (isDark: boolean) => void;
  children: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header
      className={clsx(
        "bg-stone-300 dark:bg-gray-800 dark:text-white  h-16 flex items-center px-5 min-w-full min-h-20",
        colorTransition
      )}
    >
      <p className="select-none">Header</p>
      {children}
    </header>
  );
};
