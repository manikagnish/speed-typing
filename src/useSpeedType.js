import { useState, useEffect, useRef } from 'react';

export default function useSpeedType(gameTime = 60) {
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(gameTime);
  const [wordCount, setWordCount] = useState(0);
  const [start, setStart] = useState(false);
  const [playAgain, setPlayAgain] = useState('Start');
  const [quote, setQuote] = useState('');

  const quoteLine = 'The quick brown fox jumps over the lazy dog.';
  const inputRef = useRef(null);
  const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';

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

  // function getRandomQuote() {
  //   return fetch(RANDOM_QUOTE_API_URL)
  //     .then(response => response.json())
  //     .then(data => data.content);
  // }

  // async function renderNewQuote() {
  //   const quoted = await getRandomQuote();
  //   const dividedQuote = quoted.split('').map(qt => <span>{qt}</span>);
  //   setQuote(dividedQuote);
  //   const arrayQuote = [];
  //   for (let i = 0; i < dividedQuote.length; i++) {
  //     arrayQuote.push(dividedQuote[i].props.children);
  //   }
  //   return arrayQuote;
  // }

  const arrayQuote = [];
  function getQuote() {
    arrayQuote.push(
      quoteLine.split('').map(qt => <span className="correct">{qt}</span>)
    );
    console.log('arrayQuote: ', arrayQuote);
    setQuote(arrayQuote);
  }

  function wordChecker() {
    console.log('ran');
    const arrayValue = text.split('');
    console.log('arrayValue: ', arrayValue);

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
      console.log(characterSpan);
      const character = arrayValue[index];
      if (character == null) {
        // characterSpan.classList.remove('correct');
        // characterSpan.classList.remove('incorrect');
        correct = false;
        // console.log(correct);
      } else if (character === characterSpan) {
        // characterSpan.classList.add('correct');
        // characterSpan.classList.remove('incorrect');
        console.log(correct);
      } else {
        // characterSpan.classList.remove('correct');
        // characterSpan.classList.add('incorrect');
        correct = false;
        // console.log(correct);
      }
    });
    // if (correct) renderNewQuote();
  }

  const firstUpdate = useRef(true);
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
    getQuote();
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    wordChecker();
  }, [text]);

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
