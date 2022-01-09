import { useState, useEffect, useRef } from "react";

export default function useSpeedType(gameTime = 60) {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(gameTime);
  const [wordCount, setWordCount] = useState(0);
  const [start, setStart] = useState(false);
  const [playAgain, setPlayAgain] = useState("Start");
  const [quote, setQuote] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [quoteArr, setQuoteArr] = useState("");
  const [textArr, setTextArr] = useState("");
  let words = 0;

  const inputRef = useRef(null);

  function startGame() {
    setText("");
    setStart(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }

  const splitText = (para, setPara) => {
    setPara(para.split(" "));
  };

  useEffect(() => {
    splitText(quote, setQuoteArr);
  }, [quote]);

  useEffect(() => {
    text !== "" && splitText(text, setTextArr);
  }, [text]);

  function endGame() {
    setStart(false);
    setPlayAgain("Play Again");
    setTimeRemaining(gameTime);

    // compare quoteArr and textArr
    for (let i = 0; i < quoteArr.length; i++) {
      if (quoteArr[i] === textArr[i]) {
        words++;
      }
    }
    setWordCount(words);
  }

  useEffect(() => {
    if (timeRemaining > 0 && start) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
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
    quote,
  ];
}
