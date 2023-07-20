import "@/styles/globals.css";
import React, { useState } from "react";
import { ContextProvider } from "../context/Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "regenerator-runtime/runtime";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";

import { ThemeProvider, useTheme } from 'next-themes'
export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const state = store.getState();
  const router = useRouter();
  const [Progress, setProgress] = React.useState(0);
  const {theme,setTheme} = useTheme('light')
  const [mounted,setmounted] = useState(false)
  const currentTheme = theme === 'system' ? (theme === 'dark' ? 'dark' : 'light') : theme
  console.log(currentTheme)
  React.useEffect(() => {
    
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    const isDarkReaderActive = window.DarkReader?.autoToggle();
    
    setmounted(true)
  }, []);
  if(!mounted) return null
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem={true} enableColorScheme={true} attribute="class">
        <ContextProvider>
          <Provider store={store}>
            <div className="dark">
              <div className="z-[1000]">
                <Navbar />
                <ToastContainer theme="colored" transition={Zoom} />
                <LoadingBar
                  color="#E11D48"
                  progress={Progress}
                  height={5}
                  shadowStyle={{ height: "5px", width: "20px" }}
                  waitingTime={200}
                  onLoaderFinished={() => setProgress(0)}
                />
              </div>

              <div className="z-0 ">
                <Component {...pageProps} />
              </div>
            </div>
          </Provider>
        </ContextProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
