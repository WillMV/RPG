import { Pixel } from "../Pixel";

interface BoardProps {
  size: number;
  x: number;
  y: number;
}
export const Board = ({ x = 10, y = 10, size = 10 }: BoardProps) => {
  const renderBoard = () => {
    const items: React.ReactNode[] = [];

    for (let index = 0; index <= x; index++) {
      items.push(
        <div
          key={index}
          className="grid grid-rows-[repeat(${y+1},minmax(0,1fr))] size-10 bg-amber-300"
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
    <div className="flex min-h-full max-h-full max-w-full min-w-full flex-row overflow-auto p-5  bg-gray-200 justify-center">
      {renderBoard()}
    </div>
  );
};
