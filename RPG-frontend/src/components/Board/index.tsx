/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Pixel, type PixelProps } from "../Pixel";
import React from "react";

interface BoardProps {
  size: number;
  x: number;
  y: number;
  handleZoomChange: (value: number) => void;
}

type PixelElement = React.ReactElement<PixelProps>;

export const Board = ({ x, y, size, handleZoomChange }: BoardProps) => {
  const [pixels, setPixels] = useState<PixelElement[][]>([]);

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

        const newPixel = (
          <Pixel
            size={size}
            children={<div className="size-full bg-amber-400" />}
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
  }, [pixels]);

  useEffect(() => {
    const eventHandler = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          const incrementSize = size + 0.2;
          handleZoomChange(incrementSize >= 2 ? 2 : incrementSize);
        } else {
          const reduceSize = size - 0.2;
          handleZoomChange(reduceSize <= 0.5 ? 0.5 : reduceSize);
        }
      }
    };

    document.getElementById("board")?.addEventListener("wheel", eventHandler);
    return () => {
      document
        .getElementById("board")
        ?.removeEventListener("wheel", eventHandler);
    };
  }, [size]);

  const createPixels = () => {
    const items: PixelElement[][] = [];

    for (let index = 0; index <= x; index++) {
      items.push(
        Array.from({ length: y + 1 }).map((_, i) => (
          <Pixel key={i} id={`pixel_${index}_${i}`} size={size} />
        ))
      );
    }
    setPixels(items);
  };

  return (
    <div
      id="board"
      className="flex w-[80vw] h-[80vh] justify-center items-center overflow-scroll bg-gray-200 "
    >
      <div
        className="flex transition-transform duration-200"
        style={{ transform: `scale(${size}` }}
      >
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${x + 1}, auto)` }}
        >
          {pixels.map((col, i) => (
            <div key={i} className="flex flex-col">
              {col.map((pixel) => pixel)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
