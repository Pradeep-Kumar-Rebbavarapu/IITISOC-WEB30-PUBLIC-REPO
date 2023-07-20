import React from 'react'
import { useEffect } from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function LaptopJoinUsPage() {


    const ToggleForm = (type) => {
        const wrapper = document.getElementById('Wrapper')
        const Login = document.getElementById('Login')
        const Register = document.getElementById('Signup')
        if (type === 'signup') {


            wrapper.classList.add('!h-[600px]')
            Login.classList.add('translate-x-[-500px]');
            Register.classList.remove('translate-x-[500px]');

        }
        else {

            wrapper.classList.remove('!h-[600px]')
            Login.classList.remove('translate-x-[-500px]');
            Register.classList.add('translate-x-[500px]');
        }

    }
    return (
        <div className="bg-[#E67E22] w-full h-full grid grid-cols-2 ">
            <div id="firstDiv" className="bg-[url('/images/e62afd154b9ec394b7d282c7ef8e688c.gif')] bg-cover bg-center relative h-full w-full">
                <div className='-translate-y-10 h-full w-full'>
                <div className="text-5xl text-white pt-[80%] text-center">Experience seamless collaboration</div>
                <div className="text-xl  text-white text-center">Login and conference like never before!</div>
                </div>
            </div>
            <div className="mx-auto my-auto ">
                <div id="Wrapper" className="wrapper relative w-[450px] h-[600px] bg-[rgba(0,0,0,0.1)] border-2 border-[rgba(255,255,255, 0.5)] rounded-3xl backdrop-blur-sm shadow flex justify-center items-center transition-all duration-300 overflow-hidden bg-white">

                    <div id="Login" className="w-full p-[40px] absolute Login transition-all duration-500 ">
                        <h2 className="text-2xl text-[#15436] text-center">LOGIN</h2>
                        <LoginForm ToggleForm={ToggleForm} />
                    </div>

                    <div id='Signup' className="w-full p-[40px] absolute translate-x-[500px] Register transition-all duration-500">
                        <h2 className="text-2xl text-[#15436] text-center">REGISTER</h2>
                        <SignupForm ToggleForm={ToggleForm} />

                    </div>
                </div>
            </div>
        </div>
    )
}
