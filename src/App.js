import React, {useState, useEffect} from 'react'
import "./App.css"

const initMatrix = []
function App() {

	const[matrix, setMatrix] = useState(initMatrix)
	const [matrixSize, setMatrixSize] = useState(4)
	const [currentPlayer, setCurrentPlayer] = useState("o")
	const [selRow, setSelRow] = useState(null)
	const [selColumn, setSelColumn] = useState(null)
	const [winner, setWinner] = useState(false)
	const [reset, setReset] = useState(false)

	useEffect(() => {
		setWinner(false)
		setSelColumn(null)
		setSelRow(null)
		const row = new Array(matrixSize).fill(null)

		const tempMatrix = []

		for(let i=0; i<matrixSize; i++){
			tempMatrix.push([...row])
		}
		setMatrix(tempMatrix)
	}, [reset])

	function squareClick (row, column) {
		if(!matrix[row][column] && !winner){
			setSelColumn(column)
			setSelRow(row)
			let nextPlayer = currentPlayer === "x" ? "o" : "x"
			setCurrentPlayer(nextPlayer)
			const matrixCopy = [...matrix]
			matrixCopy[row][column] = nextPlayer;
			setMatrix(matrixCopy)
		}
	}

	function isWinner(){
		let vertical = true
		let horizontal = true
		let d1 = true
		let d2 = true

		if(selColumn === null || selRow === null){
			return
		}

		for(let i=0; i<matrixSize; i++){
			if(matrix[i][selColumn] !== currentPlayer){
				vertical = false
			}
			if(matrix[selRow][i] !== currentPlayer){
				horizontal = false
			}
			if(matrix[i][i] !== currentPlayer){
				d1 = false
			}
			if(matrix[i][matrixSize - i - 1] !== currentPlayer){
				d2 = false
			}
		}
		if(vertical || horizontal || d1 || d2){
			setWinner(true)
		}
	}

	useEffect(() => {
		if(!winner){
			isWinner()
		}
	})

	function resetGame(){
		setReset(!reset)
	}

  return (
    <div className="App">
      <header className="App-header">
			<button onClick={resetGame}>Reset Game</button>
				<div>
					{
						matrix.map((val, column) => (
							<div className="column">
								{val.map((val1, row) => (
									<div onClick={() => {squareClick(row, column)}} className="row">
										{matrix[row][column]}
									</div>
								))}
							</div>
					))
					}
				</div>
				<h2>{winner ? `Player ${currentPlayer} is a winner` : ""}</h2>
			
				<div className="footer">
					<div className="container">
						<h2>Thanks for your visit.</h2>
						<h3>Created by M Toufiq ELAHI</h3>
					</div> 
				</div>
			</header>
    </div>
  );
}

export default App;
