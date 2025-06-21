import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { colorTransition } from "../../styles";
import clsx from "clsx";

interface HeaderProps {
  isDark: boolean;
  onChangeTheme: (isDark: boolean) => void;
  children: React.ReactNode;
}

export const Header = ({ onChangeTheme, isDark, children }: HeaderProps) => {
  const ThemeButton = () => {
    if (!isDark) {
      return (
        <MdOutlineDarkMode
          className={clsx(
            "cursor-pointer dark:text-gray-300 text-gray-800 size-6",
            colorTransition
          )}
          onClick={() => onChangeTheme(true)}
        />
      );
    } else {
      return (
        <MdOutlineLightMode
          className={clsx(
            "cursor-pointer dark:text-gray-300 size-6",
            colorTransition
          )}
          onClick={() => onChangeTheme(false)}
        />
      );
    }
  };

  return (
    <header
      className={clsx(
        "bg-stone-300 dark:bg-gray-800 dark:text-white w-full h-16 flex items-center px-5 min-w-full min-h-20 justify-between",
        colorTransition
      )}
    >
      <p className="select-none">Header</p>
      {children}
      <ThemeButton />
    </header>
  );
};
