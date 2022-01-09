import { useState, useEffect, useRef } from "react";

export default function useSpeedType(gameTime) {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(gameTime);
  const [wordCount, setWordCount] = useState(0);
  const [start, setStart] = useState(false);
  const [playAgain, setPlayAgain] = useState("Start");
  const [quote, setQuote] = useState("");
  const [quoteArr, setQuoteArr] = useState("");
  const [textArr, setTextArr] = useState("");
  const [addLine, setAddLine] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeRemaining(gameTime);
  }, [gameTime]);

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();
      setQuote(quote + data.content + " ");
    };

    fetchQuote();
  }, [addLine]);

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

    if (textArr.length === quoteArr.length - 1) {
      setAddLine(Math.random());
    }
  }, [text]);

  function endGame() {
    setStart(false);
    setPlayAgain("Play Again");
    setTimeRemaining(gameTime);

    // compare quoteArr and textArr
    for (let i = 0; i < quoteArr.length; i++) {
      if (quoteArr[i] === textArr[i]) {
        setWordCount((prevCount) => prevCount + 1);
      }
    }
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
