import { useState, useEffect, useRef } from 'react';

function App() {
  const START_TIME = 5;
  const [timeRemaining, setTimeRemaining] = useState(START_TIME);
  const [wordCount, setWordCount] = useState(0);
  const [start, setStart] = useState(false);
  const [playAgain, setPlayAgain] = useState('Start');
  let played = false;

  function startGame() {
    setStart(true);
  }

  function endGame() {
    setStart(false);
    setPlayAgain('Play Again');
    setTimeRemaining(START_TIME);
  }

  useEffect(() => {
    if (timeRemaining > 0 && start) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, start]);

  return (
    <div>
      <h1>Test your typing speed!</h1>
      <textarea></textarea>
      <p>Time remaining: {timeRemaining}</p>
      <button onClick={startGame} disabled={start}>
        {playAgain}
      </button>
      <p>Your typing speed is: {wordCount} wpm</p>
    </div>
  );
}

export default App;
