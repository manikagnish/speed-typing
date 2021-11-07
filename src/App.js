import useSpeedType from './useSpeedType';

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
  ] = useSpeedType(10);

  return (
    <div>
      <h1>Test your typing speed!</h1>
      <textarea
        disabled={!start}
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
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
