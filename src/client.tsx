import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./app";
import "./styles.css";
import { Providers } from "@/providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Providers>
      <div className="bg-neutral-50 text-base text-neutral-900 antialiased transition-colors selection:bg-blue-700 selection:text-white dark:bg-neutral-950 dark:text-neutral-100">
        <Chat />
      </div>
    </Providers>
  </React.StrictMode>
);
