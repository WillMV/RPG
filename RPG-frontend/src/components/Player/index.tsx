import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export interface PlayerProps {
  name?: string;
}

export const Player = ({ name = "player" }: PlayerProps) => {
  const [position, setPosition] = useState({
    x: window.screenX / 2,
    y: window.screenY / 2,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);

  const positionLimit = ({
    x,
    y,
    screenX,
    screenY,
  }: {
    x: number;
    y: number;
    screenX: number;
    screenY: number;
  }) => {
    return {
      x: Math.min(Math.max(x, 0), screenX),
      y: Math.min(Math.max(y, 0), screenY),
    };
  };

  useEffect(() => {
    if (!playerRef.current) return;
    const player = playerRef.current;

    const handleDrop = () => {
      console.log("Droping");
      setIsDragging(false);
    };

    player.addEventListener("mousedown", handleDrag);
    document.addEventListener("mouseup", handleDrop);

    return () => {
      player.removeEventListener("mousedown", handleDrag);
      document.removeEventListener("mouseup", handleDrop);
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", handleDrag);
    return () => {
      document.removeEventListener("mousemove", handleDrag);
    };
  }, [isDragging, innerPosition]);

  const handleDrag = (e: MouseEvent) => {
    const player = playerRef.current!;
    const rect = player.getBoundingClientRect();

    if (!isDragging) {
      setIsDragging(true);

      const pos = {
        x: e.pageX - rect.left,
        y: e.pageY - rect.top,
      };

      setInnerPosition(pos);
    }

    setPosition(
      positionLimit({
        x: e.pageX,
        y: e.pageY,
        screenX: window.innerWidth,
        screenY: window.innerHeight,
      })
    );
  };

  return (
    <div
      ref={playerRef}
      className={clsx(
        "absolute select-none top-10 z-20 left-10 size-10 bg-amber-400",
        isDragging && "cursor-grabbing"
      )}
      style={{
        left: position.x - innerPosition.x,
        top: position.y - innerPosition.y,
      }}
    >
      {name}
    </div>
  );
};
