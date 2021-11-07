import { useState, useEffect, useRef } from 'react';

function App() {
  const START_TIME = 5;
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(START_TIME);
  const [wordCount, setWordCount] = useState(0);
  const [start, setStart] = useState(false);
  const [playAgain, setPlayAgain] = useState('Start');

  const inputRef = useRef(null);

  function startGame() {
    setText('');
    setStart(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }

  function endGame() {
    setStart(false);
    setPlayAgain('Play Again');
    setTimeRemaining(START_TIME);
    let totalWords = text.trim().split(' ').length;
    setWordCount(totalWords);
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
