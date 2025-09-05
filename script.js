// メッセージ送信処理
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.toLowerCase().trim();
  input.value = "";

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user">You: ${message}</div>`;

  // 固定応答の辞書（候補を配列で用意）
  let responses = {
    "hello": [
      "Hi! Nice to meet you!",
      "Hello trainer!",
      "Hey, nice to see you!"
    ],
    "how are you": [
      "I’m fine, thank you!",
      "Doing great! Ready for adventure!",
      "I feel awesome today!"
    ],
    "goodbye": [
      "See you next time!",
      "Goodbye, trainer!",
      "Take care!"
    ],
    "what is your name": [
      "I’m your Pokémon buddy!",
      "You can call me your partner!",
      "I’m your chat Pokémon!"
    ],
    "where are you from": [
      "I’m from the Pokémon world!",
      "I live in Pallet Town!",
      "I come from Kanto region!"
    ],
    "what is your favorite pokemon": [
      "I like Pikachu! ⚡",
      "Charmander is cool with fire! 🔥",
      "Bulbasaur is my buddy! 🍃"
    ],
    "thank you": [
      "You’re welcome!",
      "No problem!",
      "Anytime, trainer!"
    ]
  };

  let response = "Sorry, I don’t understand.";

  if (responses[message]) {
    let options = responses[message];
    response = options[Math.floor(Math.random() * options.length)];
  }

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
