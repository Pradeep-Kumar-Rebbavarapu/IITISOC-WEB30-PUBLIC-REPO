import React from "react";

export default function PageLoadingIndicator() {
  return (
    <div>
      <input type="checkbox" id="toggle" />
      <label htmlFor="toggle">
        <div className="floor"></div>

        <div className="horse animate">
          <div className="front-leg right">
            <div className="shoulder">
              <div className="upper">
                <div className="knee">
                  <div className="lower">
                    <div className="ankle">
                      <div className="foot">
                        <div className="hoof"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="back-leg right">
            <div className="top">
              <div className="thigh">
                <div className="lower-leg">
                  <div className="foot">
                    <div className="hoof"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tail">
            <div className="nub">
              <div className="section">
                <div className="section">
                  <div className="section">
                    <div className="section">
                      <div className="section">
                        <div className="section last"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="section">
              <div className="section">
                <div className="section">
                  <div className="section">
                    <div className="section last"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="back-side"></div>
          </div>

          <div className="neck">
            <div className="under"></div>
            <div className="front"></div>
            <div className="base"></div>
            <div className="top"></div>
            <div className="shoulder"></div>
          </div>
          <div className="front-leg left">
            <div className="shoulder">
              <div className="upper">
                <div className="knee">
                  <div className="lower">
                    <div className="ankle">
                      <div className="foot">
                        <div className="hoof"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="back-leg left">
            <div className="top">
              <div className="thigh">
                <div className="lower-leg">
                  <div className="foot">
                    <div className="hoof"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="head">
            <div className="skull"></div>
            <div className="nose"></div>
            <div className="face"></div>
            <div className="lip"></div>
            <div className="jaw"></div>
            <div className="chin"></div>
            <div className="ear"></div>
            <div className="eye"></div>
          </div>
        </div>

        <div className="dust front">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="dust back">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </label>
      <style jsx>
        {`
          :root {
            font-size: 22vmin;
            --outlines: transparent;
            --speed: 0.6s;
            --delay-gap: 8;
            --horse-width: 3.8rem;
            --horse-height: 2.5rem;
            --color-horse: #51b11d;
            --color-horse-back: #7ce344;
            --color-hair: #ac4425;
            --color-hoof: rgba(0, 0, 0, 1);
            --color-dust: #af540b;
            --color-floor: #f1d1af;
            --color-sky: #c4c4ff;
          }
          input[type="checkbox"] {
            opacity: 0;
          }
          input[type="checkbox"]:checked ~ label {
            --outlines: white;
            --speed: 8s;
            --color-horse: rgba(50, 50, 50, 0.3);
            --color-horse-back: rgba(30, 30, 30, 0.3);
            --color-hair: rgba(70, 70, 70, 0.3);
            --color-hoof: rgba(0, 0, 0, 0.3);
          }
          * {
            position: relative;
          }
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background: #000;
          }
          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          label {
            cursor: pointer;
          }
          .dust {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: calc(((100vh - var(--horse-height)) / 2) + 0.02rem);
            overflow: hidden;
          }
          .floor {
            background-color: var(--color-floor);
            background: #111;
            position: fixed;
            top: calc(50vh + (var(--horse-height) / 2) - 0.5rem);
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
          }
          .dust .particle {
            background-color: var(--color-dust);
            width: 0.05rem;
            height: 0.05rem;
            border-radius: 50%;
            position: absolute;
            border: 1px dashed var(--outlines);
            top: calc(50vh + (var(--horse-height) / 2) - 0.05rem);
            left: calc(
              50vw - (var(--horse-width) / 2) + (var(--horse-width) * 0.15)
            );
          }
          .dust.back .particle {
            left: calc(
              50vw - (var(--horse-width) / 2) + (var(--horse-width) * 0.5)
            );
          }
          @keyframes particle-animation-1 {
            100% {
              transform: translateX(calc(1535799240 * var(--horse-width)))
                translateY(
                  calc(-14160280.0500000007 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-93deg);
              opacity: 0;
            }
          }
          .particle:nth-child(1) {
            transform-origin: -20% -20%;
            animation: particle-animation-1 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.01s);
          }
          .dust.back .particle:nth-child(1) {
            animation-delay: calc((var(--speed) * 0.68) + 0.01s);
          }
          @keyframes particle-animation-2 {
            100% {
              transform: translateX(
                  calc(653435686.9230768681 * var(--horse-width))
                )
                translateY(
                  calc(-20200954.6700000018 * (var(--horse-height) / 5))
                )
                scale(6) rotate(-39.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(2) {
            transform-origin: -20% -20%;
            animation: particle-animation-2 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.02s);
          }
          .dust.back .particle:nth-child(2) {
            animation-delay: calc((var(--speed) * 0.68) + 0.02s);
          }
          @keyframes particle-animation-3 {
            100% {
              transform: translateX(
                  calc(692317348.461538434 * var(--horse-width))
                )
                translateY(
                  calc(-3551499.8300000001 * (var(--horse-height) / 5))
                )
                scale(5) rotate(-175deg);
              opacity: 0;
            }
          }
          .particle:nth-child(3) {
            transform-origin: -20% -20%;
            animation: particle-animation-3 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.03s);
          }
          .dust.back .particle:nth-child(3) {
            animation-delay: calc((var(--speed) * 0.68) + 0.03s);
          }
          @keyframes particle-animation-4 {
            100% {
              transform: translateX(
                  calc(1426104288.4615383148 * var(--horse-width))
                )
                translateY(
                  calc(-19313829.0100000016 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-26deg);
              opacity: 0;
            }
          }
          .particle:nth-child(4) {
            transform-origin: -20% -20%;
            animation: particle-animation-4 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.04s);
          }
          .dust.back .particle:nth-child(4) {
            animation-delay: calc((var(--speed) * 0.68) + 0.04s);
          }
          @keyframes particle-animation-5 {
            100% {
              transform: translateX(
                  calc(194077736.9230769277 * var(--horse-width))
                )
                translateY(
                  calc(-4049365.8900000001 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-159deg);
              opacity: 0;
            }
          }
          .particle:nth-child(5) {
            transform-origin: -20% -20%;
            animation: particle-animation-5 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.05s);
          }
          .dust.back .particle:nth-child(5) {
            animation-delay: calc((var(--speed) * 0.68) + 0.05s);
          }
          @keyframes particle-animation-6 {
            100% {
              transform: translateX(
                  calc(205861491.5384615362 * var(--horse-width))
                )
                translateY(
                  calc(-8010208.6699999999 * (var(--horse-height) / 5))
                )
                scale(6) rotate(-10deg);
              opacity: 0;
            }
          }
          .particle:nth-child(6) {
            transform-origin: -20% -20%;
            animation: particle-animation-6 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.06s);
          }
          .dust.back .particle:nth-child(6) {
            animation-delay: calc((var(--speed) * 0.68) + 0.06s);
          }
          @keyframes particle-animation-7 {
            100% {
              transform: translateX(
                  calc(574006597.6923077106 * var(--horse-width))
                )
                translateY(
                  calc(-19261053.4800000004 * (var(--horse-height) / 5))
                )
                scale(5) rotate(-69deg);
              opacity: 0;
            }
          }
          .particle:nth-child(7) {
            transform-origin: -20% -20%;
            animation: particle-animation-7 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.07s);
          }
          .dust.back .particle:nth-child(7) {
            animation-delay: calc((var(--speed) * 0.68) + 0.07s);
          }
          @keyframes particle-animation-8 {
            100% {
              transform: translateX(
                  calc(1240602980.7692308426 * var(--horse-width))
                )
                translateY(
                  calc(-16839040.3099999987 * (var(--horse-height) / 5))
                )
                scale(5) rotate(-58deg);
              opacity: 0;
            }
          }
          .particle:nth-child(8) {
            transform-origin: -20% -20%;
            animation: particle-animation-8 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.08s);
          }
          .dust.back .particle:nth-child(8) {
            animation-delay: calc((var(--speed) * 0.68) + 0.08s);
          }
          @keyframes particle-animation-9 {
            100% {
              transform: translateX(
                  calc(1241832635.3846154213 * var(--horse-width))
                )
                translateY(
                  calc(-15815188.1899999995 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-175.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(9) {
            transform-origin: -20% -20%;
            animation: particle-animation-9 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.09s);
          }
          .dust.back .particle:nth-child(9) {
            animation-delay: calc((var(--speed) * 0.68) + 0.09s);
          }
          @keyframes particle-animation-10 {
            100% {
              transform: translateX(
                  calc(1181193123.0769231319 * var(--horse-width))
                )
                translateY(
                  calc(-21305480.4499999993 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-149deg);
              opacity: 0;
            }
          }
          .particle:nth-child(10) {
            transform-origin: -20% -20%;
            animation: particle-animation-10 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.1s);
          }
          .dust.back .particle:nth-child(10) {
            animation-delay: calc((var(--speed) * 0.68) + 0.1s);
          }
          @keyframes particle-animation-11 {
            100% {
              transform: translateX(
                  calc(1067810050.7692307234 * var(--horse-width))
                )
                translateY(
                  calc(-3675559.7999999998 * (var(--horse-height) / 5))
                )
                scale(6) rotate(-127.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(11) {
            transform-origin: -20% -20%;
            animation: particle-animation-11 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.11s);
          }
          .dust.back .particle:nth-child(11) {
            animation-delay: calc((var(--speed) * 0.68) + 0.11s);
          }
          @keyframes particle-animation-12 {
            100% {
              transform: translateX(
                  calc(1365216909.2307691574 * var(--horse-width))
                )
                translateY(calc(-7104052.96 * (var(--horse-height) / 5)))
                scale(3) rotate(-18.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(12) {
            transform-origin: -20% -20%;
            animation: particle-animation-12 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.12s);
          }
          .dust.back .particle:nth-child(12) {
            animation-delay: calc((var(--speed) * 0.68) + 0.12s);
          }
          @keyframes particle-animation-13 {
            100% {
              transform: translateX(
                  calc(1156268056.9230768681 * var(--horse-width))
                )
                translateY(
                  calc(-20246238.8399999999 * (var(--horse-height) / 5))
                )
                scale(5) rotate(-12deg);
              opacity: 0;
            }
          }
          .particle:nth-child(13) {
            transform-origin: -20% -20%;
            animation: particle-animation-13 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.13s);
          }
          .dust.back .particle:nth-child(13) {
            animation-delay: calc((var(--speed) * 0.68) + 0.13s);
          }
          @keyframes particle-animation-14 {
            100% {
              transform: translateX(
                  calc(739155333.0769230127 * var(--horse-width))
                )
                translateY(calc(-495541.45 * (var(--horse-height) / 5)))
                scale(6) rotate(-169.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(14) {
            transform-origin: -20% -20%;
            animation: particle-animation-14 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.14s);
          }
          .dust.back .particle:nth-child(14) {
            animation-delay: calc((var(--speed) * 0.68) + 0.14s);
          }
          @keyframes particle-animation-15 {
            100% {
              transform: translateX(
                  calc(553016012.3076922894 * var(--horse-width))
                )
                translateY(
                  calc(-21293201.3000000007 * (var(--horse-height) / 5))
                )
                scale(6) rotate(-150deg);
              opacity: 0;
            }
          }
          .particle:nth-child(15) {
            transform-origin: -20% -20%;
            animation: particle-animation-15 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.15s);
          }
          .dust.back .particle:nth-child(15) {
            animation-delay: calc((var(--speed) * 0.68) + 0.15s);
          }
          @keyframes particle-animation-16 {
            100% {
              transform: translateX(
                  calc(245436709.230769217 * var(--horse-width))
                )
                translateY(
                  calc(-16586615.3100000005 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-8.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(16) {
            transform-origin: -20% -20%;
            animation: particle-animation-16 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.16s);
          }
          .dust.back .particle:nth-child(16) {
            animation-delay: calc((var(--speed) * 0.68) + 0.16s);
          }
          @keyframes particle-animation-17 {
            100% {
              transform: translateX(
                  calc(1425769196.9230768681 * var(--horse-width))
                )
                translateY(
                  calc(-18959960.9499999993 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-50.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(17) {
            transform-origin: -20% -20%;
            animation: particle-animation-17 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.17s);
          }
          .dust.back .particle:nth-child(17) {
            animation-delay: calc((var(--speed) * 0.68) + 0.17s);
          }
          @keyframes particle-animation-18 {
            100% {
              transform: translateX(
                  calc(131483949.2307692319 * var(--horse-width))
                )
                translateY(
                  calc(-3069010.8900000001 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-22deg);
              opacity: 0;
            }
          }
          .particle:nth-child(18) {
            transform-origin: -20% -20%;
            animation: particle-animation-18 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.18s);
          }
          .dust.back .particle:nth-child(18) {
            animation-delay: calc((var(--speed) * 0.68) + 0.18s);
          }
          @keyframes particle-animation-19 {
            100% {
              transform: translateX(
                  calc(1595049340.7692306042 * var(--horse-width))
                )
                translateY(
                  calc(-15208150.7100000009 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-102deg);
              opacity: 0;
            }
          }
          .particle:nth-child(19) {
            transform-origin: -20% -20%;
            animation: particle-animation-19 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.19s);
          }
          .dust.back .particle:nth-child(19) {
            animation-delay: calc((var(--speed) * 0.68) + 0.19s);
          }
          @keyframes particle-animation-20 {
            100% {
              transform: translateX(
                  calc(478407274.6153845787 * var(--horse-width))
                )
                translateY(
                  calc(-15746988.5399999991 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-94deg);
              opacity: 0;
            }
          }
          .particle:nth-child(20) {
            transform-origin: -20% -20%;
            animation: particle-animation-20 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.2s);
          }
          .dust.back .particle:nth-child(20) {
            animation-delay: calc((var(--speed) * 0.68) + 0.2s);
          }
          @keyframes particle-animation-21 {
            100% {
              transform: translateX(
                  calc(58783639.2307692319 * var(--horse-width))
                )
                translateY(
                  calc(-7237495.3499999996 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-21deg);
              opacity: 0;
            }
          }
          .particle:nth-child(21) {
            transform-origin: -20% -20%;
            animation: particle-animation-21 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.21s);
          }
          .dust.back .particle:nth-child(21) {
            animation-delay: calc((var(--speed) * 0.68) + 0.21s);
          }
          @keyframes particle-animation-22 {
            100% {
              transform: translateX(calc(1109732650 * var(--horse-width)))
                translateY(
                  calc(-6642925.4400000004 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-65.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(22) {
            transform-origin: -20% -20%;
            animation: particle-animation-22 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.22s);
          }
          .dust.back .particle:nth-child(22) {
            animation-delay: calc((var(--speed) * 0.68) + 0.22s);
          }
          @keyframes particle-animation-23 {
            100% {
              transform: translateX(
                  calc(1613845103.8461537361 * var(--horse-width))
                )
                translateY(calc(-701122.8 * (var(--horse-height) / 5))) scale(5)
                rotate(-99.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(23) {
            transform-origin: -20% -20%;
            animation: particle-animation-23 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.23s);
          }
          .dust.back .particle:nth-child(23) {
            animation-delay: calc((var(--speed) * 0.68) + 0.23s);
          }
          @keyframes particle-animation-24 {
            100% {
              transform: translateX(
                  calc(902417575.3846153021 * var(--horse-width))
                )
                translateY(
                  calc(-1481174.6100000001 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-144.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(24) {
            transform-origin: -20% -20%;
            animation: particle-animation-24 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.24s);
          }
          .dust.back .particle:nth-child(24) {
            animation-delay: calc((var(--speed) * 0.68) + 0.24s);
          }
          @keyframes particle-animation-25 {
            100% {
              transform: translateX(
                  calc(18444723.0769230761 * var(--horse-width))
                )
                translateY(
                  calc(-20040498.4200000018 * (var(--horse-height) / 5))
                )
                scale(5) rotate(-165.5deg);
              opacity: 0;
            }
          }
          .particle:nth-child(25) {
            transform-origin: -20% -20%;
            animation: particle-animation-25 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.25s);
          }
          .dust.back .particle:nth-child(25) {
            animation-delay: calc((var(--speed) * 0.68) + 0.25s);
          }
          @keyframes particle-animation-26 {
            100% {
              transform: translateX(
                  calc(1641429422.3076922894 * var(--horse-width))
                )
                translateY(
                  calc(-19584937.8900000006 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-96deg);
              opacity: 0;
            }
          }
          .particle:nth-child(26) {
            transform-origin: -20% -20%;
            animation: particle-animation-26 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.26s);
          }
          .dust.back .particle:nth-child(26) {
            animation-delay: calc((var(--speed) * 0.68) + 0.26s);
          }
          @keyframes particle-animation-27 {
            100% {
              transform: translateX(
                  calc(244178044.6153846085 * var(--horse-width))
                )
                translateY(
                  calc(-1967883.1100000001 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-66deg);
              opacity: 0;
            }
          }
          .particle:nth-child(27) {
            transform-origin: -20% -20%;
            animation: particle-animation-27 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.27s);
          }
          .dust.back .particle:nth-child(27) {
            animation-delay: calc((var(--speed) * 0.68) + 0.27s);
          }
          @keyframes particle-animation-28 {
            100% {
              transform: translateX(
                  calc(1145395100.7692308426 * var(--horse-width))
                )
                translateY(
                  calc(-2149247.7200000002 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-36deg);
              opacity: 0;
            }
          }
          .particle:nth-child(28) {
            transform-origin: -20% -20%;
            animation: particle-animation-28 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.28s);
          }
          .dust.back .particle:nth-child(28) {
            animation-delay: calc((var(--speed) * 0.68) + 0.28s);
          }
          @keyframes particle-animation-29 {
            100% {
              transform: translateX(
                  calc(590674794.6153845787 * var(--horse-width))
                )
                translateY(
                  calc(-3806038.6000000001 * (var(--horse-height) / 5))
                )
                scale(3) rotate(-176deg);
              opacity: 0;
            }
          }
          .particle:nth-child(29) {
            transform-origin: -20% -20%;
            animation: particle-animation-29 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.29s);
          }
          .dust.back .particle:nth-child(29) {
            animation-delay: calc((var(--speed) * 0.68) + 0.29s);
          }
          @keyframes particle-animation-30 {
            100% {
              transform: translateX(
                  calc(1186943393.0769231319 * var(--horse-width))
                )
                translateY(
                  calc(-1178182.8600000001 * (var(--horse-height) / 5))
                )
                scale(4) rotate(-168deg);
              opacity: 0;
            }
          }
          .particle:nth-child(30) {
            transform-origin: -20% -20%;
            animation: particle-animation-30 var(--speed) ease-out infinite;
            animation-delay: calc((var(--speed) * 0.1) + 0.3s);
          }
          .dust.back .particle:nth-child(30) {
            animation-delay: calc((var(--speed) * 0.68) + 0.3s);
          }
          .horse {
            width: var(--horse-width);
            height: var(--horse-height);
            border: 0px solid var(--outlines);
          }
          .horse *,
          .horse *:after,
          .horse *:before {
            border: 1px dashed var(--outlines);
          }
          .horse > * {
            position: absolute;
            top: var(--part-y, 0);
            left: var(--part-x, 0);
            width: var(--part-width, 10px);
            height: var(--part-height, 10px);
            border-radius: var(--part-radius, 0);
            transform: rotate(var(--part-rotate, 0deg));
            transform-origin: var(--part-origin, 50% 50%);
            animation-delay: var(--delay, 0s) !important;
          }
          .horse > * *,
          .horse > * *:after,
          .horse > * *:before {
            position: absolute;
            background-color: var(--color-horse);
            top: var(--shape-y, 0);
            left: var(--shape-x, 0);
            width: var(--shape-width, 10px);
            height: var(--shape-height, 10px);
            border-radius: var(--shape-radius, 0);
            transform: rotate(var(--shape-rotate, 0deg));
            transform-origin: var(--shape-origin, 50% 50%);
            animation-delay: var(--delay, 0s) !important;
          }
          /* ================ HEAD ================ */
          .head {
            --part-width: 20%;
            --part-height: 15%;
            --part-x: -1%;
            --part-y: 3%;
            --part-origin: 100% 50%;
            --part-rotate: -40deg;
            border: none;
          }
          .head .skull {
            --shape-width: 55%;
            --shape-height: 80%;
            --shape-radius: 50%;
            --shape-x: 43%;
            --shape-y: 10%;
            --shape-rotate: 40deg;
          }
          .head .eye {
            background-color: var(--color-horse-back);
            --shape-width: 6%;
            --shape-height: 10%;
            --shape-radius: 30% 100%;
            --shape-x: 45%;
            --shape-y: 20%;
            --shape-rotate: 0deg;
          }
          .head .face {
            --shape-width: 47%;
            --shape-height: 50%;
            --shape-y: 8%;
            --shape-x: 14%;
            --shape-rotate: -5deg;
          }
          .head .nose {
            --shape-x: 0%;
            --shape-y: 11.7%;
            --shape-width: 24%;
            --shape-height: 35%;
            --shape-radius: 50%;
            --shape-rotate: -12deg;
          }
          .head .jaw {
            --shape-width: 25%;
            --shape-height: 60%;
            --shape-x: 40%;
            --shape-y: 37%;
            --shape-radius: 45%;
            transform: skew(0deg) rotate(40deg);
          }
          .head .lip {
            --shape-rotate: 40deg;
            --shape-x: -3%;
            --shape-y: 28%;
            --shape-radius: 30%;
            --shape-width: 12%;
            --shape-height: 25%;
          }
          .head .chin {
            --shape-width: 15%;
            --shape-height: 40%;
            --shape-y: 31%;
            --shape-x: 2%;
            --shape-radius: 30%;
            --shape-rotate: 40deg;
          }
          .head .chin:after {
            content: "";
            --shape-width: 130%;
            --shape-height: 180%;
            --shape-radius: 0;
            --shape-x: 123%;
            --shape-y: -95%;
            --shape-rotate: 70deg;
          }
          .head .ear {
            --shape-width: 20%;
            --shape-height: 15%;
            --shape-y: 17%;
            --shape-x: 78%;
            --shape-radius: 50%;
            --shape-rotate: 10deg;
            --shape-origin: 0% 50%;
          }
          .head .ear:after {
            content: "";
            --shape-width: 70%;
            --shape-height: 40%;
            --shape-y: 10%;
            --shape-x: 65%;
            --shape-radius: 40%;
            --shape-rotate: -30deg;
          }
          .head .ear:before {
            content: "";
            --shape-width: 70%;
            --shape-height: 30%;
            --shape-y: -20%;
            --shape-x: 50%;
            --shape-radius: 0%;
            --shape-rotate: -5deg;
          }
          /* ================ NECK ================ */
          .neck {
            --part-width: 30%;
            --part-height: 25%;
            --part-x: 5%;
            --part-y: 35%;
            --part-origin: 90% 50%;
            --part-rotate: 45deg;
            border: none;
          }
          .neck .under {
            --shape-height: 40%;
            --shape-width: 16%;
            --shape-radius: 50%;
            --shape-x: 11%;
            --shape-y: 55%;
            --shape-rotate: -19deg;
            background-color: transparent;
            border-top: 0.07rem outset var(--color-horse);
          }
          .neck .front {
            --shape-width: 75%;
            --shape-height: 55%;
            --shape-radius: 50%;
            --shape-y: 28%;
            --shape-x: 7%;
            --shape-rotate: 20deg;
          }
          .neck .top {
            --shape-x: 10%;
            --shape-y: 5%;
            --shape-width: 50%;
            --shape-height: 25%;
            --shape-radius: 50% / 20%;
            --shape-rotate: 0deg;
          }
          .neck .top:after {
            content: "";
            --shape-x: 50%;
            --shape-y: -10%;
            --shape-width: 70%;
            --shape-height: 50%;
            --shape-radius: 0%;
            --shape-rotate: -5deg;
          }
          .neck .base {
            --shape-width: 50%;
            --shape-height: 30%;
            --shape-x: 20%;
            --shape-y: 10%;
            --shape-radius: 30%;
            --shape-rotate: -10deg;
          }
          .neck .shoulder {
            --shape-width: 50%;
            --shape-height: 30%;
            --shape-x: 48%;
            --shape-y: -2%;
            --shape-rotate: -20deg;
            --shape-radius: 50%;
          }
          /* ================ BODY ================ */
          .body {
            --part-width: 55%;
            --part-height: 33%;
            --part-x: 20%;
            --part-y: 30%;
            --part-origin: 10% 50%;
            border: none;
          }
          .body .section {
            --shape-width: 94%;
            --shape-height: 90%;
            --shape-x: 40%;
            --shape-y: 5%;
            --shape-origin: 10% 30%;
            --shape-radius: 50% 0 20% 20%;
            --shape-rotate: -9deg;
          }
          .body .section.last {
            --shape-radius: 45%;
          }
          .body .section.last:after {
            content: none;
          }
          .body > .section {
            --shape-x: 4%;
            --shape-y: 4%;
            --shape-width: 32%;
            --shape-height: 92%;
            --shape-rotate: 10deg;
            --shape-origin: 50% 50%;
            --shape-radius: 45%;
          }
          .body > .section:after {
            content: "";
            --shape-height: 70%;
            --shape-width: 202%;
            --shape-x: 40%;
            --shape-y: 48%;
            --shape-rotate: -23deg;
            --shape-origin: 0% 100%;
            --shape-radius: 50%;
          }
          .body .back-side {
            --shape-x: 60%;
            --shape-y: -10%;
            --shape-width: 38%;
            --shape-height: 70%;
            --shape-origin: 0 0;
            --shape-rotate: 8deg;
            --shape-radius: 40% 50% 50%;
          }
          /* ================ TAIL ================ */
          .tail {
            --part-width: 35%;
            --part-height: 18%;
            --part-x: 63%;
            --part-y: 29%;
            --part-rotate: 10deg;
            --part-origin: 0% 50%;
            border: none;
          }
          .tail .nub {
            --shape-width: 35%;
            --shape-height: 30%;
            --shape-rotate: 4deg;
            --shape-origin: 10% 50%;
            --shape-radius: 20% / 50%;
            background-color: var(--color-hair);
          }
          .tail .section {
            --shape-width: 100%;
            --shape-height: 90%;
            --shape-rotate: 15deg;
            --shape-origin: 0% 50%;
            --shape-radius: 30% / 50%;
            --shape-y: -25%;
            --shape-x: 60%;
            background-color: var(--color-hair);
          }
          .tail .section:after {
            content: "";
            --shape-width: 170%;
            --shape-height: 120%;
            --shape-rotate: 6deg;
            --shape-origin: 0% 50%;
            --shape-radius: 50%;
            --shape-y: -10%;
            --shape-x: 0%;
            background-color: transparent;
            box-shadow: -1.5vmin 0.5vmin 0 0 var(--color-hair);
          }
          .tail .section:before {
            content: "";
            --shape-width: 130%;
            --shape-height: 100%;
            --shape-rotate: -20deg;
            --shape-origin: 0% 50%;
            --shape-radius: 50%;
            --shape-y: 0%;
            --shape-x: 50%;
            background-color: transparent;
            box-shadow: -1.5vmin 1vmin 0 0 var(--color-hair);
          }
          .tail .nub > .section {
            --shape-width: 50%;
            --shape-height: 170%;
          }
          .tail .section > * > * {
            --shape-rotate: 0deg;
            --shape-height: 80%;
          }
          .tail .section > * > * > * > * {
            --shape-rotate: -25deg;
            --shape-height: 40%;
          }
          /* ================ FRONT LEG ================ */
          .front-leg {
            --part-width: 15%;
            --part-height: 60%;
            --part-x: 20%;
            --part-y: 40%;
            --part-origin: 100% 50%;
            border: none;
          }
          .front-leg.right {
            --color-horse: var(--color-horse-back);
            --delay: calc(0s - var(--speed) / var(--delay-gap));
          }
          .front-leg .shoulder {
            --shape-x: 20%;
            --shape-width: 80%;
            --shape-height: 35%;
            --shape-origin: 100% 50%;
            --shape-radius: 30% 30% 30% 50%;
            --shape-rotate: 0deg;
          }
          .front-leg .upper {
            --shape-x: 40%;
            --shape-y: 60%;
            --shape-width: 40%;
            --shape-height: 80%;
            --shape-origin: 40% 10%;
            --shape-radius: 30% 30% 50% 50%;
            --shape-rotate: 0deg;
          }
          .front-leg .upper:before {
            content: "";
            --shape-x: 5%;
            --shape-radius: 20%;
            --shape-rotate: 0deg;
          }
          .front-leg .upper:after {
            content: "";
            --shape-x: 40%;
            --shape-y: 60%;
            --shape-height: 78%;
            --shape-radius: 40%;
            --shape-rotate: 5deg;
          }
          .front-leg .knee {
            --shape-x: 0%;
            --shape-y: 120%;
            --shape-width: 57%;
            --shape-height: 55%;
            --shape-radius: 45%;
            --shape-origin: 40% 20%;
            --shape-rotate: 0deg;
          }
          .front-leg .knee:before {
            content: "";
            --shape-x: 0%;
            --shape-y: 60%;
            --shape-width: 30%;
            --shape-height: 40%;
            --shape-radius: 30%;
            --shape-rotate: 0deg;
          }
          .front-leg .lower {
            --shape-x: 0%;
            --shape-y: 80%;
            --shape-width: 54%;
            --shape-height: 120%;
            --shape-radius: 5%;
            --shape-rotate: 12deg;
          }
          .front-leg .ankle {
            --shape-x: -20%;
            --shape-y: 80%;
            --shape-width: 170%;
            --shape-height: 45%;
            --shape-radius: 50%;
            --shape-rotate: 20deg;
          }
          .front-leg .foot {
            --shape-x: -35%;
            --shape-y: 65%;
            --shape-width: 120%;
            --shape-height: 200%;
            --shape-radius: 0%;
            --shape-rotate: 30deg;
            clip-path: polygon(
              0% 0%,
              80% 0%,
              65% 20%,
              63% 30%,
              70% 45%,
              75% 55%,
              46% 90%,
              35% 95%,
              10% 70%,
              5% 50%,
              10% 25%
            );
          }
          .front-leg .hoof {
            --shape-x: 40%;
            --shape-y: 52%;
            --shape-width: 100%;
            --shape-height: 50%;
            --shape-radius: 0%;
            --shape-rotate: 55deg;
            background-color: var(--color-hoof);
          }
          /* ================ BACK LEG ================ */
          .back-leg {
            --part-width: 20%;
            --part-height: 70%;
            --part-x: 60%;
            --part-y: 32%;
            --part-origin: 100% 50%;
            border: none;
          }
          .back-leg.right {
            --color-horse: var(--color-horse-back);
            --delay: calc(0s - var(--speed) / var(--delay-gap));
          }
          .back-leg .top {
            --shape-height: 20%;
            --shape-width: 75%;
            --shape-radius: 45%;
            --shape-rotate: 25deg;
            --shape-x: -8%;
            background-color: transparent;
          }
          .back-leg .top:after {
            content: "";
            --shape-height: 140%;
            --shape-width: 40%;
            --shape-radius: 50% / 30%;
            --shape-rotate: -19deg;
            --shape-x: 55%;
            --shape-y: 20%;
            --shape-origin: 50% 10%;
          }
          .back-leg .top:before {
            content: "";
            --shape-height: 150%;
            --shape-width: 80%;
            --shape-radius: 50% / 60%;
            --shape-rotate: -60deg;
            --shape-x: 24%;
            --shape-y: 58%;
          }
          .back-leg .thigh {
            --shape-height: 140%;
            --shape-width: 22%;
            --shape-radius: 45% / 20%;
            --shape-rotate: -95deg;
            --shape-x: 75%;
            --shape-y: 172%;
            --shape-origin: 50% 0%;
          }
          .back-leg .thigh:before {
            content: "";
            --shape-height: 80%;
            --shape-width: 50%;
            --shape-radius: 50%;
            --shape-rotate: -15deg;
            --shape-x: -66%;
            --shape-y: -10%;
            --shape-origin: 50% 0%;
          }
          .back-leg .thigh:after {
            content: "";
            --shape-height: 40%;
            --shape-width: 50%;
            --shape-radius: 50%;
            --shape-rotate: 20deg;
            --shape-x: 110%;
            --shape-y: 23%;
            --shape-origin: 50% 50%;
            background-color: transparent;
            box-shadow: -1.2% 0.5% 0 0 var(--color-horse);
          }
          .back-leg .lower-leg {
            --shape-height: 100%;
            --shape-width: 60%;
            --shape-radius: 50% / 10%;
            --shape-rotate: 47deg;
            --shape-x: 80%;
            --shape-y: 88%;
            --shape-origin: 50% 0%;
          }
          .back-leg .lower-leg:after {
            --shape-height: 60%;
            --shape-width: 130%;
            --shape-radius: 50%;
            --shape-rotate: -25deg;
            --shape-x: -155%;
            --shape-y: 8%;
            --shape-origin: 50% 50%;
            background-color: transparent;
            box-shadow: 15px 1px 0px 0px var(--color-horse);
          }
          .back-leg .foot {
            --shape-x: -120%;
            --shape-y: 100%;
            --shape-width: 180%;
            --shape-height: 60%;
            --shape-radius: 0%;
            --shape-rotate: -70deg;
            clip-path: polygon(
              90% 0%,
              95% 10%,
              100% 20%,
              100% 30%,
              60% 45%,
              60% 55%,
              70% 62%,
              80% 65%,
              80% 70%,
              15% 95%,
              10% 50%,
              15% 25%,
              30% 10%,
              70% 0%
            );
          }
          .back-leg .hoof {
            --shape-x: -10%;
            --shape-y: 65%;
            --shape-width: 100%;
            --shape-height: 100%;
            --shape-radius: 0%;
            --shape-rotate: -5deg;
            background-color: var(--color-hoof);
          }
          /* ================ ANIMATIONS ================ */
          @keyframes body {
            0%,
            100% {
              transform: rotate(8deg) translatex(2%) translatey(-5%);
            }
            9% {
              transform: rotate(4deg) translatex(2%) translatey(0%);
            }
            18.1% {
              transform: rotate(1deg) translatex(0%) translatey(5%);
            }
            27.2% {
              transform: rotate(1deg) translatex(2%) translatey(0%) scaleX(0.92);
            }
            36.3% {
              transform: rotate(0deg) translatex(2%) translatey(-2%) scaleX(0.9);
            }
            45.4% {
              transform: rotate(2deg) translatex(2%) translatey(-3%) scaleX(0.9);
            }
            54.5% {
              transform: rotate(3deg) translatex(2%) translatey(-5%) scaleX(0.9);
            }
            63.6% {
              transform: rotate(4deg) translatex(0%) translatey(-4%) scaleX(0.9);
            }
            72.7% {
              transform: rotate(4.5deg) translatex(0%) translatey(-3%)
                scaleX(0.95);
            }
            81.8% {
              transform: rotate(6.5deg) translatex(0%) translatey(-5%)
                scaleX(0.95);
            }
            90.9% {
              transform: rotate(10deg) translatex(0%) translatey(-14%) scaleX(1);
            }
          }
          .animate .body {
            animation: body var(--speed) linear infinite;
          }
          @keyframes front-shoulder {
            0%,
            100% {
              transform: rotate(20deg) translatex(0%) translatey(6%);
            }
            8.3% {
              transform: rotate(8deg) translatex(-10%) translatey(0%);
            }
            16.6% {
              transform: rotate(0deg) translatex(-12%) translatey(-3%);
            }
            24.9% {
              transform: rotate(0deg) translatex(10%) translatey(0%);
            }
            33.3% {
              transform: rotate(-30deg) translatex(7%) translatey(-12%);
            }
            41.6% {
              transform: rotate(-30deg) translatex(11%) translatey(-10%);
            }
            49.9% {
              transform: rotate(-20deg) translatex(10%) translatey(0%);
            }
            58.3% {
              transform: rotate(-10deg) translatex(30%) translatey(-5%);
            }
            66.6% {
              transform: rotate(15deg) translatex(25%) translatey(5%);
            }
            74.9% {
              transform: rotate(0deg) translatex(0%) translatey(0%);
            }
            83.3% {
              transform: rotate(0deg) translatex(0%) translatey(0%);
            }
            91.6% {
              transform: rotate(20deg) translatex(0%) translatey(0%);
            }
          }
          .animate .front-leg .shoulder {
            animation: front-shoulder var(--speed) linear infinite;
          }
          @keyframes front-upper {
            0%,
            100% {
              transform: rotate(50deg) translatex(30%) translatey(8%);
            }
            8.3% {
              transform: rotate(45deg) translatex(40%) translatey(10%);
            }
            16.6% {
              transform: rotate(33deg) translatex(25%) translatey(10%);
            }
            24.9% {
              transform: rotate(0deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(18deg) translatex(7%) translatey(10%);
            }
            41.6% {
              transform: rotate(-8deg) translatex(-30%) translatey(15%);
            }
            49.9% {
              transform: rotate(-4deg) translatex(-20%) translatey(10%);
            }
            58.3% {
              transform: rotate(20deg) translatex(17%) translatey(10%);
            }
            66.6% {
              transform: rotate(30deg) translatex(20%) translatey(-10%);
            }
            74.9% {
              transform: rotate(75deg) translatex(40%) translatey(-15%);
            }
            83.3% {
              transform: rotate(85deg) translatex(15%) translatey(-10%);
            }
            91.6% {
              transform: rotate(55deg) translatex(25%) translatey(-5%);
            }
          }
          .animate .front-leg .upper {
            animation: front-upper var(--speed) linear infinite;
          }
          @keyframes front-knee {
            0%,
            100% {
              transform: rotate(-15deg) translatex(0%) translatey(0%);
            }
            8.3% {
              transform: rotate(-10deg) translatex(0%) translatey(0%);
            }
            16.6% {
              transform: rotate(-12deg) translatex(0%) translatey(0%);
            }
            24.9% {
              transform: rotate(-20deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(-55deg) translatex(-25%) translatey(10%);
            }
            41.6% {
              transform: rotate(-35deg) translatex(0%) translatey(-10%);
            }
            49.9% {
              transform: rotate(-28deg) translatex(0%) translatey(0%);
            }
            58.3% {
              transform: rotate(-90deg) translatex(-22%) translatey(0%);
            }
            66.6% {
              transform: rotate(-95deg) translatex(-30%) translatey(0%);
            }
            74.9% {
              transform: rotate(-98deg) translatex(-10%) translatey(0%);
            }
            83.3% {
              transform: rotate(-80deg) translatex(-20%) translatey(8%);
            }
            91.6% {
              transform: rotate(-50deg) translatex(-30%) translatey(10%);
            }
          }
          .animate .front-leg .knee {
            animation: front-knee var(--speed) linear infinite;
          }
          @keyframes front-lower {
            0%,
            100% {
              transform: rotate(-25deg) translatex(20%) translatey(0%);
            }
            8.3% {
              transform: rotate(10deg) translatex(0%) translatey(-10%);
            }
            16.6% {
              transform: rotate(10deg) translatex(0%) translatey(0%);
            }
            24.9% {
              transform: rotate(12deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(-12deg) translatex(7%) translatey(-12%);
            }
            41.6% {
              transform: rotate(0deg) translatex(0%) translatey(-10%);
            }
            49.9% {
              transform: rotate(-23deg) translatex(20%) translatey(-20%);
            }
            58.3% {
              transform: rotate(0deg) translatex(0%) translatey(-30%);
            }
            66.6% {
              transform: rotate(-15deg) translatex(30%) translatey(-20%);
            }
            74.9% {
              transform: rotate(-15deg) translatex(0%) translatey(0%);
            }
            83.3% {
              transform: rotate(-15deg) translatex(15%) translatey(0%);
            }
            91.6% {
              transform: rotate(-10deg) translatex(20%) translatey(-30%);
            }
          }
          .animate .front-leg .lower {
            animation: front-lower var(--speed) linear infinite;
          }
          @keyframes front-ankle {
            0%,
            100% {
              transform: rotate(20deg) translatex(0%) translatey(0%);
            }
            8.3% {
              transform: rotate(20deg) translatex(0%) translatey(0%);
            }
            16.6% {
              transform: rotate(20deg) translatex(0%) translatey(0%);
            }
            24.9% {
              transform: rotate(20deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(15deg) translatex(10%) translatey(0%);
            }
            41.6% {
              transform: rotate(20deg) translatex(0%) translatey(0%);
            }
            49.9% {
              transform: rotate(0deg) translatex(0%) translatey(0%);
            }
            58.3% {
              transform: rotate(0deg) translatex(0%) translatey(-20%);
            }
            66.6% {
              transform: rotate(-30deg) translatex(0%) translatey(0%);
            }
            74.9% {
              transform: rotate(-30deg) translatex(0%) translatey(0%);
            }
            83.3% {
              transform: rotate(-10deg) translatex(0%) translatey(-20%);
            }
            91.6% {
              transform: rotate(20deg) translatex(0%) translatey(0%);
            }
          }
          .animate .front-leg .ankle {
            animation: front-ankle var(--speed) linear infinite;
          }
          @keyframes front-foot {
            0%,
            100% {
              transform: rotate(-28deg) translatex(40%) translatey(0%);
            }
            8.3% {
              transform: rotate(-15deg) translatex(50%) translatey(0%);
            }
            16.6% {
              transform: rotate(-11deg) translatex(35%) translatey(0%);
            }
            24.9% {
              transform: rotate(50deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(-10deg) translatex(50%) translatey(0%);
            }
            41.6% {
              transform: rotate(-36deg) translatex(50%) translatey(0%);
            }
            49.9% {
              transform: rotate(-30deg) translatex(32%) translatey(0%);
            }
            58.3% {
              transform: rotate(-30deg) translatex(45%) translatey(0%);
            }
            66.6% {
              transform: rotate(-30deg) translatex(50%) translatey(0%);
            }
            74.9% {
              transform: rotate(-30deg) translatex(50%) translatey(0%);
            }
            83.3% {
              transform: rotate(-30deg) translatex(50%) translatey(0%);
            }
            91.6% {
              transform: rotate(-50deg) translatex(50%) translatey(10%);
            }
          }
          .animate .front-leg .foot {
            animation: front-foot var(--speed) linear infinite;
          }
          @keyframes back-top {
            0%,
            100% {
              transform: rotate(0deg) translatex(-5%) translatey(50%);
            }
            8.3% {
              transform: rotate(-5deg) translatex(-7%) translatey(38%);
            }
            16.6% {
              transform: rotate(-10deg) translatex(-14%) translatey(30%);
            }
            24.9% {
              transform: rotate(25deg) translatex(0%) translatey(10%);
            }
            33.3% {
              transform: rotate(32deg) translatex(-18%) translatey(25%);
            }
            41.6% {
              transform: rotate(45deg) translatex(-5%) translatey(20%);
            }
            49.9% {
              transform: rotate(65deg) translatex(10%) translatey(35%);
            }
            58.3% {
              transform: rotate(65deg) translatex(10%) translatey(40%);
            }
            66.6% {
              transform: rotate(75deg) translatex(20%) translatey(40%);
            }
            74.9% {
              transform: rotate(70deg) translatex(20%) translatey(45%);
            }
            83.3% {
              transform: rotate(60deg) translatex(25%) translatey(40%);
            }
            91.6% {
              transform: rotate(30deg) translatex(10%) translatey(40%);
            }
          }
          .animate .back-leg .top {
            animation: back-top var(--speed) linear infinite;
          }
          @keyframes back-thigh {
            0%,
            100% {
              transform: rotate(-45deg) translatex(-30%) translatey(-10%);
            }
            8.3% {
              transform: rotate(-45deg) translatex(-30%) translatey(-8%);
            }
            16.6% {
              transform: rotate(-43deg) translatex(-35%) translatey(-10%);
            }
            24.9% {
              transform: rotate(-95deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(-115deg) translatex(0%) translatey(10%);
            }
            41.6% {
              transform: rotate(-130deg) translatex(20%) translatey(-5%);
            }
            49.9% {
              transform: rotate(-130deg) translatex(10%) translatey(0%);
            }
            58.3% {
              transform: rotate(-90deg) translatex(80%) translatey(-20%);
            }
            66.6% {
              transform: rotate(-85deg) translatex(0%) translatey(-20%);
            }
            74.9% {
              transform: rotate(-65deg) translatex(5%) translatey(-10%);
            }
            83.3% {
              transform: rotate(-65deg) translatex(10%) translatey(-10%);
            }
            91.6% {
              transform: rotate(-75deg) translatex(-20%) translatey(-15%);
            }
          }
          .animate .back-leg .thigh {
            animation: back-thigh var(--speed) linear infinite;
          }
          @keyframes back-lower-leg {
            0%,
            100% {
              transform: rotate(40deg) translatex(0%) translatey(0%);
            }
            8.3% {
              transform: rotate(30deg) translatex(-30%) translatey(0%);
            }
            16.6% {
              transform: rotate(28deg) translatex(-40%) translatey(0%);
            }
            24.9% {
              transform: rotate(47deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(78deg) translatex(0%) translatey(5%);
            }
            41.6% {
              transform: rotate(110deg) translatex(40%) translatey(10%);
            }
            49.9% {
              transform: rotate(115deg) translatex(50%) translatey(5%);
            }
            58.3% {
              transform: rotate(90deg) translatex(30%) translatey(5%);
            }
            66.6% {
              transform: rotate(76deg) translatex(0%) translatey(0%);
            }
            74.9% {
              transform: rotate(50deg) translatex(-40%) translatey(-4%);
            }
            83.3% {
              transform: rotate(40deg) translatex(-20%) translatey(-5%);
            }
            91.6% {
              transform: rotate(70deg) translatex(0%) translatey(0%);
            }
          }
          .animate .back-leg .lower-leg {
            animation: back-lower-leg var(--speed) linear infinite;
          }
          @keyframes back-foot {
            0%,
            100% {
              transform: rotate(40deg) translatex(0%) translatey(-20%);
            }
            8.3% {
              transform: rotate(20deg) translatex(10%) translatey(-20%);
            }
            16.6% {
              transform: rotate(-65deg) translatex(0%) translatey(0%);
            }
            24.9% {
              transform: rotate(-70deg) translatex(0%) translatey(0%);
            }
            33.3% {
              transform: rotate(-60deg) translatex(20%) translatey(-10%);
            }
            41.6% {
              transform: rotate(-80deg) translatex(0%) translatey(0%);
            }
            49.9% {
              transform: rotate(-70deg) translatex(0%) translatey(0%);
            }
            58.3% {
              transform: rotate(-60deg) translatex(10%) translatey(-10%);
            }
            66.6% {
              transform: rotate(-43deg) translatex(20%) translatey(-10%);
            }
            74.9% {
              transform: rotate(-13deg) translatex(5%) translatey(-10%);
            }
            83.3% {
              transform: rotate(8deg) translatex(5%) translatey(-15%);
            }
            91.6% {
              transform: rotate(20deg) translatex(15%) translatey(-20%);
            }
          }
          .animate .back-leg .foot {
            animation: back-foot var(--speed) linear infinite;
          }
          @keyframes neck {
            /* 8.3% {
              transform: scaleX(1) rotate(40deg) translatex(2%) translatey(-10%);
           }
            */
            /* 24.9% {
              transform: scaleX(0.9) rotate(40deg) translatex(5%) translatey(-5%);
           }
            */
            /* 41.6% {
              transform: scaleX(0.9) rotate(50deg) translatex(3%) translatey(5%);
           }
            */
            /* 58.3% {
              transform: scaleX(0.85) rotate(45deg) translatex(3%) translatey(-10%);
           }
            */
            /* 74.9% {
              transform: scaleX(0.9) rotate(34deg) translatex(0%) translatey(-15%);
           }
            */
            /* 91.6% {
              transform: scaleX(1) rotate(35deg) translatex(0%) translatey(-10%);
           }
            */
            0%,
            100% {
              transform: scaleX(1) rotate(40deg) translatex(0%) translatey(-10%);
            }
            16.6% {
              transform: scaleX(1) rotate(40deg) translatex(6%) translatey(-10%);
            }
            33.3% {
              transform: scaleX(0.9) rotate(45deg) translatex(3%) translatey(5%);
            }
            49.9% {
              transform: scaleX(0.85) rotate(45deg) translatex(3%)
                translatey(-5%);
            }
            66.6% {
              transform: scaleX(0.85) rotate(40deg) translatex(0%)
                translatey(-15%);
            }
            83.3% {
              transform: scaleX(1) rotate(35deg) translatex(0%) translatey(-15%);
            }
          }
          .animate .neck {
            animation: neck var(--speed) linear infinite;
          }
          @keyframes head {
            /* 8.3% {
              transform: rotate(-45deg) translatex(-5%) translatey(12%);
           }
            */
            /* 24.9% {
              transform: rotate(-43deg) translatex(0%) translatey(20%);
           }
            */
            /* 41.6% {
              transform: rotate(-40deg) translatex(10%) translatey(23%);
           }
            */
            /* 58.3% {
              transform: rotate(-38deg) translatex(18%) translatey(45%);
           }
            */
            /* 74.9% {
              transform: rotate(-45deg) translatex(-5%) translatey(22%);
           }
            */
            /* 91.6% {
              transform: rotate(-50deg) translatex(-15%) translatey(0%);
           }
            */
            0%,
            100% {
              transform: rotate(-45deg) translatex(-5%) translatey(10%);
            }
            16.6% {
              transform: rotate(-45deg) translatex(0%) translatey(15%);
            }
            33.3% {
              transform: rotate(-40deg) translatex(5%) translatey(23%);
            }
            49.9% {
              transform: rotate(-36deg) translatex(15%) translatey(35%);
            }
            66.6% {
              transform: rotate(-42deg) translatex(5%) translatey(35%);
            }
            83.3% {
              transform: rotate(-45deg) translatex(-15%) translatey(10%);
            }
          }
          .animate .head {
            animation: head var(--speed) linear infinite;
          }
          @keyframes ear {
            /* 8.3% {
              transform: rotate(28deg);
           }
            */
            /* 24.9% {
              transform: rotate(20deg);
           }
            */
            /* 41.6% {
              transform: rotate(30deg);
           }
            */
            /* 58.3% {
              transform: rotate(30deg);
           }
            */
            /* 74.9% {
              transform: rotate(35deg);
           }
            */
            /* 91.6% {
              transform: rotate(20deg);
           }
            */
            0%,
            100% {
              transform: rotate(25deg);
            }
            16.6% {
              transform: rotate(28deg);
            }
            33.3% {
              transform: rotate(24deg);
            }
            49.9% {
              transform: rotate(30deg);
            }
            66.6% {
              transform: rotate(35deg);
            }
            83.3% {
              transform: rotate(35deg);
            }
          }
          .animate .ear {
            animation: ear var(--speed) linear infinite;
          }
          @keyframes tail {
            /* 8.3% {
              transform: rotate(-3deg) translatex(-5%) translatey(38%);
           }
            */
            /* 24.9% {
              transform: rotate(20deg) translatex(-5%) translatey(10%);
           }
            */
            /* 41.6% {
              transform: rotate(20deg) translatex(-10%) translatey(10%);
           }
            */
            /* 58.3% {
              transform: rotate(20deg) translatex(-13%) translatey(14%);
           }
            */
            /* 74.9% {
              transform: rotate(15deg) translatex(-13%) translatey(18%);
           }
            */
            /* 91.6% {
              transform: rotate(0deg) translatex(-5%) translatey(38%);
           }
            */
            0%,
            100% {
              transform: rotate(-10deg) translatex(-5%) translatey(38%);
            }
            16.6% {
              transform: rotate(-10deg) translatex(-5%) translatey(28%);
            }
            33.3% {
              transform: rotate(-10deg) translatex(-10%) translatey(10%);
            }
            49.9% {
              transform: rotate(-10deg) translatex(-10%) translatey(10%);
            }
            66.6% {
              transform: rotate(-10deg) translatex(-10%) translatey(18%);
            }
            83.3% {
              transform: rotate(-10deg) translatex(-10%) translatey(25%);
            }
          }
          .animate .tail {
            animation: tail var(--speed) linear infinite;
          }
          @keyframes tail-section-1 {
            /* 8.3% {
              transform: rotate(15deg);
           }
            */
            /* 24.9% {
              transform: rotate(10deg);
           }
            */
            /* 41.6% {
              transform: rotate(0deg);
           }
            */
            /* 58.3% {
              transform: rotate(0deg);
           }
            */
            /* 74.9% {
              transform: rotate(0deg);
           }
            */
            /* 91.6% {
              transform: rotate(5deg);
           }
            */
            0%,
            100% {
              transform: rotate(15deg);
            }
            16.6% {
              transform: rotate(15deg);
            }
            33.3% {
              transform: rotate(12deg);
            }
            49.9% {
              transform: rotate(5deg);
            }
            66.6% {
              transform: rotate(0deg);
            }
            83.3% {
              transform: rotate(5deg);
            }
          }
          .animate .tail .section {
            animation: tail-section-1 var(--speed) linear infinite;
          }
          @keyframes tail-section-2 {
            /* 8.3% {
              transform: rotate(-2deg);
           }
            */
            /* 24.9% {
              transform: rotate(-6deg);
           }
            */
            /* 41.6% {
              transform: rotate(50deg);
           }
            */
            /* 58.3% {
              transform: rotate(20deg);
           }
            */
            /* 74.9% {
              transform: rotate(-10deg);
           }
            */
            /* 91.6% {
              transform: rotate(-10deg);
           }
            */
            0%,
            100% {
              transform: rotate(0deg);
            }
            16.6% {
              transform: rotate(4deg);
            }
            33.3% {
              transform: rotate(15deg);
            }
            49.9% {
              transform: rotate(30deg);
            }
            66.6% {
              transform: rotate(10deg);
            }
            83.3% {
              transform: rotate(-5deg);
            }
          }
          .animate .tail .section > * > * {
            animation: tail-section-2 var(--speed) linear infinite;
          }
          @keyframes tail-section-3 {
            /* 8.3% {
              transform: rotate(-20deg);
           }
            */
            /* 24.9% {
              transform: rotate(-30deg);
           }
            */
            /* 41.6% {
              transform: rotate(-70deg);
           }
            */
            /* 58.3% {
              transform: rotate(20deg);
           }
            */
            /* 74.9% {
              transform: rotate(40deg);
           }
            */
            /* 91.6% {
              transform: rotate(20deg);
           }
            */
            0%,
            100% {
              transform: rotate(-25deg);
            }
            16.6% {
              transform: rotate(-20deg);
            }
            33.3% {
              transform: rotate(-20deg);
            }
            49.9% {
              transform: rotate(-40deg);
            }
            66.6% {
              transform: rotate(0deg);
            }
            83.3% {
              transform: rotate(10deg);
            }
          }
          .animate .tail .section > * > * > * > * {
            animation: tail-section-3 var(--speed) linear infinite;
          }
        `}
      </style>
    </div>
  );
}
