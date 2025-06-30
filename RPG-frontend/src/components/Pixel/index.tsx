import clsx from "clsx";
import { colorTransition } from "../../styles";
import * as Motion from "motion/react-client";

export interface PixelProps {
  size?: number;
  id?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}
export const Pixel = ({ children, id, size = 1, ref }: PixelProps) => {
  return (
    <Motion.div
      ref={ref}
      id={id}
      className={clsx(
        "border-1 relative flex select-none bg-transparent size-10  ",
        colorTransition
      )}
      style={{ width: 40 * size, height: 40 * size }}
    >
      {children}
    </Motion.div>
  );
};
