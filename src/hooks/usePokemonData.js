import { useState, useEffect, useCallback } from "react";

export function usePokemonData(limit) {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemonData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=151`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Shuffle pokemon list
      const shuffledPokemon = shuffleArray(data.results);
      // Select pokemon from list
      const selectedPokemon = shuffledPokemon.slice(0, limit);
      // Fetch detailed data for selected pokemon
      const pokemonPromises = selectedPokemon.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
      const allPokemonData = await Promise.all(pokemonPromises);

      // Preload Images
      const preloadImagePromises = allPokemonData.map((pokemon) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = pokemon.sprites.other["official-artwork"].front_default;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      // Wait for images to load
      await Promise.all(preloadImagePromises);

      // Images are loaded
      setPokemonData(allPokemonData);
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
      setError(error);
    }
  }, [limit]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);
  return {
    pokemonData,
    setPokemonData,
    error,
    refetchPokemonData: fetchPokemonData,
  };
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
