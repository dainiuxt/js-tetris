document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
 	let squares = Array.from(document.querySelectorAll('.grid div'))
 	const ScoreDisplay = document.querySelector('#score')
 	const StartBtn = document.querySelector('#start-button')
 	const width = 10
// 	let nextRandom = 0

	//Tetrominoes
	const lTetromino = [
		[1, width+1, width*2+1, 2],
		[width, width+1, width+2, width*2+2],
		[1, width+1, width*2+1, width*2],
		[width, width*2, width*2+1, width*2+2]
	]

	const zTetromino = [
		[0,width,width+1,width*2+1],
		[width+1, width+2,width*2,width*2+1],
		[0,width,width+1,width*2+1],
		[width+1, width+2,width*2,width*2+1]
	]

	const tTetromino = [
		[1,width,width+1,width+2],
		[1,width+1,width+2,width*2+1],
		[width,width+1,width+2,width*2+1],
		[1,width,width+1,width*2+1]
	]

	const oTetromino = [
		[0,1,width,width+1],
		[0,1,width,width+1],
		[0,1,width,width+1],
		[0,1,width,width+1]
	]

	const iTetromino = [
		[1,width+1,width*2+1,width*3+1],
		[width,width+1,width+2,width+3],
		[1,width+1,width*2+1,width*3+1],
		[width,width+1,width+2,width+3]
	]

	const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

	let currentPosition = 4
	let currentRotation = 0
	//randomly select first tetromino and rotation
	let random = Math.floor(Math.random()*theTetrominoes.length)
	let current = theTetrominoes[random][currentRotation]

	//draw Tetromino
	function draw() {
		current.forEach(index => {
			squares[currentPosition + index].classList.add('tetromino')
		})
	}
	//draw()

	function undraw() {
		current.forEach(index => {
			squares[currentPosition + index].classList.remove('tetromino')
		})
	}

	//move down tetromino every 0.8 second
	timerId = setInterval(drop, 800)

	//assign functions to KeyCodes
	function control(e) {
		if (e.keyCode === 37) {
			moveLeft()
		} else if (e.keyCode === 38) {
			rotate()
		} else if (e.keyCode === 39) {
			moveRight()
		} else if (e.keyCode === 32) {
			drop()
		}
	}
	document.addEventListener('keyup', control)

	//moveDown function
	function drop() {
		undraw()
		currentPosition += width
		draw()
		freeze()
	}

	//freeze function
	function freeze() {
		if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
			current.forEach(index => squares[currentPosition + index].classList.add('taken'))
			random = nextRandom
			nextRandom = Math.floor(Math.random() * theTetrominoes.length)
			current = theTetrominoes[random][currentRotation]
			currentPosition = 4
			draw()
			displayShape()
		}
	}

	//move left fuction
	function moveLeft() {
		undraw()
		const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
		if(!isAtLeftEdge) currentPosition -= 1
		if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
			currentPosition +=1
		}
		draw()
	}

	//move right
	function moveRight() {
		undraw()
		const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
		if(!isAtRightEdge) currentPosition += 1
		if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
			currentPosition -= 1
		}
		draw()
	}

	//rotate
	function rotate() {
		undraw()
		currentRotation ++
		if (currentRotation === current.length) {
			currentRotation = 0
		}
		current = theTetrominoes[random][currentRotation]
		draw()
	}

	//show next tetromino in mini-grid
	const displaySquares = document.querySelectorAll('.mini-grid div')
	const displayWidth = 4
	let displayIndex = 0
	let nextRandom = 0

	//tetrominoes w/o rotations
	const upNextTetrominoes = [
		[1, displayWidth+1, displayWidth*2+1, 2], //L tetromino
		[0,displayWidth,displayWidth+1,displayWidth*2+1], //Z tetromino
		[1,displayWidth,displayWidth+1,displayWidth+2] //T tetromino
		[0,1,displayWidth,displayWidth+1] //O teromino
		[1,displayWidth+1,displayWidth*2+1,displayWidth*3+1] //I teromino
		
	]

	//display shape in mini-grid
	function displayShape() {
		//remove any trace of tetromino from entire grid
		displaySquares.forEach(square => {
			square.classList.remove('tetromino')
		})
		upNextTetrominoes[nextRandom].forEach(index => {
			displaySquares[displayIndex + index].classList.add('tetromino')
		})
	}


})