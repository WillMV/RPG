import clsx from "clsx";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { colorTransition } from "../../styles";
interface ZoomSliderProps {
  min?: number;
  max?: number;
  step?: number;
  zoom: number;
  onZoomChange: (value: number) => void;
}

export const ZoomSlider = ({
  min = 0.5,
  max = 2,
  step = 0.1,
  zoom,
  onZoomChange,
}: ZoomSliderProps) => {
  const updateZoom = (value: number) => {
    const clamped = Math.min(max, Math.max(min, value));

    onZoomChange?.(clamped);
  };

  return (
    <div className="flex flex-col w-full max-w-30 gap-2">
      <div className="flex items-center gap-2 w-full max-w-xs">
        <button
          onClick={() => updateZoom(zoom - step)}
          className={clsx(
            "p-2 bg-gray-400 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded",
            colorTransition
          )}
        >
          <FaMinus
            className={clsx(
              "w-5 h-5 text-gray-800 dark:text-gray-100",
              colorTransition
            )}
          />
        </button>
        <span className="w-10 text-center font-mono text-sm select-none">
          {zoom.toFixed(1)}x
        </span>
        <button
          onClick={() => updateZoom(zoom + step)}
          className={clsx(
            "p-2 bg-gray-400 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded",
            colorTransition
          )}
        >
          <FaPlus
            className={clsx(
              "w-5 h-5 text-gray-800 dark:text-gray-100",
              colorTransition
            )}
          />
        </button>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={zoom}
        onChange={(e) => updateZoom(parseFloat(e.target.value))}
        className={clsx(
          "w-full cursor-pointer accent-gray-400 ",
          colorTransition
        )}
      />
    </div>
  );
};
