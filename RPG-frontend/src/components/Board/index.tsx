/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Pixel } from "../Pixel";

interface BoardProps {
  size: number;
  x: number;
  y: number;
  handleZoomChange: (value: number) => void;
}
export const Board = ({ x, y, size, handleZoomChange }: BoardProps) => {
  useEffect(() => {
    const eventHandler = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomChange(size + 0.2);
        } else {
          handleZoomChange(size - 0.2);
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

  const renderBoard = () => {
    const items: React.ReactNode[] = [];

    for (let index = 0; index <= x; index++) {
      items.push(
        <div
          key={index}
          className="grid items-center justify-center"
          style={{ gridTemplateRows: `repeat(${y + 1}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: y + 1 }).map((_, i) => (
            <Pixel key={i} size={size} />
          ))}
        </div>
      );
    }
    return items;
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
        {renderBoard()}
      </div>
    </div>
  );
};
