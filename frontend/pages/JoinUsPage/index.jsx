import React from 'react'
import { useEffect } from 'react'

export default function JoinUsPage() {
    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const Login = document.querySelector('.Login')
        const Register = document.querySelector('.Register')

        registerLink.addEventListener('click', () => {
            wrapper.classList.add('h-[520px]');
            Login.classList.add('translate-x-[-400px]');
            Register.classList.remove('translate-x-[400px]');
        })
        loginLink.addEventListener('click', () => {
            wrapper.classList.remove('h-[520px]');
            Login.classList.remove('translate-x-[-400px]');
            Register.classList.add('translate-x-[400px]');
        })

        
            wrapper.classList.remove('scale-0')
        
    }, [])
    return (
        <div>
            <div className="bg-[#E67E22] w-screen h-screen grid grid-cols-2">
                <div className="bg-[url('/images/e62afd154b9ec394b7d282c7ef8e688c.gif')] bg-cover bg-center">
                    <div className="text-5xl text-white pt-[80%] text-center">Experience seamless collaboration</div>
                    <div className="text-xl text-white text-center">Login and conference like never before!</div>
                </div>
                <div className="mx-auto my-auto">
                    <div className="wrapper relative w-[400px] h-[440px] bg-white border-2 border-[rgba(255,255,255, 0.5)] rounded-3xl backdrop-blur-sm shadow flex justify-center items-center transition-all duration-300 overflow-hidden scale-0">
                        <span className="absolute top-0 right-0 w-11 h-11 bg-[#154360] text-3xl flex justify-center items-center rounded-bl-2xl cursor-pointer z-[1]">
                            <ion-icon name="close-outline"></ion-icon>
                        </span>
                        <div className="w-full p-[40px] Login transition-all duration-500">
                            <h2 className="text-2xl text-[#154360] text-center">LOGIN</h2>
                            <form action="#">
                                <div className="relative w-full h-[50px] border-b-2 border-[#162983] my-[30px]">
                                    <span className="absolute right-2 text-xl text-[#154360] leading-[57px]"><ion-icon name="mail"></ion-icon></span>
                                    <input className="w-full h-full bg-transparent border-none outline-none peer font-semibold pr-8 pl-1" type="email" required />
                                    <label className="absolute top-[30px] left-[5px] translate-y-[-50%] text-lg text-[#154360] font-semibold peer-focus:top-[-5px] peer-valid:top-[-5px] transition-all duration-500">Email</label>
                                </div>
                                <div className="relative w-full h-[50px] border-b-2 border-[#162983] my-[30px]">
                                    <span className="absolute right-2 text-xl text-[#154360] leading-[57px]"><ion-icon name="lock-closed"></ion-icon></span>
                                    <input className="w-full h-full bg-transparent border-none outline-none peer font-semibold pr-8 pl-1" type="password" required />
                                    <label className="absolute top-[30px] left-[5px] translate-y-[-50%] text-lg text-[#154360] font-semibold peer-focus:top-[-5px] peer-valid:top-[-5px] transition-all duration-500">Password</label>
                                </div>
                                <div className="text-sm text-[#154360] font-medium ml-[-15px] mr-[15px] flex justify-between">
                                    <label><input className="accent-[#154360] mr-1" type="checkbox" /> Remember Me</label>
                                    <a className="text-[#154360] hover:underline" href="">Forgot Password?</a>
                                </div>
                                <button className="w-full h-11 bg-[#154360] rounded-md cursor-pointer text-lg my-4 font-medium" type="submit">Login</button>
                                <div className="text-sm text-[#154360] text-center font-medium ">
                                    <p>Don't have an account? <a className="text-[#154360] font-semibold hover:underline register-link" href="#">Register</a></p>
                                </div>
                            </form>
                        </div>

                        <div className="w-full p-[40px] absolute translate-x-[400px] Register transition-all duration-500">
                            <h2 className="text-2xl text-[#154360] text-center">REGISTER</h2>
                            <form action="#">
                                <div className="relative w-full h-[50px] border-b-2 border-[#162983] my-[30px]">
                                    <span className="absolute right-2 text-xl text-[#154360] leading-[57px]"><ion-icon name="person"></ion-icon></span>
                                    <input className="w-full h-full bg-transparent border-none outline-none peer font-semibold pr-8 pl-1" type="text" required />
                                    <label className="absolute top-[30px] left-[5px] translate-y-[-50%] text-lg text-[#154360] font-semibold peer-focus:top-[-5px] peer-valid:top-[-5px] transition-all duration-500">Username</label>
                                </div>
                                <div className="relative w-full h-[50px] border-b-2 border-[#162983] my-[30px]">
                                    <span className="absolute right-2 text-xl text-[#154360] leading-[57px]"><ion-icon name="mail"></ion-icon></span>
                                    <input className="w-full h-full bg-transparent border-none outline-none peer font-semibold pr-8 pl-1" type="email" required />
                                    <label className="absolute top-[30px] left-[5px] translate-y-[-50%] text-lg text-[#154360] font-semibold peer-focus:top-[-5px] peer-valid:top-[-5px] transition-all duration-500">Email</label>
                                </div>
                                <div className="relative w-full h-[50px] border-b-2 border-[#162983] my-[30px]">
                                    <span className="absolute right-2 text-xl text-[#154360] leading-[57px]"><ion-icon name="lock-closed"></ion-icon></span>
                                    <input className="w-full h-full bg-transparent border-none outline-none peer font-semibold pr-8 pl-1" type="password" required />
                                    <label className="absolute top-[30px] left-[5px] translate-y-[-50%] text-lg text-[#154360] font-semibold peer-focus:top-[-5px] peer-valid:top-[-5px] transition-all duration-500">Password</label>
                                </div>
                                <div className="text-sm text-[#154360] font-medium ml-[-15px] mr-[15px] flex justify-between">
                                    <label><input className="accent-[#154360] mr-1" type="checkbox" />I agree to the terms and conditions</label>
                                </div>
                                <button className="w-full h-11 bg-[#154360] rounded-md cursor-pointer text-lg my-4 font-medium" type="submit">Register</button>
                                <div className="text-sm text-[#154360] text-center font-medium ">
                                    <p>Already have an account? <a className="text-[#154360] font-semibold hover:underline login-link" href="#">Login</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
