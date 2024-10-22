import React, { useEffect, useState } from "react";
import "../styles/Card.css";

export function Card({ pokemon, onClick, showCard }) {
  return (
    <div
      className={`card ${showCard ? "" : "flip"}`}
      onClick={() => onClick(pokemon.name)}
    >
      <div className="card-inner">
        {/* Front Pokemon Image */}
        <div className="card-front">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt="pokemon.name"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        {/* Back Pokemon Image */}
        <div className="card-back">
          <img
            src="/assets/pokeCard.png"
            alt="PokeBall"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
