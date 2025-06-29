import clsx from "clsx";
import { colorTransition } from "../../styles";

export interface PixelProps {
  size: number;
  id?: string;
  children?: React.ReactNode;
}
export const Pixel = ({ children, id, size }: PixelProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "border-1 relative flex select-none border-gray-700 dark:border-gray-300 size-10 ",
        colorTransition
      )}
      style={{ width: 40 * size, height: 40 * size }}
    >
      {children}
    </div>
  );
};
