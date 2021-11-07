import { useState, useEffect, useRef } from 'react';

export default function useSpeedType(gameTime = 60) {
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(gameTime);
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
    setTimeRemaining(gameTime);
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

  return [
    start,
    inputRef,
    text,
    setText,
    timeRemaining,
    startGame,
    playAgain,
    wordCount,
  ];
}
