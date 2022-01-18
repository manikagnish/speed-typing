import { useState, useEffect, useRef } from "react";

export default function useSpeedType(gameTime) {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(gameTime);
  const [start, setStart] = useState(false);
  const [playAgain, setPlayAgain] = useState("Start");
  const [quote, setQuote] = useState("");
  const [quoteArr, setQuoteArr] = useState("");
  const [textArr, setTextArr] = useState("");
  const [addLine, setAddLine] = useState(true);
  const [disable, setDisable] = useState(false);
  const [startTimer, setStartTimer] = useState(3);
  const [showStartTimer, setShowStartTimer] = useState(false);
  const [showWpm, setShowWpm] = useState(false);
  let x = 3;
  const [accuracy, setAccuracy] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeRemaining(gameTime);
  }, [gameTime]);

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();
      setQuote((quote) => quote + data.content + " ");
    };

    fetchQuote();
  }, [addLine]);

  function startGame() {
    setText("");
    setWordCount(0);
    setShowWpm(false);
    setDisable(true);

    x = 3;
    setStartTimer(3);
    setShowStartTimer(true);

    const interval = setInterval(() => {
      setStartTimer((startTimer) => startTimer - 1);
      x--;

      if (x === 0) {
        clearInterval(interval);
        setShowStartTimer(false);
        setStart(true);
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      }

      if (x === -1) {
      }
    }, 1000);
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
      setAddLine(!addLine);
    }
  }, [text]);

  function endGame() {
    setStart(false);
    setPlayAgain("Play Again");
    setTimeRemaining(gameTime);
    setDisable(false);
    setShowWpm(true);

    const correctWords = [];

    // compare quoteArr and textArr
    for (let i = 0; i < quoteArr.length; i++) {
      if (quoteArr[i] === textArr[i]) {
        correctWords.push(textArr[i]);
      }
    }

    // count no of characters in correctWords array
    correctWords.forEach((word) => {
      setWordCount((prevCount) => prevCount + word.length);
    });

    if (gameTime === 30) {
      setWordCount((wordCount) => wordCount / 2.5);
    } else if (gameTime === 60) {
      setWordCount((wordCount) => wordCount / 5);
    } else if (gameTime === 120) {
      setWordCount((wordCount) => wordCount / 10);
    }

    let totalWords = 0;
    textArr.forEach((text) => {
      totalWords += text.length;
    });
    let totalCorrectWords = 0;
    correctWords.forEach((correctWord) => {
      totalCorrectWords += correctWord.length;
    });

    setAccuracy(Math.round((totalCorrectWords / totalWords) * 100));
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
    disable,
    startTimer,
    showStartTimer,
    showWpm,
    accuracy,
  ];
}
