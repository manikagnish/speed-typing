import { useState } from "react";
import useSpeedType from "./useSpeedType";

function App() {
  const [gameTime, setGameTime] = useState(30);

  const [
    start,
    inputRef,
    text,
    setText,
    timeRemaining,
    startGame,
    playAgain,
    wordCount,
    quote,
    disable,
  ] = useSpeedType(gameTime);

  const displayQuote = quote.split("");
  const userInput = text.split("");

  return (
    <div>
      <h1>Test your typing speed!</h1>
      <div className="set-time">
        <p>Select game time: </p>
        <div className="btn-container">
          <button disabled={disable} onClick={() => setGameTime(30)}>
            30
          </button>
          <button disabled={disable} onClick={() => setGameTime(60)}>
            60
          </button>
          <button disabled={disable} onClick={() => setGameTime(120)}>
            120
          </button>
        </div>
      </div>
      <p>
        {displayQuote.map((s, i) => {
          let cname;
          if (i < userInput.length) {
            cname = s === userInput[i] ? "correct" : "incorrect";
          }
          return (
            <span key={i} className={cname}>
              {s}
            </span>
          );
        })}
      </p>
      <textarea
        style={{ position: "absolute", top: "-200%", left: "-500%" }}
        disabled={!start}
        ref={inputRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <p>Time remaining: {timeRemaining}</p>
      <button onClick={startGame} disabled={start}>
        {playAgain}
      </button>
      <p>Your typing speed is: {wordCount} wpm</p>
    </div>
  );
}

export default App;
