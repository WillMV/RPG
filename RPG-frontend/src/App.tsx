import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import { Header } from "./components/Header";
import { colorTransition } from "./styles";
import { Analytics } from "@vercel/analytics/react";
import { Board } from "./components/Board";
import { ZoomSlider } from "./components/ZoomSlider";

function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const [xPixels, setXPixels] = useState(10);
  const [yPixels, setYPixels] = useState(10);
  const [size, setSize] = useState(1);
  const [color, setColor] = useState<string>("#ff0000");

  const handleZoomChange = (zoom: number) => {
    setSize(zoom);
  };

  return (
    <div
      className={clsx(
        "flex flex-col h-screen overflow-clip w-screen",
        isDark ? "dark" : ""
      )}
    >
      <Analytics />
      <Header onChangeTheme={setIsDark} isDark={isDark}>
        <div className="flex gap-2">
          <legend className="flex flex-col items-center border-[1px] rounded-[5px] p-2 border-gray-500 ">
            X = {xPixels}
            <input
              type="range"
              min="1"
              max="50"
              value={xPixels}
              onChange={(e) => setXPixels(parseInt(e.target.value))}
            />
          </legend>
          <legend className="flex flex-col items-center border-[1px] rounded-[5px] p-2 border-gray-500 ">
            Y = {yPixels}
            <input
              type="range"
              min="1"
              max="50"
              value={yPixels}
              onChange={(e) => setYPixels(parseInt(e.target.value))}
            />
          </legend>
          <ZoomSlider zoom={size} onZoomChange={setSize} />
          <legend className="flex flex-col items-center border-[1px] rounded-[5px] p-2 border-gray-500 ">
            <p className={`text-[${color}]`}>Cor</p>
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </legend>
        </div>
      </Header>

      <main
        className={clsx(
          "flex flex-1 overflow-hidden justify-center p-5 bg-gray-200 dark:bg-gray-600",
          colorTransition
        )}
      >
        <Board
          size={size}
          x={xPixels}
          y={yPixels}
          handleZoomChange={handleZoomChange}
          color={color}
        />
      </main>
    </div>
  );
}

export default App;
