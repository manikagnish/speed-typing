import StartGameTimer from "./StartGameTimer";

export default function TextRegion({
  quote,
  text,
  timeRemaining,
  start,
  inputRef,
  setText,
  showStartTimer,
  startTimer,
}) {
  const displayQuote = quote.split("");
  const userInput = text.split("");

  return (
    <div className="text-region">
      <div style={{ color: "#3f3fff", fontSize: "2rem" }}>{timeRemaining}</div>
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
        style={{
          position: "absolute",
          top: "-200%",
          left: "-500%",
        }}
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        disabled={!start}
        ref={inputRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      {showStartTimer && <StartGameTimer startTimer={startTimer} />}
    </div>
  );
}
