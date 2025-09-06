let responses = {}; 
let jpToEn = {}; // 日本語→英語変換辞書

// ページ読み込み時に履歴・レスポンス・辞書を読み込む
window.onload = () => {
  loadChatHistory();
  loadResponses();
  loadDictionary();
};

// JSONファイルからレスポンスを読み込む
function loadResponses() {
  fetch("responses.json")
    .then(res => res.json())
    .then(data => { responses = data; })
    .catch(err => console.error("Error loading responses:", err));
}

// 日本語→英語辞書を読み込む
function loadDictionary() {
  fetch("pokemon_dict.json")
    .then(res => res.json())
    .then(data => { jpToEn = data; })
    .catch(err => console.error("Error loading dictionary:", err));
}

// Botのレスポンス処理
async function handleResponse(message) {
  const lowerMsg = message.toLowerCase();
  let reply = "ごめんね、その質問には答えられないよ。";

  // --- ポケモン名を先にチェック --- //
  let pokemonName = extractPokemonName(message);

  if (pokemonName) {
    // 日本語→英語に変換
    if (jpToEn[pokemonName]) {
      pokemonName = jpToEn[pokemonName];
    }

    // API用に小文字化
    pokemonName = pokemonName.toLowerCase();

    reply = await getPokemonInfo(pokemonName);
  } else if (
    lowerMsg.includes("pokemon") ||
    lowerMsg.includes("info") ||
    lowerMsg.includes("about") ||
    message.includes("の情報") ||
    message.includes("どんなポケモン")
  ) {
    // ポケモン関連の質問だけど名前が取れなかった場合
    reply = "どのポケモンについて知りたい？（例: ピカチュウ、pokemon pikachu）";
  } else {
    // その他のレスポンス
    const matchedKey = Object.keys(responses).find(key =>
      lowerMsg.includes(key)
    );
    if (matchedKey) {
      const options = responses[matchedKey];
      reply = options[Math.floor(Math.random() * options.length)];
    }
  }

  addMessage("Bot", reply);
}


function extractPokemonName(text) {
  // --- 英語ポケモン名のチェック（部分一致） ---
  const lowerText = text.toLowerCase();
  for (let enName of Object.values(jpToEn)) {
    if (lowerText.includes(enName.toLowerCase())) {
      return enName;
    }
  }

  // --- 日本語ポケモン名のチェック（部分一致） ---
  for (let jpName of Object.keys(jpToEn)) {
    if (text.includes(jpName)) {
      return jpName;
    }
  }

  return null;
}

// --- チャット履歴の保存・読み込み・削除 --- //
function saveChatHistory() {
  const messages = document.getElementById("messages");
  localStorage.setItem("chatHistory", messages.innerHTML);
}

function loadChatHistory() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) {
    document.getElementById("messages").innerHTML = saved;
  }
}

function clearChat() {
  document.getElementById("messages").innerHTML = "";
  localStorage.removeItem("chatHistory");
}

// --- メッセージ送信処理 --- //
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  handleResponse(message);

  input.value = "";
}

// --- メッセージを画面と履歴に追加 --- //
function addMessage(sender, text) {
  const messages = document.getElementById("messages");
  const msg = document.createElement("p");
  msg.textContent = `${sender}: ${text}`;
  messages.appendChild(msg);

  saveChatHistory();
}
