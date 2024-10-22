import React, { useEffect, useRef, useState } from "react";
import { shuffleArray } from "../utils/shuffleArray";
import { Card } from "./Card";
// MOVE STUFF FROM GAME TO APP AND THEN FIND WAY TO REFETCH DATA ON RESETGAME
export function Game({
  pokemonData,
  setPokemonData,
  setScore,
  pokemonSelected,
  setPokemonSelected,
  setGamePhase,
  setLimit,
}) {
  const [showCard, setShowCard] = useState(false);
  const [internalScore, setInternalScore] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setShowCard(false);
    timerRef.current = setTimeout(() => {
      setShowCard(true);
    }, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pokemonData]);

  // Handler Card Click
  const handleCardClick = (name) => {
    // Ignore when cards are hidden
    if (!showCard) return;
    if (!pokemonSelected[name]) {
      setPokemonSelected((prevSelected) => ({ ...prevSelected, [name]: true }));
      setInternalScore((prevScore) => prevScore + 1);
      setScore((prevScore) => {
        //  Async of prevScore
        if (internalScore + 1 === pokemonData.length) {
          setGamePhase("win");
        }
        return prevScore + 1;
      });
      setShowCard(false);
      mixCards();
      // Reveal  cards
      timerRef.current = setTimeout(() => {
        setShowCard(true);
        timerRef.current = null;
      }, 500);
    } else {
      setLimit(4);
      setGamePhase("lose");
    }
  };

  // Function to shuffle the cards
  const mixCards = () => {
    const newArray = shuffleArray([...pokemonData]);
    setPokemonData(newArray);
  };

  return (
    // Render Cards
    <div className="cardContainer">
      {pokemonData.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemon={pokemon}
          onClick={handleCardClick}
          showCard={showCard}
        />
      ))}
    </div>
  );
}
