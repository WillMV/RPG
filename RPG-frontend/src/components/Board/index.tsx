import { useEffect, useMemo, useState } from "react";
import { Pixel, type PixelProps } from "../Pixel";

import clsx from "clsx";
import { colorTransition } from "../../styles";
import { ZoomSlider } from "../ZoomSlider";
import { createRoot } from "react-dom/client";

interface BoardProps {
  x: number;
  y: number;
  color: string;
}

// type PixelElement = React.ReactElement<PixelProps>;

export const Board = ({ x, y, color }: BoardProps) => {
  const [pixels, setPixels] = useState<PixelProps[][]>([]);
  const [zoom, setZoom] = useState(1);

  const child = useMemo(
    () => <div className="size-full" style={{ background: color }} />,
    [color]
  );

  useEffect(() => {
    createPixels();
  }, [x, y]);

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

        // pixel.appendChild(<div>teste</div>);

        // const pixelTarget = pixels[parseInt(index1)][parseInt(index2)];

        // setPixels((prevPixels) => {
        //   const newPixels = [...prevPixels];
        //   newPixels[parseInt(index1)][parseInt(index2)] = newPixel;
        //   return newPixels;
        // });
      }
    };

    document.addEventListener("mouseup", handlerDrop);
    return () => {
      document.removeEventListener("mouseup", handlerDrop);
    };
  }, [child]);

  useEffect(() => {
    const eventHandler = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          const incrementSize = zoom + 0.1;
          handleZoomChange(incrementSize >= 2 ? 2 : incrementSize);
        } else {
          const reduceSize = zoom - 0.1;
          handleZoomChange(reduceSize <= 0.5 ? 0.5 : reduceSize);
        }
      }
    };

    document?.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey) e.preventDefault();
      },
      { passive: false }
    );
    document
      .getElementById("board")
      ?.addEventListener("wheel", eventHandler, { passive: false });
    return () => {
      document
        .getElementById("board")
        ?.removeEventListener("wheel", eventHandler);
      document?.addEventListener("wheel", (e) => {
        e.preventDefault();
      });
    };
  }, [zoom]);

  const createPixels = () => {
    const items: PixelProps[][] = [];

    for (let index = 0; index <= x - 1; index++) {
      items.push(
        Array.from({ length: y }).map((_, i) => ({
          size: zoom,
          key: `${index}_${i}`,
          id: `pixel_${index}_${i}`,
        }))
      );
    }
    setPixels(items);
  };

  const handleZoomChange = (zoom: number) => setZoom(zoom);

  const board = useMemo(() => {
    const board = pixels.map((col, i) => (
      <div key={i} className="flex flex-col">
        {col.map((pixelProps) => (
          <Pixel {...pixelProps} size={1} key={pixelProps.id} />
        ))}
      </div>
    ));
    return board;
  }, [pixels]);

  return (
    <div
      id="board"
      className={clsx(
        "relative flex flex-1 min-h-0 min-w-0 max-h-full  overflow-hidden bg-gray-200 dark:bg-gray-600 ",
        colorTransition
      )}
    >
      <div className="absolute top-4 left-5 z-10 p-2 rounded-xl bg-gray-400/50">
        <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange} />
      </div>
      <div className="w-[90%] mx-5 my-24 p-5 rounded-2xl border border-gray-400 items-center ">
        <div className="flex overflow-auto size-full justify-center-safe items-center-safe">
          <div
            className="grid p-10 transition-transform duration-200"
            style={{
              gridTemplateColumns: `repeat(${x + 1},auto )`,
              gridTemplateRows: `repeat(${y + 1},auto )`,
              transform: `scale(${zoom})`,
            }}
          >
            {board}
          </div>
        </div>
      </div>
    </div>
  );
};
