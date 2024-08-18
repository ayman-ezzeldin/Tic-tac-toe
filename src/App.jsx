import { useState } from "react";
import Header from "./Components/Header";
import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import Logs from "./Components/Logs";
import { WINNING_COMBINATIONS } from "./Components/WINNING_COMBINATIONS";
import GameOver from "./Components/GameOver";

const PLAYERS = {
    X : 'Ayman' ,
    O : 'Ezz'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(array => [...array])]; // is important for making copy to restart the game

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard ;
}
function deriveWinner(gameBoard,players) {
  let winner ;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner ;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  
  const gameBoard = deriveGameBoard(gameTurns) ;

  const winner = deriveWinner(gameBoard,players) ;

  const hasDraw = gameTurns.length === 9 && !winner ;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  function handelRestart() {
    setGameTurns([])
  }
  function handelPlayerName(symbol,newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers , 
        [symbol] : newName
      }
    })
  }

  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handelPlayerName}
            
          />

          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handelPlayerName}
          />
        </ol>
        { (winner || hasDraw ) && <GameOver onRestart={handelRestart} winner={winner} /> }
        <GameBoard onSelectActive={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
