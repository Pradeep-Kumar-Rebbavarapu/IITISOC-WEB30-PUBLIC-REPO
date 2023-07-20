import Image from 'next/image'
import Link from 'next/link'
import React,{useRef,useEffect} from 'react'
import logo from '../public/images/logo.png'
import { BsFillPersonFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../public/images/Logo.png'
import Cookies from 'js-cookie'
import Context from '@/context/Context'
import { useContext } from 'react'
import dynamic from 'next/dynamic'
import {HiBarsArrowDown} from 'react-icons/hi2'
import OffCanvasNavbar from "./OffCanvasNavbar"
import { useRouter } from 'next/router'
const NavbarEle = () => {
	const { auth, setauth,Logout } = useContext(Context)
	const router = useRouter()
	const ref = useRef(null);
	useEffect(() => {
		const handleClicKOutsideOffcanvas = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				document.querySelector("#offcanvas")?.classList.remove("smenu");
			}
		};
		document.addEventListener("click", handleClicKOutsideOffcanvas, true);
		return () => {
			document.removeEventListener(
				"click",
				handleClicKOutsideOffcanvas,
				true
			);
		};
	}, []);
	const OpenOffCanvas = () => {
		if (document.getElementById("offcanvas").offsetLeft === -1000) {
			document.querySelector("#offcanvas").classList.add("smenu");
		} else {
			document.querySelector("#offcanvas").classList.remove("smenu");
		}
	};
	return (
		<>

			<div className={`h-full w-full py-2 justify-between mb-2   items-center grid grid-cols-[auto_auto_auto]  bg-white z-[100000000] ${router.pathname.includes('/RoomPage')?"hidden":""}`}>
				<div>
					<Image src={logo} alt="logo" className='w-[80px] h-[80px] ml-2 rounded-md' />
				</div>
				<div className='rounded-md w-fit ml-2 font-bold text-2xl '>
				<span className='text-4xl'>W</span>ELCOME <span className='text-4xl'>T</span>O <span className='text-4xl'>C</span>ONFEROLIVE
				</div>
				<div className='lg:flex hidden items-center !w-full justify-center'>
					<div className='flex  items-center   h-full'>
						<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/">Home</Link>
						{auth ? (
							<button onClick={Logout} className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' >Logout</button>

						) : (
							<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/JoinUsPage">Join Us</Link>
						)}

						<Link className='text-xl font-bold mx-5 hover:border-t-2 border-orange-600' href="/CreateRoomPage">Meet Live</Link>
						
					</div>
					
				</div>
				<button
					onClick={OpenOffCanvas}
					id="offcanvasbtn"
					className="my-auto lg:hidden"
				>
					<HiBarsArrowDown className="my-auto mx-auto w-9 h-9 mr-2" />
				</button>
				<div ref={ref} className="lg:hidden overflow-hidden text-white">
					<OffCanvasNavbar />
				</div>
			</div>
			
		</>
	)
}
//DYNAMIC SSR 	FALSE


//DYNAMIC SSR 	TRUE
export default dynamic(() => Promise.resolve(NavbarEle), {
	ssr: false,
	loading: () => <p>Loading...</p>,
})