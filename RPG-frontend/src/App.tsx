import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import { Header } from "./components/Header";
import { colorTransition } from "./styles";

import { Board } from "./components/Board";
import { SideBar } from "./components/SideBar";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { SideBarToggle } from "./components/SideBarToggle";

function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const [xPixels, setXPixels] = useState(10);
  const [yPixels, setYPixels] = useState(10);
  const [sideBar, setSideBar] = useState(false);
  const [color, setColor] = useState<string>("#ff0000");

  const ThemeButton = () => {
    if (!isDark) {
      return (
        <MdOutlineDarkMode
          className={clsx(
            "cursor-pointer dark:text-gray-300 text-gray-800 size-6",
            colorTransition
          )}
          onClick={() => setIsDark(true)}
        />
      );
    } else {
      return (
        <MdOutlineLightMode
          className={clsx(
            "cursor-pointer dark:text-gray-300 size-6",
            colorTransition
          )}
          onClick={() => setIsDark(false)}
        />
      );
    }
  };

  return (
    <div className={clsx(isDark ? "dark" : "")}>
      <div className="flex flex-row-reverse">
        <SideBar onClose={() => setSideBar(false)} open={sideBar}>
          <div className="flex flex-col gap-2 justify-center flex-1">
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
        </SideBar>
        <div className="flex flex-col h-screen overflow-clip w-screen">
          <Header onChangeTheme={setIsDark} isDark={isDark}>
            <div className="flex flex-1 justify-end">
              <div className="flex items-center gap-10">
                <ThemeButton />
                <SideBarToggle
                  onToggle={() => setSideBar(!sideBar)}
                  value={sideBar}
                />
              </div>
            </div>
          </Header>
          <div
            className={clsx(
              "flex flex-1 overflow-hidden justify-center p-5 bg-gray-200 dark:bg-gray-600",
              colorTransition
            )}
          >
            <Board x={xPixels} y={yPixels} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
