import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import { Header } from "./components/Header";
import { colorTransition } from "./styles";

import { Board } from "./components/Board";
import { SideBar } from "./components/Sidebar";
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
    <div className={clsx(isDark ? "dark" : "", "relative")}>
      <div
        className={
          "flex flex-row-reverse h-[100vh] bg-gray-200 dark:bg-gray-900"
        }
      >
        <SideBar open={sideBar} onClose={() => setSideBar(false)}>
          <fieldset className="flex flex-col gap-2 justify-center flex-1 items-center border-[1px] rounded-[5px] p-2 border-gray-500 ">
            <legend title="Tamanho do x" className="">
              Board
            </legend>
            <label htmlFor="xPixels">X = {xPixels}</label>
            <input
              id="xPixels"
              type="range"
              min="1"
              max="50"
              value={xPixels}
              onChange={(e) => setXPixels(parseInt(e.target.value))}
            />

            <label htmlFor="yPixels">Y = {yPixels}</label>
            <input
              id="yPixels"
              type="range"
              min="1"
              max="50"
              value={yPixels}
              onChange={(e) => setYPixels(parseInt(e.target.value))}
            />
            <label htmlFor="color" className={`text-[${color}]`}>
              Cor
            </label>
            <input
              id="color"
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </fieldset>
        </SideBar>
        <div
          className={clsx(
            "flex flex-col h-screen overflow-clip w-screen min-w-0",

            sideBar ? " not-md:hidden" : ""
          )}
        >
          <Header className=" justify-between gap-10">
            <ThemeButton />
            <h1>Pixel RPG</h1>
            {!sideBar ? (
              <SideBarToggle
                onToggle={() => {
                  console.log(sideBar);
                  setSideBar(!sideBar);
                }}
                value={sideBar}
              />
            ) : (
              <div />
            )}
          </Header>

          <Board x={xPixels} y={yPixels} color={color} />
        </div>
      </div>
    </div>
  );
}

export default App;
