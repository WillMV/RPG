interface PixelProps {
  size: number;
  key: number;
}
export const Pixel = ({ key }: PixelProps) => {
  return (
    <div
      key={key}
      className="bg-gray-300 dark:bg-gray-700 border-1 border-gray-500 size-10"
    ></div>
  );
};
