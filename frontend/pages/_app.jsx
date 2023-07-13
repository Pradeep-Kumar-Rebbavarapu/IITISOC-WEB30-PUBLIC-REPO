import "@/styles/globals.css";
import React from "react";
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
import Cookies from "js-cookie";
import axios from "axios";
export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const state = store.getState();
  const router = useRouter();
  const [Progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Provider store={store}>
            <div className="">
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
