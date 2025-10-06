import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

function Root() {
  const [started, setStarted] = useState(false);

  const enterFullscreen = () => {
    const el = document.documentElement
    if (el.requestFullscreen) el.requestFullscreen();
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col gap-3 items-center justify-center text-white">
        <img src="/title.gif" className="w-60 sm:w-40"/>
        <h1 className="text-2xl">A lovely game by dos</h1>
        <button
          onClick={enterFullscreen}
          className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  return <App />;
}

const root = document.getElementById("root")!;
createRoot(root).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
