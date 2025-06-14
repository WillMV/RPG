import { useState } from "react";
import clsx from "clsx";
import "./App.css";
import { Header } from "./components/Header";
import { colorTransition } from "./styles";
import { Analytics } from "@vercel/analytics/next";

function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  return (
    <div className={clsx("flex flex-col h-screen", isDark ? "dark" : "")}>
      <Analytics />
      <Header onChangeTheme={setIsDark} isDark={isDark} />

      <div
        className={clsx("flex-1 bg-gray-200 dark:bg-gray-600", colorTransition)}
      ></div>
    </div>
  );
}

export default App;
