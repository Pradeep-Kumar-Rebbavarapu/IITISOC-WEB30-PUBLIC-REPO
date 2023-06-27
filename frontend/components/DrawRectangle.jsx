import React, { useEffect, useState } from 'react';

export default function Board() {
    const [shape, setShape] = useState('line');

    useEffect(() => {
        let canvas,
            context,
            dragging = false,
            dragStartLocation,
            snapshot;

        function getCanvasCoordinates(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            return { x, y };
        }

        function takeSnapShot() {
            snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
        }

        function restoreSnapShot() {
            context.putImageData(snapshot, 0, 0);
        }

        function drawLine(position) {
            context.beginPath();
            context.moveTo(dragStartLocation.x, dragStartLocation.y);
            context.lineTo(position.x, position.y);
            ctx.closePath();
            context.stroke();
        }

        function drawCircle(position) {
            const radius = Math.sqrt(
                Math.pow(dragStartLocation.x - position.x, 2) +
                Math.pow(dragStartLocation.y - position.y, 2)
            );
            context.beginPath();
            context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI);
        }

        // Define other shape drawing functions (drawEllipse, drawRect, drawPolygon) here

        function draw(position) {
            if (shape === 'circle') {
                drawCircle(position);
            } else if (shape === 'line') {
                drawLine(position);
            } else {
                // Handle other shapes here
            }

            context.stroke();
        }

        function dragStart(event) {
            dragging = true;
            dragStartLocation = getCanvasCoordinates(event);
            takeSnapShot();
        }

        function drag(event) {
            if (dragging) {
                const position = getCanvasCoordinates(event);
                restoreSnapShot();
                draw(position);
            }
        }

        function dragStop(event) {
            dragging = false;
            const position = getCanvasCoordinates(event);
            restoreSnapShot();
            draw(position);
        }

        function init() {
            canvas = document.getElementById('canvas');
            context = canvas.getContext('2d');

            canvas.addEventListener('mousedown', dragStart, false);
            canvas.addEventListener('mousemove', drag, false);
            canvas.addEventListener('mouseup', dragStop, false);
        }

        init();
    }, [shape]);

    return (
        <div>
            <canvas id="canvas" width="800" height="600" style={{ border: '1px solid black' }}></canvas>
            <div>
                <label>
                    <input
                        type="radio"
                        name="shape"
                        value="line"
                        checked={shape === 'line'}
                        onChange={() => setShape('line')}
                    />{' '}
                    Line
                </label>
                <label>
                    <input
                        type="radio"
                        name="shape"
                        value="circle"
                        checked={shape === 'circle'}
                        onChange={() => setShape('circle')}
                    />{' '}
                    Circle
                </label>
                {/* Add other shape options here */}
            </div>
        </div>
    );
}
