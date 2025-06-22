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
  }, [x, y]);

  useEffect(() => {
    const handlerDrop = (e: MouseEvent) => {
      const target = e.target;

      if (target instanceof HTMLDivElement && target.id.includes("pixel")) {
        const [name, index1, index2] = target.id.split("_");
        if (!name || !index1 || !index2) {
          return;
        }

        const pixelTarget = pixels[parseInt(index1)][parseInt(index2)];

        const newPixel = (
          <Pixel
            size={zoom}
            id={pixelTarget.props.id}
            children={
              <div
                key={pixelTarget.key}
                className={`size-full`}
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

    document.getElementById("board")?.addEventListener("wheel", eventHandler);
    return () => {
      document
        .getElementById("board")
        ?.removeEventListener("wheel", eventHandler);
    };
  }, [zoom]);

  const createPixels = () => {
    const items: PixelElement[][] = [];

    for (let index = 0; index <= x; index++) {
      items.push(
        Array.from({ length: y + 1 }).map((_, i) => (
          <Pixel key={i} id={`pixel_${index}_${i}`} size={zoom} />
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
    <div className="relative w-full">
      <ZoomSlider zoom={zoom} onZoomChange={handleZoomChange} />

      <div
        id="board"
        className={clsx(
          "flex w-full h-full justify-center items-center overflow-auto bg-gray-200  dark:bg-gray-600",
          colorTransition
        )}
      >
        <div
          className="flex transition-transform duration-200"
          style={{ transform: `scale(${zoom}` }}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${x + 1},auto )` }}
          >
            {board}
          </div>
        </div>
      </div>
    </div>
  );
};
