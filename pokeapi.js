// PokeAPIを呼び出してポケモン情報を取得
async function getPokemonInfo(pokemonName) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!res.ok) return `I couldn't find information about ${pokemonName}.`;
    const data = await res.json();

    return `${data.name.toUpperCase()} - Type: ${data.types.map(t => t.type.name).join(", ")} | Height: ${data.height} | Weight: ${data.weight}`;
  } catch (error) {
    return "Sorry, I had trouble fetching Pokémon info.";
  }
}