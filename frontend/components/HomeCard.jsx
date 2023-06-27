import Image from 'next/image';
import React from 'react'
import Bounce from 'react-reveal/Bounce';

export default function HomeCard({children,title,powered,image,height}) {
    return (
        <Bounce>
        <div className='w-full flex justify-center my-10 break-words'>
                
                <div className="card group  relative ">
                <Image src={image} className="absolute h-full w-full left-0 bottom-0  z-[0] rounded-[10px]" />
                <div className={`absolute w-full  ${height}  bg-white z-[1] left-0 bottom-0 bg-opacity-90  transition-all fade-in-out duration-500 rounded-[10px] `}></div>
                    <p className='font z-[10] !text-black font-semibold'>{children}</p>
                    <p className="heading z-[10] !text-black">
                        {title}
                    </p>
                    <p className='z-[10] !text-black'>
                        Powered By
                    </p>
                    <p className='z-[10]'>{powered}
                    </p></div>
            
            <style jsx>
                {`
            .card {
                position: relative;
                width: 300px;
                height: 400px;
                background-color: transparent;
                display: flex;
                flex-direction: column;
                justify-content: end;
                padding: 12px;
                gap: 12px;
                border-radius: 8px;
                cursor: pointer;
              }
              
              .card::before {
                content: '';
                position: absolute;
                inset: 0;
                left: -5px;
                margin: auto;
                width: 310px;
                height: 410px;
                border-radius: 10px;
                background: linear-gradient(-45deg, #ffd51c 0%, #ff4040 100% );
                z-index: -100;
                pointer-events: none;
                transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              }
              
              .card::after {
                content: "";
                z-index: -1;
                position: absolute;
                inset: 0;
                background: linear-gradient(-45deg, #ffd51c 0%, #ff4040 100%  );
                transform: translate3d(0, 0, 0) scale(0.95);
                filter: blur(30px);
              }
              
              .heading {
                font-size: 20px;
                text-transform: capitalize;
                font-weight: 700;
              }
              
              .card p:not(.heading) {
                font-size: 14px;
              }
              
              .card p:last-child {
                color: #ff4040;
                font-weight: 600;
              }
              
              .card:hover::after {
                filter: blur(30px);
              }
              
              .card:hover::before {
                transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
              }
              
              
              
        `}
            </style>
            
        </div>
        </Bounce>
    )
}
