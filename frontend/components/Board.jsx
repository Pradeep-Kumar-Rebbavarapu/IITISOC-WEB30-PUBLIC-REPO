import React, { useEffect, useState, useRef } from "react";
import { SendImageDataToPeers } from "../utils/BoardUtils";
import { BsFillPencilFill, BsSquare } from "react-icons/bs";
import { BiShapePolygon } from "react-icons/bi";
import { AiOutlineLine, AiOutlineBgColors } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa";
import { SiZenn } from "react-icons/si";
import { MdOutlineRectangle } from "react-icons/md";
import { TbOvalVertical } from "react-icons/tb";
import { HiOutlineEyeDropper } from "react-icons/hi2";
import { BsFillEraserFill } from "react-icons/bs";
import { store } from "../store/store";
import {toast} from 'react-toastify'
import { downloadImagesAsPDF, getImageSizeInKB } from "../utils/DownloadPDF";
export default function Board({ peers, BoardMap }) {
	const [shape, setShape] = useState("freestyle");
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const draggingRef = useRef(false);
	const dragStartLocationRef = useRef(null);
	const snapshotRef = useRef(null);
	const [PolygonSides, setPolygonSides] = useState(3);
	const [LineWidth, setLineWidth] = useState(3);
	const [FillColor, setFillColor] = useState("black");
	const [StrokeColor, setStokeColor] = useState("black");
	const historyRef = useRef([]);
	const historyIndexRef = useRef(-1);
	const [EraserSize, setEraserSize] = useState(5);
	const [PageNumber, setPageNumber] = useState(1);

	const SendDataToPeers = (data) => {
		for (let socketId in peers.current) {
			let peer = peers.current[socketId];
			peer.send(JSON.stringify(data));
		}
	};
	useEffect(() => {
		
		let timeout;
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		contextRef.current = context;
		if (shape === "eraser") {
			contextRef.current.lineWidth = EraserSize;
		} else {
			contextRef.current.lineWidth = LineWidth;
		}

		contextRef.current.fillStyle = FillColor;
		contextRef.current.strokeStyle = StrokeColor;

		function getCanvasCoordinates(event) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			return { x, y };
		}

		function takeSnapShot() {
			snapshotRef.current = context.getImageData(
				0,
				0,
				canvas.width,
				canvas.height
			);
		}

		function restoreSnapShot() {
			context.putImageData(snapshotRef.current, 0, 0);
		}

		function drawLine(position) {
			context.beginPath();
			context.moveTo(
				dragStartLocationRef.current.x,
				dragStartLocationRef.current.y
			);
			context.lineTo(position.x, position.y);
			context.stroke();
		}

		function drawCircle(position) {
			const radius = Math.sqrt(
				Math.pow(dragStartLocationRef.current.x - position.x, 2) +
				Math.pow(dragStartLocationRef.current.y - position.y, 2)
			);
			context.beginPath();
			context.arc(
				dragStartLocationRef.current.x,
				dragStartLocationRef.current.y,
				radius,
				0,
				2 * Math.PI
			);
		}

		function drawRect(position) {
			const w = position.x - dragStartLocationRef.current.x;
			const h = position.y - dragStartLocationRef.current.y;
			context.beginPath();
			context.rect(
				dragStartLocationRef.current.x,
				dragStartLocationRef.current.y,
				w,
				h
			);
		}

		function drawPolygon(position, sides, angle) {
			var coordinates = [],
				radius = Math.sqrt(
					Math.pow(dragStartLocationRef.current.x - position.x, 2) +
					Math.pow(dragStartLocationRef.current.y - position.y, 2)
				),
				index = 0;

			for (index; index < sides; index++) {
				coordinates.push({
					x: dragStartLocationRef.current.x + radius * Math.cos(angle),
					y: dragStartLocationRef.current.y - radius * Math.sin(angle),
				});
				angle += (2 * Math.PI) / sides;
			}

			context.beginPath();
			context.moveTo(coordinates[0].x, coordinates[0].y);

			for (index = 0; index < sides; index++) {
				context.lineTo(coordinates[index].x, coordinates[index].y);
			}

			context.closePath();
			// context.fill();
		}

		function drawEllipse(position) {
			var w = position.x - dragStartLocationRef.current.x;
			var h = position.y - dragStartLocationRef.current.y;
			var radius = Math.sqrt(
				Math.pow(dragStartLocationRef.current.x - position.x, 2) +
				Math.pow(dragStartLocationRef.current.y - position.y, 2)
			);
			context.beginPath();
			//Used the .ellipse method instead of arc to give an extra radius, radius x and radius
			var cw = dragStartLocationRef.current.x > position.x ? true : false;

			
			context.ellipse(
				dragStartLocationRef.current.x,
				dragStartLocationRef.current.y,
				Math.abs(w),
				Math.abs(h),
				0,
				2 * Math.PI,
				false
			);
		}

		function calculateAngle(start, current) {
			var angle =
				360 -
				(Math.atan2(current.y - start.y, current.x - start.x) * 180) / Math.PI;

			return angle;
		}

		function drawFreeStyle(position) {
			context.lineTo(position.x, position.y);
			context.stroke();
		}
		var initialCompositeOperation = "source-over";

		// Store the previous globalCompositeOperation value
		var previousCompositeOperation = initialCompositeOperation;

		function erase(position, size) {
			context.globalCompositeOperation = "destination-out";
			context.lineTo(position.x, position.y);
			context.stroke();

			if (context.globalCompositeOperation === "destination-out") {
				// Switch back to the default drawing mode
				context.globalCompositeOperation = previousCompositeOperation;
				context.fillStyle = "rgba(0, 0, 0, 0.5)"; // Set the fill color and opacity
				context.fillRect(
					position.x - size / 2,
					position.y - size / 2,
					size,
					size
				); // Draw the rectangle
			} else {
				// Set the globalCompositeOperation to 'destination-out' (eraser mode)
				previousCompositeOperation = context.globalCompositeOperation;
				context.globalCompositeOperation = "destination-out";
			}
		}
		function draw(position) {
			const fillBox = document.getElementById("FillBox");
			const IdBtns = [
				"freestyle",
				"line",
				"circle",
				"polygon",
				"square",
				"ellipse",
				"rect",
				"eraser",
			];

			IdBtns.map((btn) => {
				if (btn === shape) {
					if (document.getElementById(btn)) {
						document.getElementById(btn).className =
							"mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-full flex break-none  ring-4 ring-opacity-50";
					}
				} else {
				}
			});
			if (shape === "circle") {
				drawCircle(position);
			}
			if (shape === "line") {
				drawLine(position);
			}
			if (shape === "rect") {
				drawRect(position);
			}
			if (shape === "square") {
				drawPolygon(position, 4, Math.PI / 4);
			}
			if (shape === "ellipse") {
				drawEllipse(position);
			}
			if (shape === "polygon") {
				drawPolygon(
					position,
					PolygonSides,
					calculateAngle(dragStartLocationRef.current, position) *
					(Math.PI / 180)
				);
			}
			if (shape === "freestyle") {
				drawFreeStyle(position);
			}
			if (shape === "eraser") {
				erase(position);
			}
			if (fillBox.checked) {
				context.fill();
			} else {
				context.stroke();
			}
		}

		function dragStart(event) {
			
			if (shape === "freestyle" || shape === "eraser") {
				context.beginPath();
				context.moveTo(event.x, event.y);
			}
			draggingRef.current = true;
			dragStartLocationRef.current = getCanvasCoordinates(event);

			takeSnapShot();
		}

		function drag(event) {
			if (draggingRef.current) {
				const position = getCanvasCoordinates(event);
				restoreSnapShot();
				if (shape !== "eraser") {
					draw(position);
				} else {
					erase(position, EraserSize);
				}
			}
		}

		function dragStop(event) {
			draggingRef.current = false;
			const position = getCanvasCoordinates(event);
			restoreSnapShot();
			if (shape === "eraser") {
				erase(position, EraserSize); // Erase the last drawn path
				context.clearRect(
					position.x - EraserSize / 2,
					position.y - EraserSize / 2,
					EraserSize,
					EraserSize
				); // Clear the specific region
			} else {
				draw(position);
			}

			if (timeout !== undefined) clearTimeout(timeout);
			timeout = setTimeout(() => {
				const base64ImageData = canvas.toDataURL("image/webp");
				
				if(getImageSizeInKB(base64ImageData)>=180){
					toast.info("Image size is too large",{
						style: {
							zIndex: 1000000,
							
						}
			
					})

				}
				else{
					BoardMap.current.set(PageNumber, base64ImageData);
					SendImageDataToPeers(base64ImageData, peers);
				}
				
			}, 1000);
		}

		const IdBtns = [
			"freestyle",
			"line",
			"circle",
			"polygon",
			"square",
			"ellipse",
			"rect",
			"eraser",
		];
		const Btns = document.getElementById("Btns");
		document.addEventListener("click", (e) => {
			IdBtns.map((btn) => {
				if (shape === btn) {
					if (document.getElementById(btn)) {
						document.getElementById(btn).className =
							"mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-full flex break-none  ring-4 ring-opacity-50";
					}
				} else {
					if (document.getElementById(btn)) {
						document.getElementById(btn).className =
							"mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-full flex break-none  hover:ring-4 ring-opacity-50";
					}
				}
			});
		});

		function clearCanvas() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			setShape("freestyle");
			clearHistory();
		}

		function undo() {
			if (historyIndexRef.current > 0) {
				historyIndexRef.current -= 1;
				restoreHistory();
			}
		}

		function redo() {
			if (historyIndexRef.current < historyRef.current.length - 1) {
				historyIndexRef.current += 1;
				restoreHistory();
			}
		}

		function saveToHistory() {
			const canvasData = canvas.toDataURL();
			saveToHistory((prevHistory) => [...prevHistory, canvasData]);
			historyIndexRef((prevIndex) => prevIndex + 1);
		}

		function restoreHistory() {
			const canvasData = new Image();
			canvasData.src = historyRef.current[historyIndexRef.current];
			canvasData.onload = () => {
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(canvasData, 0, 0);
			};
		}
		canvas.addEventListener("mousedown", dragStart, false);
		canvas.addEventListener("mousemove", drag, false);
		canvas.addEventListener("mouseup", dragStop, false);


		return () => {
			canvas.removeEventListener("mousedown", dragStart, false);
			canvas.removeEventListener("mousemove", drag, false);
			canvas.removeEventListener("mouseup", dragStop, false);
		};
	}, [shape, PolygonSides, LineWidth, FillColor, StrokeColor, EraserSize]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = contextRef.current;

		const sketchStyle = getComputedStyle(canvas);

		canvas.width = parseInt(sketchStyle.getPropertyValue("width"));
		canvas.height = parseInt(sketchStyle.getPropertyValue("height"));

		context.clearRect(0, 0, canvas.width, canvas.height);
	}, []);

	function isDarkColor(hexCode) {
		// Remove the "#" symbol if present
		if (hexCode.startsWith("#")) {
			hexCode = hexCode.slice(1);
		}

		// Convert the hex code to RGB values
		const red = parseInt(hexCode.slice(0, 2), 16);
		const green = parseInt(hexCode.slice(2, 4), 16);
		const blue = parseInt(hexCode.slice(4, 6), 16);

		// Calculate the average value of the RGB components
		const average = (red + green + blue) / 3;

		// Define a threshold value to determine darkness
		const darknessThreshold = 128;

		// Check if the average value is below the darkness threshold
		return average < darknessThreshold;
	}
	

	const AddPage = () => {
		setPageNumber(PageNumber + 1);
		const canvas = canvasRef.current;
		const context = contextRef.current;
		const sketchStyle = getComputedStyle(canvas);
		canvas.width = parseInt(sketchStyle.getPropertyValue("width"));
		canvas.height = parseInt(sketchStyle.getPropertyValue("height"));
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	const GoToNextPage = () => {
		if (store.getState().isRoomHost === true) {
			const canvas = canvasRef.current;
			const context = contextRef.current;

			// Store the current canvas data in the BoardMap with the current page number as the key
			BoardMap.current.set(PageNumber, canvas.toDataURL());

			// Clear the canvas
			context.clearRect(0, 0, canvas.width, canvas.height);

			// Increment the page number
			setPageNumber(PageNumber + 1);
			//map 1---->image data and 2---->image data

			// Check if the next page number exists in the BoardMap
			if (BoardMap.current.has(PageNumber + 1)) {
				// If the next page exists, set the canvas data to the next page data
				const nextPageData = BoardMap.current.get(PageNumber + 1);
				SendImageDataToPeers(nextPageData, peers);
				const nextPageImage = new Image();
				nextPageImage.src = nextPageData;
				nextPageImage.onload = () => {
					context.clearRect(0, 0, canvas.width, canvas.height);
					context.drawImage(nextPageImage, 0, 0);
				};
			} else {
				// If the next page doesn't exist and the current page is not the first page

				// Create a new page and set the canvas data to an empty page
				const newPageNumber = PageNumber + 1;
				BoardMap.current.set(newPageNumber, getEmptyPageData());
				SendImageDataToPeers(getEmptyPageData(), peers);
				setPageNumber(newPageNumber);
				context.clearRect(0, 0, canvas.width, canvas.height);

				// If the current page is the first page, do nothing
			}
		}
	};

	const GoToPreviousPage = () => {
		const canvas = canvasRef.current;
		const context = contextRef.current;

		// Store the current canvas data in the BoardMap with the current page number as the key
		BoardMap.current.set(PageNumber, canvas.toDataURL('image/webp'));

		// Clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Decrement the page number
		setPageNumber(PageNumber - 1);

		// Check if the previous page number exists in the BoardMap
		if (PageNumber !== 1 && BoardMap.current.has(PageNumber - 1)) {
			// If the previous page exists and the current page is not the first page, set the canvas data to the previous page data
			const previousPageData = BoardMap.current.get(PageNumber - 1);
			SendImageDataToPeers(previousPageData, peers);
			const previousPageImage = new Image();
			previousPageImage.src = previousPageData;
			previousPageImage.onload = () => {
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(previousPageImage, 0, 0);
			};
		} else {
			// If the current page is the first page or the previous page doesn't exist, do nothing
		}
	};

	// Helper function to generate empty page data
	const getEmptyPageData = () => {
		const canvas = document.createElement("canvas");
		canvas.width = canvasRef.current.width;
		canvas.height = canvasRef.current.height;
		return canvas.toDataURL("image/png");
	};
	
	
	//logic for going to next page and coming back to previos page
	//logic for adding new page
	// when a person clicks on go to next page he will eventually create a new page and a clear canvas will be called but before that the data which was on the previous page will be a map where key value is page number and value is the image data
	return (
		<div id='Board' className={`w-full h-full  relative bg-white`}>
			<div
			id="TopBar"
				className={`absolute  top-0 w-full h-[100px] bg-white lg:flex items-center shadow-[${StrokeColor}] shadow-2xl`}
				style={{ boxShadow: `0px 2px 12px 0px ${StrokeColor}` }}
			>
				<div id="Btns" className="flex">
					<div
						className={`mx-5  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit flex  hover:ring-4 hover:ring-opacity-50 text-white`}
						style={{
							backgroundColor: `${StrokeColor}`,
							borderColor: `${StrokeColor}`,
							"--tw-ring-color": `${StrokeColor}`,
							accentColor: `${StrokeColor}`,
						}}
						onClick={() => {
							const boardSection = document.getElementById("board-section");
							
							boardSection.className =
								"w-full h-full top-[-1000px] absolute z-[100000]  transition-all fade-in-out duration-500";
						}}
					>
						Close Board
					</div>
					<div id="Tools" className="flex items-center">
						<div
							id="freestyle"
							className={`mx-2 text-[${StrokeColor} transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit   hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("freestyle")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<BsFillPencilFill className="w-7 h-7" />
						</div>

						<div
							id="line"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit  hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("line")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<AiOutlineLine className="w-7 h-7" />
						</div>

						<div
							id="circle"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit  hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("circle")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<FaRegCircle className="w-7 h-7" />
						</div>

						<div
							id="rect"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit  hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("rect")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<MdOutlineRectangle className="w-7 h-7" />
						</div>

						<div
							id="square"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit  hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("square")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<BsSquare className="w-7 h-7" />
						</div>

						<div
							id="ellipse"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit  hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("ellipse")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<TbOvalVertical className="w-7 h-7" />
						</div>

						<div
							id="eraser"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit  hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("eraser")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<BsFillEraserFill className="w-7 h-7" />
							<input
								className="mx-2"
								style={{
									color: `${StrokeColor}`,
									borderColor: `${StrokeColor}`,
									accentColor: `${StrokeColor}`,
								}}
								type="range"
								min={3}
								defaultValue={5}
								max={50}
								onChange={(e) => {
									setEraserSize(e.target.value);
								}}
							/>
						</div>

						<div
							id="polygon"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit flex  hover:ring-4 hover:ring-opacity-50 `}
							onClick={() => setShape("polygon")}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
							}}
						>
							<BiShapePolygon className="w-7 h-7" />
							<input
								className="mx-2"
								style={{
									color: `${StrokeColor}`,
									borderColor: `${StrokeColor}`,
									accentColor: `${StrokeColor}`,
								}}
								type="range"
								min={3}
								defaultValue={5}
								max={20}
								onChange={(e) => {
									setPolygonSides(e.target.value);
								}}
							/>
							<p className="px-1">{PolygonSides}</p>
						</div>
					</div>
					<div
						className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit flex  hover:ring-4 hover:ring-opacity-50 `}
						style={{
							color: `${StrokeColor}`,
							borderColor: `${StrokeColor}`,
							"--tw-ring-color": `${StrokeColor}`,
						}}
					>
						<SiZenn className="w-7 h-7" />
						<input
							id="LineWidth"
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								accentColor: `${StrokeColor}`,
							}}
							className="mx-2"
							type="range"
							min={3}
							defaultValue={5}
							max={40}
							onChange={(e) => {
								setLineWidth(e.target.value);
							}}
						/>
						<p className="px-1">{LineWidth}</p>
					</div>
					<div className="flex">
						<div
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit flex  hover:ring-4 hover:ring-opacity-50 `}
							style={{
								color: `${StrokeColor}`,
								borderColor: `${StrokeColor}`,
								"--tw-ring-color": `${StrokeColor}`,
								accentColor: `${StrokeColor}`,
							}}
						>
							<HiOutlineEyeDropper className="w-7 h-7" />
							<input
								className="mx-2"
								type="color"
								onChange={(e) => {
									setStokeColor(e.target.value);
								}}
							/>
						</div>

						<div
							id="FillBtn"
							className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-full flex break-none  hover:ring-4 hover:ring-opacity-50`}
							style={{
								color: `${FillColor}`,
								borderColor: `${FillColor}`,
								"--tw-ring-color": `${FillColor}`,
								accentColor: `${StrokeColor}`,
							}}
							onClick={(e) => {
								if (document.getElementById("ColorSelector").contains(e.target))
									return;
								if (document.getElementById("FillBox").checked) {
									document.getElementById("FillBox").checked = false;
									document.getElementById("FillBtn").className =
										"mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-full flex break-none  hover:ring-4 hover:ring-opacity-50";
								} else {
									document.getElementById("FillBox").checked = true;
									document.getElementById("FillBtn").className =
										"mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-full flex break-none  ring-4 ring-opacity-50";
								}
							}}
						>
							<AiOutlineBgColors className="w-7 h-7" />
							<input id="FillBox" className="mx-2 hidden" type="checkbox" />
							<input
								id="ColorSelector"
								className="mx-2"
								type="color"
								onChange={(e) => {
									setFillColor(e.target.value);
								}}
							/>
						</div>
						<div>
							{PageNumber}/
							{BoardMap.current.size !== 0 ? BoardMap.current.size : 1}
						</div>
					</div>
				</div>
			</div>
			<canvas
				id={`canvas`}
				className=" border-blue-500 w-full h-full"
				ref={canvasRef}
			></canvas>
			{store.getState().isRoomHost === true ? (
				<div
					id="BottomBar"
					className="absolute bottom-0 w-full h-[100px] bg-white p-2 border-0 border-red-500 z-[1000000] flex justify-center items-center shadow-[${StrokeColor}] shadow-2xl"
					style={{ boxShadow: `10px 4px 20px 5px ${StrokeColor}` }}
				>
					<button
						disabled={PageNumber === 1}
						onClick={() => GoToPreviousPage()}
						className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit flex  hover:ring-4 hover:ring-opacity-50 text-white`}
						style={{
							backgroundColor: `${StrokeColor}`,
							borderColor: `${StrokeColor}`,
							"--tw-ring-color": `${StrokeColor}`,
							accentColor: `${StrokeColor}`,
						}}
					>
						Previous Page
					</button>
					<div
						onClick={() => GoToNextPage()}
						className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit flex  hover:ring-4 hover:ring-opacity-50 text-white`}
						style={{
							backgroundColor: `${StrokeColor}`,
							borderColor: `${StrokeColor}`,
							"--tw-ring-color": `${StrokeColor}`,
							accentColor: `${StrokeColor}`,
						}}
					>
						Next Page
					</div>
					<div
						onClick={() => {
							downloadImagesAsPDF(BoardMap.current)
						}}
						className={`mx-2  transition-all fade-in-out rounded-md border-2 p-2 h-fit w-fit flex  hover:ring-4 hover:ring-opacity-50 text-white`}
						style={{
							backgroundColor: `${StrokeColor}`,
							borderColor: `${StrokeColor}`,
							"--tw-ring-color": `${StrokeColor}`,
							accentColor: `${StrokeColor}`,
						}}
					>
						Download
					</div>
				</div>
			) : (
				null
			)}

		</div>
	);
}
