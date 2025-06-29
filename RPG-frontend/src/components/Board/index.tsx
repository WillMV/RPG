/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { Pixel, type PixelProps } from "../Pixel";
import React from "react";
import clsx from "clsx";
import { colorTransition } from "../../styles";
import { ZoomSlider } from "../ZoomSlider";

interface BoardProps {
  x: number;
  y: number;

  color: string;
}

type PixelElement = React.ReactElement<PixelProps>;

export const Board = ({ x, y, color }: BoardProps) => {
  const [pixels, setPixels] = useState<PixelElement[][]>([]);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    createPixels();
  }, [x, y, zoom]);

  useEffect(() => {
    const handlerDrop = (e: MouseEvent) => {
      const target = e.target;

      if (target instanceof HTMLDivElement && target.id.includes("pixel")) {
        console.log("target", target);

        const [name, index1, index2] = target.id.split("_");
        if (!name || !index1 || !index2) {
          return;
        }

        const pixelTarget = pixels[parseInt(index1)][parseInt(index2)];

        const newPixel = (
          <Pixel
            size={zoom}
            key={pixelTarget.key}
            id={pixelTarget.props.id}
            children={
              <div
                id={`pixelContent_${index1}_${index2}`}
                className={`size-full  top-0 left-0`}
                style={{ backgroundColor: color }}
              />
            }
          />
        );

        setPixels((prevPixels) => {
          const newPixels = [...prevPixels];
          newPixels[parseInt(index1)][parseInt(index2)] = newPixel;
          return newPixels;
        });
      }
    };

    document.addEventListener("mouseup", handlerDrop);
    return () => {
      document.removeEventListener("mouseup", handlerDrop);
    };
  }, [pixels, color]);

  useEffect(() => {
    const eventHandler = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          const incrementSize = zoom + 0.2;
          handleZoomChange(incrementSize >= 2 ? 2 : incrementSize);
        } else {
          const reduceSize = zoom - 0.2;
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
    document.getElementById("board")?.addEventListener("wheel", eventHandler);
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
    const items: PixelElement[][] = [];

    for (let index = 0; index <= x - 1; index++) {
      items.push(
        Array.from({ length: y }).map((_, i) => (
          <Pixel
            key={i}
            id={`pixel_${index}_${i}`}
            size={1}
            children={
              <div className="text-center flex-1 h-full bg-amber-50 size-10 flex justify-center items-center">
                <p>{index + 1 + "," + (i + 1)}</p>
              </div>
            }
          />
        ))
      );
    }
    setPixels(items);
  };

  const handleZoomChange = (zoom: number) => setZoom(zoom);

  const board = useMemo(() => {
    const board = pixels.map((col, i) => (
      <div key={i} className="flex flex-col">
        {col.map((pixel) => pixel)}
      </div>
    ));
    return board;
  }, [pixels]);

  return (
    <div
      id="board"
      className={clsx(
        "relative flex flex-1 min-h-0 min-w-0 max-h-full max-w-full overflow-hidden bg-gray-200 dark:bg-gray-600 ",
        colorTransition
      )}
    >
      <div className="absolute top-4 left-5 z-10 p-2 rounded-xl bg-gray-400/50">
        <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange} />
      </div>

      <div className="overflow-auto m-10 w-full items-center bg-green-100">
        <div
          className="flex justify-center-safe min-size-full scroll-auto items-center-safe bg-blue-100"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            width: `${(x + 1) * 45}px`,
            height: `${(y + 1) * 45}px`,
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <div
            className="grid size-min m-10 bg-red-50 transition-transform duration-200"
            style={{
              gridTemplateColumns: `repeat(${x + 1},auto )`,
              gridTemplateRows: `repeat(${y + 1},auto )`,
            }}
          >
            {board}
          </div>
        </div>
      </div>
    </div>
  );
};
