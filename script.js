// メッセージ送信処理
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.toLowerCase().trim(); // trimで前後の空白を除去
  input.value = "";

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user">You: ${message}</div>`;

  // 固定応答の辞書
  let responses = {
    "hello": "Hi! Nice to meet you!",
    "how are you": "I’m fine, thank you!",
    "goodbye": "See you next time!",
    "what is your name": "I’m your Pokémon buddy!",
    "where are you from": "I’m from the Pokémon world!",
    "what is your favorite pokemon": "I like Pikachu! ⚡",
    "thank you": "You’re welcome!"
  };

  // 辞書にあるか確認
  let response = responses[message] || "Sorry, I don’t understand.";

  chat.innerHTML += `<div class="bot">Bot: ${response}</div>`;
  chat.scrollTop = chat.scrollHeight;
}

// 送信ボタンにイベントを追加
document.getElementById("sendBtn").addEventListener("click", sendMessage);

// Enterキーでも送信できるようにする
document.getElementById("userInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
