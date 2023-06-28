import React, { useEffect } from 'react'

export default function VerifyOTP() {
  useEffect(() => {


    function OTPInput() {
      const inputs = document.querySelectorAll('#otp > *[id]');
      for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function (event) { if (event.key === "Backspace") { inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus(); } else { if (i === inputs.length - 1 && inputs[i].value !== '') { return true; } else if (event.keyCode > 47 && event.keyCode < 58) { inputs[i].value = event.key; if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode > 64 && event.keyCode < 91) { inputs[i].value = String.fromCharCode(event.keyCode); if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); }
    } OTPInput();

  }, [])

  const VerifyOtp = () => {

  }
  return (
    <div id="VerifyOtp" className='flex w-full h-full  items-center justify-center mx-auto '>
      <div className="mx-auto sm:px-4 height-100 flex  items-center justify-center">
        <div className="relative mx-auto  items-center justify-center">
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 p-2 text-center items-center justify-center card">
            <h6>Please enter the one time password <br /> to verify your account</h6>
            <div> <span>A code has been sent to your gmail</span> <small> {typeof window !== "undefined" && localStorage.getItem('email')}</small> </div>
            <div id="otp" className="inputs flex flex-row justify-center mt-2"> <input className="m-2 text-center block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" type="text" id="first" maxlength="1" /> <input className="m-2 text-center block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" type="text" id="second" maxlength="1" /> <input className="m-2 text-center block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" type="text" id="third" maxlength="1" /> <input className="m-2 text-center block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" type="text" id="fourth" maxlength="1" />   </div>
            <div onClick={() => {
              VerifyOtp()
            }} className="mt-4"> <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 leading-normal no-underline bg-red-600 text-white hover:bg-red-700 px-4 validate">Validate</button> </div>
          </div>
        </div>
      </div>

      <style jsx>

        {`
        #VerifyOtp{
          background:conic-gradient(rgb(239, 68, 68), rgb(220, 38, 38), rgb(239, 68, 68))
        }
        .height-100 {
          height: 100vh
      }
      
      .card {
          width: 400px;
          border: none;
          height: 300px;
          padding;10px;
          box-shadow: 0px 5px 20px 0px #d2dae3;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center
      }
      
      h6 {
          color: red;
          font-size: 20px;
          font-weight:bold;
      }
      
      .inputs input {
          width: 40px;
          height: 40px
      }
      
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          margin: 0
      }
      
      .card-2 {
          background-color: #fff;
          padding: 10px;
          width: 350px;
          height: 100px;
          bottom: -50px;
          left: 20px;
          position: absolute;
          border-radius: 5px
      }
      
      .card-2 .content {
          margin-top: 50px
      }
      
      .card-2 .content a {
          color: red
      }
      
      .form-control:focus {
          box-shadow: none;
          border: 2px solid red
      }
      
      .validate {
          border-radius: 20px;
          height: 40px;
          background-color: red;
          border: 1px solid red;
          width: 140px
      }
      .validate:hover {
          border-radius: 20px;
          height: 40px;
          background-color: #e20202;
          border: 1px solid red;
          width: 140px
      }
      `}
      </style>
    </div>
  )
}
