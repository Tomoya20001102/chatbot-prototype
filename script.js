let responses = {}; // JSONの読み込みデータ用

// ページ読み込み時に履歴を復元
window.onload = () => {
  loadChatHistory();
  loadResponses();
};

// JSONファイルからレスポンスを読み込む
function loadResponses() {
  fetch("responses.json")
    .then(res => res.json())
    .then(data => {
      responses = data;
    })
    .catch(err => console.error("Error loading responses:", err));
}

// メッセージ送信
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  handleResponse(message);

  input.value = "";
}

// Botのレスポンス処理
function handleResponse(message) {
  const key = message.toLowerCase();
  let reply = "Sorry, I don't understand.";

  if (responses[key]) {
    const options = responses[key];
    reply = options[Math.floor(Math.random() * options.length)];
  }

  addMessage("Bot", reply);
}

// メッセージを画面と履歴に追加
function addMessage(sender, text) {
  const messages = document.getElementById("messages");
  const msg = document.createElement("p");
  msg.textContent = `${sender}: ${text}`;
  messages.appendChild(msg);

  saveChatHistory();
}

// 履歴を保存
function saveChatHistory() {
  const messages = document.getElementById("messages");
  localStorage.setItem("chatHistory", messages.innerHTML);
}

// 履歴を読み込み
function loadChatHistory() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) {
    document.getElementById("messages").innerHTML = saved;
  }
}

// 履歴を削除（初期化ボタン用）
function clearChat() {
  document.getElementById("messages").innerHTML = "";
  localStorage.removeItem("chatHistory");
}
