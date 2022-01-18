import { useState } from "react";
import useSpeedType from "./useSpeedType";
import Navbar from "./components/Navbar";
import TextRegion from "./components/TextRegion";

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
    showWpm,
    accuracy,
  ] = useSpeedType(gameTime);

  return (
    <div className="home">
      <header>
        <Navbar disable={disable} setGameTime={setGameTime} />
      </header>

      <main>
        <TextRegion
          quote={quote}
          text={text}
          timeRemaining={timeRemaining}
          start={start}
          inputRef={inputRef}
          setText={setText}
          showStartTimer={showStartTimer}
          startTimer={startTimer}
        />

        <button className="start-btn" onClick={startGame} disabled={start}>
          {playAgain}
        </button>

        {showWpm && (
          <>
            <p className="wpm">Your typing speed is: {wordCount} wpm</p>
            <p className="wpm">Your typing accuracy is: {accuracy}%</p>
          </>
        )}
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
