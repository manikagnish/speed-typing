import useSpeedType from "./useSpeedType";

function App() {
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
  ] = useSpeedType(60);

  const displayQuote = quote.split("");
  const userInput = text.split("");

  return (
    <div>
      <h1>Test your typing speed!</h1>
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
