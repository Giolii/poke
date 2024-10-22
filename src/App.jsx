import { useEffect, useState } from "react";
import { Header, Game, Modal } from "./components";
import { usePokemonData } from "./hooks/usePokemonData";
import "./App.css";

export default function App() {
  // Custom Hook for Pokemon Data
  const [limit, setLimit] = useState(4);

  const { pokemonData, setPokemonData, error, refetchPokemonData } =
    usePokemonData(limit);
  const [gamePhase, setGamePhase] = useState("play");
  const [pokemonSelected, setPokemonSelected] = useState({});
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(0);
  const [showModal, setShowModal] = useState(true);

  // Update record
  useEffect(() => {
    if (score > record) {
      setRecord(score);
    }
  }, [score, record]);

  // Reset after win or lose
  const resetGame = () => {
    setScore(0);
    setPokemonSelected({});
    setGamePhase("play");
    refetchPokemonData();
  };

  const levelUp = () => {
    setPokemonSelected({});
    setGamePhase("play");
    setLimit(limit + 4);
    refetchPokemonData();
  };

  const handlePlayButton = () => {
    setShowModal(false);
    setGamePhase("play");
  };

  // Handle Error
  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  // Handle Loading
  if (!pokemonData) {
    return (
      <div className="loadingContainer">
        <img
          className="loadingGif"
          src="/assets/index.gif"
          alt="Pokeball rotating"
        />
      </div>
    );
  }

  return (
    <div className="appContainer">
      <Header score={score} record={record} />

      <Modal show={showModal} onClose={handlePlayButton}>
        <h2 className="h2Modal">Welcome to the Pokemon Memory Game</h2>
        <p className="pModal">
          {" "}
          Click on the Pokemon without repeating to score points.
        </p>
        <button className="playButton" onClick={handlePlayButton}>
          Play
        </button>
      </Modal>

      {gamePhase === "play" && (
        <Game
          pokemonData={pokemonData}
          setPokemonData={setPokemonData}
          setScore={setScore}
          pokemonSelected={pokemonSelected}
          setPokemonSelected={setPokemonSelected}
          gamePhase={gamePhase}
          setGamePhase={setGamePhase}
          error={error}
          setLimit={setLimit}
        />
      )}
      {(gamePhase === "win" || gamePhase === "lose") && (
        <div className="resultContainer">
          <img
            src={
              gamePhase === "win"
                ? "https://media1.tenor.com/m/hij2ugbsDA0AAAAC/happy-pikachu-pikachu-yes.gif"
                : "https://media1.tenor.com/m/Qf0w-d4L0MAAAAAC/pikachu-sad-pikachu.gif"
            }
          />
          <h1>{gamePhase === "win" ? "YOU WON" : "YOU LOST!"}</h1>
          <button
            className="playAgainButton"
            onClick={gamePhase === "win" ? levelUp : resetGame}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
