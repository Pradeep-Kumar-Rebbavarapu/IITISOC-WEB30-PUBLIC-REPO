import React from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import useWindowSize from "@rooks/use-window-size";
import { useContext } from "react";
import Context from "@/context/Context";
import Cookies from 'js-cookie'
import {toast} from 'react-toastify'
export default function OffCanvasNavbar() {
    const { innerWidth } = useWindowSize();
    const {auth,setauth} = useContext(Context)
    const Logout = () => {
		setauth(null)
		Cookies.remove('user_details')
		Cookies.remove('access')
		Cookies.remove('refreh')
		localStorage.clear()
		toast.success('Logged Out', { position: toast.POSITION.TOP_LEFT })

	}
    const handleToggleNavbar = () => {
        if (document.getElementById("offcanvas")?.offsetLeft === -1000) {
            document.querySelector("#offcanvas")?.classList.add("smenu");
        } else {
            document.querySelector("#offcanvas")?.classList.remove("smenu");
        }
    };
    return (
        <div>
            <div className="">
                <div className="overflow-hidden">
                    <div
                        id="offcanvas"
                        className="absolute left-[-1000px]  h-fit mt-4 pb-28 w-full overflow-hidden bg-gradient-to-tr from-red-600 to-orange-400 transition-all fade-in-out z-[10000000000000] bg-opacity-100"
                    >
                        <button className=" mx-10 mt-10 border-2 rounded-full p-2 bg-white text-black cursour-pointer ">
                            <AiOutlineClose
                                onClick={() => {
                                    document
                                        .querySelector("#offcanvas")
                                        ?.classList.remove("smenu");
                                }}
                                className=""
                            />
                        </button>
                        <h1 className="text-center text-white font-bold mx-5  text-3xl my-10">
                            The Cynaptics Club
                        </h1>
                        <ul className=" w-fit mx-auto ">
                            <Link
                                onClick={() => {
                                    setTimeout(() => {
                                        handleToggleNavbar();
                                    }, 200);
                                }}
                                className="h-fit"
                                href="/"
                            >
                                <li className="my-2 mx-auto border-2 p-2 rounded-md hover:invert transition-all fade-in-out focus:invert text-center  w-[200px] bg-black text-white">
                                    Home
                                </li>
                            </Link>
                            {auth ? (
                                <button
                                    onClick={
                                        () => {
                                            handleToggleNavbar()
                                            setTimeout(() => {
                                                Logout()
                                            }, 200);
                                        }}
                                    className=""
                                    
                                >
                                    <li className="my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white">
                                        Logout
                                    </li>
                                </button>
                            ) : (
                                <Link
                                    onClick={
                                        () => {
                                            setTimeout(() => {
                                                handleToggleNavbar();
                                            }, 200);
                                        }}
                                    className=""
                                    href="/JoinUsPage"
                                >
                                    <li className="my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white">
                                        Join Us
                                    </li>
                                </Link>
                            )}

                            <Link
                                onClick={() => {
                                    setTimeout(() => {
                                        handleToggleNavbar();
                                    }, 200);
                                }}
                                className=""
                                href="/CreateRoomPage"
                            >
                                <li className="my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white">
                                    Meet Live
                                </li>
                            </Link>

                            <Link
                                onClick={() => {
                                    setTimeout(() => {
                                        handleToggleNavbar();
                                    }, 200);
                                }}
                                className=""
                                href="/"
                            >
                                <li className="my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white">
                                    Recordings
                                </li>
                            </Link>


                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}