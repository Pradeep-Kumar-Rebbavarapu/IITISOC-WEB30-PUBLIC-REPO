import React, { useEffect } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function MobileJoinUs() {
    const ToggleForm = () =>{

    }
    useEffect(() => {
        const wrapper = document.getElementById('Wrapper')
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        const Login = document.querySelector('.Login')
        const Register = document.querySelector('.Register')

        setTimeout(function () {
            const firstDiv = document.getElementById('firstDiv');
            const secondDiv = document.getElementById('secondDiv');

            firstDiv.classList.add('opacity-0');
            setTimeout(function () {
                firstDiv.classList.add('hidden');
                secondDiv.classList.remove('hidden');
                secondDiv.classList.add('opacity-100');
            }, 500);
        }, 5000);
        setTimeout(function () {
            const slideDiv = document.getElementById('secondDiv');
            slideDiv.classList.remove('translate-y-full');
            slideDiv.classList.add('top-1/2', '-translate-y-1/2');



            registerLink.addEventListener('click', () => {
                wrapper.style.height = "600px"
                Login.classList.add('translate-x-[-400px]');
                Register.classList.remove('translate-x-[400px]');
            })
            loginLink.addEventListener('click', () => {
                wrapper.style.height = "580px"
                
                Login.classList.remove('translate-x-[-400px]');
                Register.classList.add('translate-x-[400px]');
            })

            setTimeout(function () {
                wrapper.classList.remove('scale-0')
            }, 200);
        }, 5500);
        return ()=>{
            
        }
    }, [])
    return (
        <div>
            <div className=" w-screen h-screen">
                <div id="firstDiv" className="bg-[#333333] flex flex-col items-center justify-center bg-[url('/images/e62afd154b9ec394b7d282c7ef8e688c.gif')] bg-contain bg-center bg-no-repeat transition-opacity duration-500 w-screen h-screen">
                    <div className="text-2xl md:text-5xl sm:text-5xl text-white text-center">Experience seamless collaboration</div>
                    <div className="text-sm md:text-xl sm:text-xl text-white text-center">Login and conference like never before!</div>
                </div>
                <div id="secondDiv" className="bg-[#E67E22] w-screen h-screen fixed inset-x-0 bottom-0 flex items-center justify-center transition-transform duration-500 transform translate-y-full">
                    <div id='Wrapper' className="wrapper relative w-[400px] h-[580px] bg-[rgba(0,0,0,0.1)] border-2 border-[rgba(255,255,255, 0.5)] rounded-3xl backdrop-blur-sm shadow flex justify-center items-center transition-all duration-300 overflow-hidden scale-0 bg-white mx-2">
                        <div className="w-full p-[40px] bg-white Login transition-all duration-500">
                            <h2 className="text-2xl text-[#154360] text-center">LOGIN</h2>
                            <LoginForm ToggleForm={ToggleForm} />
                        </div>
                        <div className="w-full p-[40px] absolute translate-x-[400px] Register transition-all duration-500">
                            <h2 className="text-2xl text-[#154360] text-center">REGISTER</h2>
                            <SignupForm ToggleForm={ToggleForm} />
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}
