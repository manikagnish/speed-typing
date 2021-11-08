import { useState, useEffect, useRef } from 'react';

export default function useSpeedType(gameTime = 60) {
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(gameTime);
  const [wordCount, setWordCount] = useState(0);
  const [start, setStart] = useState(false);
  const [playAgain, setPlayAgain] = useState('Start');
  const [quote, setQuote] = useState('hello world!');

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

  function divider() {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        setQuote(quote => (quote = data.content));
        setQuote(quote => quote.split('').map(qt => <span>{qt}</span>));
      });
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

  useEffect(() => {
    divider();
  }, []);

  return [
    start,
    inputRef,
    text,
    setText,
    timeRemaining,
    startGame,
    playAgain,
    wordCount,
    quote,
  ];
}
