async function getPokemonInfo(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error("ポケモンが見つかりません");

    const data = await res.json();

    const info = `${data.name.toUpperCase()} (図鑑No.${data.id})
タイプ: ${data.types.map(t => t.type.name).join(", ")}`;

    // 画像付きで返す
    addMessage("Bot", info, data.sprites.front_default);
    return "";
  } catch (error) {
    return "そのポケモンの情報は見つからなかったよ。";
  }
}
