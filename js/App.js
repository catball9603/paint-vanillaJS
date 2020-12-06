const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRanges');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_WIDTH = 1130;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
//paint모드시 배경이 투명이 되지 않게함.
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR; //이전 white로 변경된 것에 영향을 주지 않음
ctx.lineWidth = 2.5;

let painting = false; //값이 변하는 상수
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(e) {
	const x = e.offsetX;
	const y = e.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleColorClick(e) {
	const color = e.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(e) {
	const size = e.target.value;
	ctx.lineWidth = size;
	console.log(size);
}

function handleModeClick() {
	if (filling === true) {
		filling = false;
		mode.innerText = 'Fill';
	} else {
		filling = true;
		mode.innerText = 'Paint';
	}
}

function handleCanvasClick() {
	if (!filling) {
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}
function handleContextMenu(e) {
	e.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = image;
	link.download = 'myPaint';
	link.click();
}

function paintingCanvas() {
	if (canvas) {
		//mouse가 canvas위치 감지
		canvas.addEventListener('mousemove', onMouseMove);
		//mouse버튼을 누르고 있을 때 painting 함수 실행
		canvas.addEventListener('mousedown', startPainting);
		//mouse버튼에서 띄었을 때
		canvas.addEventListener('mouseup', stopPainting);
		//mouse가 canvase를 벗어났을때
		canvas.addEventListener('mouseleave', stopPainting);
		canvas.addEventListener('click', handleCanvasClick);
		canvas.addEventListener('contextmenu', handleContextMenu);
	}
}

function init() {
	//painting
	paintingCanvas();
	//color 선택
	Array.from(colors).forEach((color) => color.addEventListener('click', handleColorClick));

	if (range) {
		range.addEventListener('input', handleRangeChange);
	}

	if (mode) {
		mode.addEventListener('click', handleModeClick);
	}
	if (saveBtn) {
		saveBtn.addEventListener('click', handleSaveClick);
	}
}

init();
