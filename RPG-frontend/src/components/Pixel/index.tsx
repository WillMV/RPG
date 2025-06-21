import clsx from "clsx";
import { colorTransition } from "../../styles";

interface PixelProps {
  size: number;
  children?: React.ReactNode;
}
export const Pixel = ({ children }: PixelProps) => {
  return (
    <div
      className={clsx(
        "dark:bg-gray-300 bg-gray-700 border-1 border-gray-500 size-10 ",

        colorTransition
      )}
    >
      {children}
    </div>
  );
};
