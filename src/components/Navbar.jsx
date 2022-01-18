import { FaKeyboard } from "react-icons/fa";

export default function Navbar({ disable, setGameTime }) {
  return (
    <>
      <h1>
        <FaKeyboard /> speedtype
      </h1>
      <div className="set-time">
        <p>Select game time: </p>
        <div className="btn-container">
          <button disabled={disable} onClick={() => setGameTime(30)}>
            30
          </button>
          <button disabled={disable} onClick={() => setGameTime(60)}>
            60
          </button>
          <button disabled={disable} onClick={() => setGameTime(120)}>
            120
          </button>
        </div>
      </div>
    </>
  );
}
