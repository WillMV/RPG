import clsx from "clsx";
import { colorTransition } from "../../styles";
import * as Motion from "motion/react-client";

export interface PixelProps {
  size?: number;
  id?: string;
  children?: React.ReactNode;
}
export const Pixel = ({ children, id, size = 1 }: PixelProps) => {
  return (
    <Motion.div
      id={id}
      className={clsx(
        "border-1 relative flex select-none border-gray-700 dark:border-gray-300 size-10 ",
        colorTransition
      )}
      style={{ width: 40 * size, height: 40 * size }}
    >
      {children}
    </Motion.div>
  );
};
