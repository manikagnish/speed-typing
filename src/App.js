import { useState } from "react";
import useSpeedType from "./useSpeedType";
import { FaKeyboard } from "react-icons/fa";
import StartGameTimer from "./components/StartGameTimer";

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
    startTimer,
    showStartTimer,
  ] = useSpeedType(gameTime);

  const displayQuote = quote.split("");
  const userInput = text.split("");

  return (
    <div className="home">
      <header>
        <h1>
          <FaKeyboard /> speedtype
        </h1>
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
      </header>

      <main>
        <div className="text-region">
          <div style={{ color: "#3f3fff", fontSize: "2rem" }}>
            {timeRemaining}
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
            style={{
              position: "absolute",
              top: "-200%",
              left: "-500%",
            }}
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            disabled={!start}
            ref={inputRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          {showStartTimer && <StartGameTimer startTimer={startTimer} />}
        </div>
        <button className="start-btn" onClick={startGame} disabled={start}>
          {playAgain}
        </button>

        {/* TODO: StartGameCounter component */}
        {/* TODO: display WPM result in a component */}
        {/* <p className="wpm">Your typing speed is: {wordCount} wpm</p> */}
      </main>

      <footer>
        <small style={{ textAlign: "center", display: "block" }}>
          &copy; speedtype 2022 all rights reserved
        </small>
      </footer>
    </div>
  );
}

export default App;
