import { MdOutlineDarkMode } from "react-icons/md";

interface HeaderProps {
  isDark: boolean;
  onChangeTheme: (isDark: boolean) => void;
}

export const Header = ({ onChangeTheme }: HeaderProps) => {
  const ThemeButton = () => {};

  return (
    <div className=" bg-amber-500 dark:bg-gray-800 w-full h-16 flex items-center px-5 justify-between">
      <p className="text-black dark: text-gray-300">Header</p>
      <MdOutlineDarkMode className="text-black dark:text-gray-300 size-6 " />
    </div>
  );
};
