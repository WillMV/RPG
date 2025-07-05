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
  const [transformStyle, setTransformStyle] = useState<string>(
    "scale(1), translate(0, 0)"
  );

  const boardRef = useRef<HTMLDivElement>(null);
  const pixelRef = useRef<HTMLDivElement>(null);

  const { setValue } = useDebounce({
    delay: 500,
    onDebounce: () => {
      createPixels();
      setColumns(x);
      setRows(y);
    },
  });

  useEffect(() => {
    setValue("");
  }, [x, y]);

  const child = useMemo(
    () => (
      <div
        className="size-full absolute top-0 bottom-0 right-0 left-0 z-[-1]"
        style={{ background: color }}
      />
    ),
    [color]
  );

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
    if (!pixelRef.current) return;
    const currentPixel = pixelRef.current;

    const handlerDrop = (e: MouseEvent) => {
      const target = e.currentTarget;
      if (!target) return;

      const root = createRoot(currentPixel);
      root.render(child);
    };

    document.addEventListener("mouseup", handlerDrop);
    return () => {
      document.removeEventListener("mouseup", handlerDrop);
    };
  }, [child]);

  // useEffect(() => {
  //   if (!boardRef.current) return;
  //   const currentBoard = boardRef.current;

  //   const eventHandler = (e: WheelEvent) => {
  //     if (!e.ctrlKey) return;
  //     e.preventDefault();
  //     if (!e.currentTarget) return;

  //     const oldZoom = zoom;
  //     const newZoom = Math.min(
  //       Math.max(oldZoom + (e.deltaY < 0 ? 0.1 : -0.1), 0.5),
  //       2
  //     );

  //     const rect = currentBoard.getBoundingClientRect();

  //     const mouseX = e.clientX - rect.left + currentBoard.scrollLeft;
  //     const mouseY = e.clientY - rect.top + currentBoard.scrollTop;
  //     handleZoomChange(newZoom);

  //     requestAnimationFrame(() => {
  //       currentBoard.scrollTo({
  //         left: mouseX * (newZoom / oldZoom) - (e.clientX - rect.left),
  //         top: mouseY * (newZoom / oldZoom) - (e.clientY - rect.top),
  //       });
  //     });
  //   };

  //   currentBoard.addEventListener("wheel", eventHandler, { passive: false });
  //   return () => {
  //     currentBoard.removeEventListener("wheel", eventHandler);
  //   };
  // }, [zoom, boardRef]);

  const createPixels = () => {
    const items: PixelProps[][] = [];

    for (let index = 0; index <= x - 1; index++) {
      items.push(
        Array.from({ length: y }).map((_, i) => ({
          key: `${index}_${i}`,
          id: `pixel_${index}_${i}`,
          children: (
            <div
              id={`pixel_${index}_${i}`}
              onClick={(e) => {
                e.currentTarget.style.backgroundColor = color;
              }}
              className="size-full flex items-center justify-center "
            >
              {index},{i}
            </div>
          ),
        }))
      );
    }
    setPixels(items);
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);

    if (!boardRef.current) return;
    const boardElement = boardRef.current;
    const firstChild = boardElement.firstChild as HTMLElement;
    if (!firstChild) return;

    const contentWidth = firstChild.offsetWidth;
    const contentHeight = firstChild.offsetHeight;

    const contentScaledWidth = contentWidth * newZoom;
    const contentScaledHeight = contentHeight * newZoom;

    const translateX = (contentWidth - contentScaledWidth) / 2;
    const translateY = (contentHeight - contentScaledHeight) / 2;

    setTransformStyle(
      `translate(${translateX}px, ${translateY}px) scale(${newZoom})`
    );
  };

  const board = useMemo(() => {
    const board = pixels.map((col, i) => (
      <div key={i} className="flex flex-col">
        {col.map((pixelProps) => (
          <Pixel ref={pixelRef} {...pixelProps} key={pixelProps.id} />
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
      <div className="absolute top-1 left-1 z-10 p-2 rounded-xl bg-gray-400/50">
        <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange} />
      </div>
      <div
        ref={boardRef}
        className="flex overflow-auto p-18 size-full justify-center-safe items-center-safe origin-top-left"
      >
        <div
          className="grid overflow-visible transition-transform duration-200"
          style={{
            gridTemplateColumns: `repeat(${columns + 1},auto )`,
            gridTemplateRows: `repeat(${rows + 1},auto )`,
            transform: transformStyle,
            willChange: "transform",
            transformOrigin: "top left",
          }}
        >
          {board}
        </div>
      </div>
    </div>
  );
};
