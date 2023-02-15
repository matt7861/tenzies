import { useState, useEffect } from "react";
import Dice from "./components/Dice";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [dice, setDice] = useState(generateDice());
  const [tenzies, setTenzies] = useState(false);
  const [matchingNumber, setMatchingNumber] = useState(0);

  useEffect(() => {
    if (
      dice.every((die) => die.number === matchingNumber) &&
      dice.every((die) => die.clicked)
    ) {
      setTenzies(true);
    }
  }, [dice]);

  function getRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  function generateDice() {
    const diceArray = [];

    for (let i = 0; i < 10; i++) {
      const diceObject = {
        id: i + 1,
        clicked: false,
        number: getRandomNumber(),
      };
      diceArray.push(diceObject);
    }

    return diceArray;
  }

  function clickedDice(id, number) {
    if (tenzies) return;

    setMatchingNumber(number);

    setDice((prevDice) => {
      return prevDice.map((dice) => {
        return {
          ...dice,
          clicked: id === dice.id ? !dice.clicked : dice.clicked,
        };
      });
    });
  }

  function displayDice() {
    return dice.map((die) => {
      return (
        <Dice
          id={die.id}
          clickedDice={clickedDice}
          key={die.id}
          isClicked={die.clicked}
          number={die.number}
        />
      );
    });
  }

  function rerollDice() {
    if (tenzies) return;

    setDice((prevDice) => {
      return prevDice.map((dice) => {
        return {
          ...dice,
          number: !dice.clicked ? getRandomNumber() : dice.number,
        };
      });
    });
  }

  function restartGame() {
    setDice(generateDice());
    setTenzies(false);
    displayDice();
  }

  return (
    <main className="container">
      {tenzies ? <Confetti width={400} height={400} /> : ""}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{displayDice()}</div>
      <button className="button" onClick={tenzies ? restartGame : rerollDice}>
        {tenzies ? "Play Again" : "Roll"}
      </button>
    </main>
  );
}

export default App;
