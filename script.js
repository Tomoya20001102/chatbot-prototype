let responses = {}; // JSONデータを格納する変数

const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendButton = document.querySelector("button");

// 最初は送信ボタンを無効化（辞書ロード後に有効化）
sendButton.disabled = true;

// JSONを読み込む
fetch("responses.json")
  .then(res => res.json())
  .then(data => {
    responses = data;
    console.log("Responses loaded:", responses);
    sendButton.disabled = false; // 辞書が読み込めたらボタン有効化
  })
  .catch(err => console.error("Error loading responses.json", err));

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  handleResponse(text.toLowerCase());
}

async function handleResponse(text) {
  let reply = "";

  // PokeAPIにアクセスする場合
  if (text.startsWith("pokemon")) {
    const parts = text.split(" ");
    if (parts.length > 1) {
      const pokemonName = parts[1];
      reply = await getPokemonInfo(pokemonName);
    } else {
      reply = "Please tell me which Pokémon you want info about. (e.g., pokemon pikachu)";
    }
  } 
  // 辞書の応答
  else {
    // responses が空ならエラーメッセージを返す
    if (Object.keys(responses).length === 0) {
      reply = "Sorry, responses not loaded yet.";
    } else {
      const matchedKey = Object.keys(responses).find(key => text.includes(key));
      if (matchedKey) {
        const options = responses[matchedKey];
        reply = options[Math.floor(Math.random() * options.length)];
      } else {
        reply = "Sorry, I don't understand.";
      }
    }
  }

  addMessage("bot", reply);
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = (sender === "user" ? "You: " : "Bot: ") + text;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

