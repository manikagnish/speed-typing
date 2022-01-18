export default function StartGameTimer({ startTimer }) {
  return (
    <div className="start-game-timer">
      <p>Start typing in:</p>
      <p className="countdown-time">{startTimer}</p>
    </div>
  );
}
