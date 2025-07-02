import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import "./App.css";
import { Header } from "./components/Header";
import { colorTransition } from "./styles";

import { Board } from "./components/Board";
import { SideBar } from "./components/Sidebar";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { SideBarToggle } from "./components/SideBarToggle";

import { Player, type PlayerProps } from "./components/Player";

function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const [xPixels, setXPixels] = useState(10);
  const [yPixels, setYPixels] = useState(10);
  const [sideBar, setSideBar] = useState(false);
  const [color, setColor] = useState<string>("#ff0000");
  const [players, setPlayers] = useState<PlayerProps[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const currentInput = inputRef.current;

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      setColor(target.value);
    };

    currentInput.addEventListener("change", handleChange);

    return () => {
      currentInput.removeEventListener("change", handleChange);
    };
  }, [inputRef]);

  const createPlayer = () => {
    setPlayers([{}]);
  };

  const ThemeButton = () => {
    if (!isDark) {
      return (
        <>
          <MdOutlineDarkMode
            className={clsx(
              "cursor-pointer dark:text-gray-300 overflow-clip text-gray-800 size-6",
              colorTransition
            )}
            onClick={() => setIsDark(true)}
          />
        </>
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
  <ThemeButton />;
  return (
    <div ref={divRef} className={clsx(isDark ? "dark" : "", "relative")}>
      {players.map(() => (
        <Player />
      ))}
      <div
        className={clsx(
          "flex flex-row-reverse h-[100vh] bg-gray-200 dark:bg-gray-900",
          colorTransition
        )}
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
              ref={inputRef}
              id="color"
              defaultValue={color}
              type="color"
            />
          </fieldset>

          <div className="flex w-full justify-around mt-2">
            <p>Tema:</p>

            <ThemeButton />
          </div>
        </SideBar>
        <main
          className={clsx(
            "flex flex-col h-screen w-screen  min-w-0 overflow-clip",
            sideBar ? " not-md:hidden" : ""
          )}
        >
          <Header className=" justify-between gap-10">
            <button
              className={clsx(
                "bg-gray-400 shadow-gray-00 overflow-clip cursor-pointer hover:bg-slate-600 hover:shadow-md dark:bg-gray-500  dark:hover:bg-gray-600 rounded px-2 py-1 active:shadow-md  dark:active:bg-blue-900",
                colorTransition
              )}
              onClick={createPlayer}
            >
              Criar Player
            </button>

            <h1>Pixel RPG</h1>
            {!sideBar ? (
              <SideBarToggle
                onToggle={() => {
                  setSideBar(!sideBar);
                }}
                value={sideBar}
              />
            ) : (
              <div />
            )}
          </Header>

          <Board x={xPixels} y={yPixels} color={color} />
        </main>
      </div>
    </div>
  );
}

export default App;
