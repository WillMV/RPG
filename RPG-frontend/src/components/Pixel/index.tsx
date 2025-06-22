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
        "border-1 relative select-none border-gray-700 dark:border-gray-300 size-10 ",
        colorTransition
      )}
    >
      {children}
    </div>
  );
};
