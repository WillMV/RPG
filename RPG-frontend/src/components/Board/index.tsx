import { useEffect, useMemo, useRef, useState } from "react";
import { Pixel, type PixelProps } from "../Pixel";

import clsx from "clsx";
import { colorTransition } from "../../styles";
import { ZoomSlider } from "../ZoomSlider";
import { createRoot } from "react-dom/client";
import { useDebounce } from "../../hooks/useDebounce";

interface BoardProps {
  x: number;
  y: number;
  color: string;
}

// type PixelElement = React.ReactElement<PixelProps>;

export const Board = ({ x, y, color }: BoardProps) => {
  const [pixels, setPixels] = useState<PixelProps[][]>([]);
  const [zoom, setZoom] = useState(1);
  const [columns, setColumns] = useState<number>(x);
  const [rows, setRows] = useState<number>(y);

  const boardRef = useRef<HTMLDivElement>(null);
  const { setValue } = useDebounce({
    delay: 500,
    onDebounce: () => {
      createPixels();
      setColumns(x);
      setRows(y);
    },
  });

  const child = useMemo(
    () => <div className="size-full" style={{ background: color }} />,
    [color]
  );

  useEffect(() => {
    setValue("");
  }, [x, y]);

  useEffect(() => {
    document?.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey) e.preventDefault();
      },
      { passive: false }
    );
    return () => {
      document?.removeEventListener("wheel", (e) => {
        e.preventDefault();
      });
    };
  }, []);

  useEffect(() => {
    const handlerDrop = (e: MouseEvent) => {
      const target = e.target;

      if (target instanceof HTMLDivElement && target.id.includes("pixel")) {
        const [name, index1, index2] = target.id.split("_");
        if (!name || !index1 || !index2) {
          return;
        }
        const pixel = document.getElementById(target.id);
        if (!pixel) {
          return;
        }

        const root = createRoot(pixel);
        root.render(child);
      }
    };

    document.addEventListener("mouseup", handlerDrop);
    return () => {
      document.removeEventListener("mouseup", handlerDrop);
    };
  }, [child]);

  useEffect(() => {
    if (!boardRef.current) return;
    const currentBoard = boardRef.current;

    const eventHandler = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      if (!e.currentTarget) return;

      const oldZoom = zoom;
      const newZoom = Math.min(
        Math.max(oldZoom + (e.deltaY < 0 ? 0.1 : -0.1), 0.5),
        2
      );

      const rect = currentBoard.getBoundingClientRect();

      const mouseX = e.clientX - rect.left + currentBoard.scrollLeft;
      const mouseY = e.clientY - rect.top + currentBoard.scrollTop;
      handleZoomChange(newZoom);

      requestAnimationFrame(() => {
        currentBoard.scrollTo({
          left: mouseX * (newZoom / oldZoom) - (e.clientX - rect.left),
          top: mouseY * (newZoom / oldZoom) - (e.clientY - rect.top),
        });
      });
    };

    currentBoard.addEventListener("wheel", eventHandler, { passive: false });
    return () => {
      currentBoard.removeEventListener("wheel", eventHandler);
    };
  }, [zoom, boardRef]);

  const createPixels = () => {
    const items: PixelProps[][] = [];

    for (let index = 0; index <= x - 1; index++) {
      items.push(
        Array.from({ length: y }).map((_, i) => ({
          key: `${index}_${i}`,
          id: `pixel_${index}_${i}`,
        }))
      );
    }
    setPixels(items);
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);

    requestAnimationFrame(() => {
      const el = boardRef.current;
      if (el) {
        el.style.overflow = "hidden";
        void el.offsetHeight;
        el.style.overflow = "auto";
      }
    });
  };

  const board = useMemo(() => {
    const board = pixels.map((col, i) => (
      <div key={i} className="flex flex-col">
        {col.map((pixelProps) => (
          <Pixel {...pixelProps} key={pixelProps.id} />
        ))}
      </div>
    ));
    return board;
  }, [pixels]);

  return (
    <div
      className={clsx(
        "relative flex flex-1 items-center min-h-0 min-w-0 max-h-full  mx-5 my-5 p-5",
        "bg-gray-200 dark:bg-gray-600 rounded-2xl border border-gray-400",
        colorTransition
      )}
    >
      <div className="absolute top-4 left-5 z-10 p-2 rounded-xl bg-gray-400/50">
        <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange} />
      </div>
      <div
        ref={boardRef}
        className="flex overflow-auto  size-full justify-center-safe items-center-safe"
      >
        <div
          className="grid bg-amber-50 transition-transform duration-200"
          style={{
            gridTemplateColumns: `repeat(${columns + 1},auto )`,
            gridTemplateRows: `repeat(${rows + 1},auto )`,
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            willChange: "transform",
          }}
        >
          {board}
        </div>
      </div>
    </div>
  );
};
