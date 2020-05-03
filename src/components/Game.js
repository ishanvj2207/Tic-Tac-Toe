import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "../helpers";

const styles = {
  width: "200px",
  margin: "20px auto",
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (square) => {
    const newhistory = history.slice(0, stepNumber + 1);
    const currentArr = newhistory[stepNumber];
    const current = [...currentArr];
    if (winner || current[square]) return;
    current[square] = xIsNext ? "X" : "O";
    setHistory([...newhistory, current]);
    setStepNumber(newhistory.length);
    setXIsNext(!xIsNext);
  };

  const gotoMove = (i) => {
    setStepNumber(i);
    setXIsNext(i % 2 === 0);
  };

  const renderMoves = () =>
    history.map((board, i) => {
      const destination = i ? `Go To Move #${i}` : "Start Game";
      return (
        <li key={i}>
          <button onClick={() => gotoMove(i)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <Board onClick={handleClick} value={history[stepNumber]} />
      <div style={styles}>
        <p>
          {winner ? "Winner:" + winner : "Next Move: " + (xIsNext ? "X" : "O")}
        </p>
        {renderMoves()}
      </div>
    </>
  );
};

export default Game;
