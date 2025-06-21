import clsx from "clsx";
import { colorTransition } from "../../styles";

export interface PixelProps {
  size: number;
  id?: string;
  children?: React.ReactNode;
}
export const Pixel = ({ children, id }: PixelProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "dark:bg-gray-300 bg-gray-700 border-1 border-gray-500 size-10 ",

        colorTransition
      )}
    >
      {children}
    </div>
  );
};
