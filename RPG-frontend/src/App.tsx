import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import { Header } from "./components/Header";
import { colorTransition } from "./styles";
import { Analytics } from "@vercel/analytics/react";
import { Board } from "./components/Board";

function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const [xPixels, setXPixels] = useState(10);
  const [yPixels, setYPixels] = useState(10);

  return (
    <div className={clsx("flex flex-col h-screen", isDark ? "dark" : "")}>
      <Analytics />
      <Header onChangeTheme={setIsDark} isDark={isDark}>
        <div className="flex gap-2">
          <legend className="flex flex-col items-center border-[1px] rounded-[5px] p-2 border-gray-500 ">
            X = {xPixels}
            <input
              type="range"
              min="1"
              max="25"
              value={xPixels}
              onChange={(e) => setXPixels(parseInt(e.target.value))}
            />
          </legend>
          <legend className="flex flex-col items-center border-[1px] rounded-[5px] p-2 border-gray-500 ">
            Y = {yPixels}
            <input
              type="range"
              min="1"
              max="25"
              value={yPixels}
              onChange={(e) => setYPixels(parseInt(e.target.value))}
            />
          </legend>
        </div>
      </Header>

      <div
        className={clsx(
          "flex-1 flex bg-gray-200 dark:bg-gray-600",
          colorTransition
        )}
      >
        <Board size={10} x={xPixels} y={yPixels} />
      </div>
    </div>
  );
}

export default App;
