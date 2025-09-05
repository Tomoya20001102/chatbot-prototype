// メッセージ送信処理
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.toLowerCase().trim();
  input.value = "";

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user">You: ${message}</div>`;

  // 固定応答の辞書（候補を配列で用意）
  let responses = {
    // --- 挨拶 ---
    "hello": ["Hi! Nice to meet you!", "Hello trainer!", "Hey, nice to see you!"],
    "good morning": ["Good morning, trainer!", "Morning! Ready for a new adventure?"],
    "good night": ["Good night, sleep well!", "Sweet dreams, trainer!"],

    // --- 自己紹介 ---
    "how are you": ["I’m fine, thank you!", "Doing great! Ready for adventure!", "I feel awesome today!"],
    "what is your name": ["I’m your Pokémon buddy!", "You can call me your partner!", "I’m your chat Pokémon!"],
    "who are you": ["I’m your Pokémon chat buddy!", "I’m your virtual partner!"],
    "how old are you": ["I’m timeless like a Pokémon!", "I don’t age, I’m always ready to chat!"],

    // --- 趣味・好きなもの ---
    "what do you like": ["I like talking with trainers!", "I like Pokémon battles!"],
    "do you like pokemon": ["Of course! I love all Pokémon!", "Yes! Pokémon are amazing!"],
    "what is your favorite pokemon": ["I like Pikachu! ⚡", "Charmander is cool with fire! 🔥", "Bulbasaur is my buddy! 🍃"],

    // --- 天気 ---
    "what is the weather today": ["It’s always sunny in the Pokémon world!", "Looks like perfect weather for a battle!"],

    // --- 勉強用 ---
    "thank you": ["You’re welcome!", "No problem!", "Anytime, trainer!"],
    "can you help me": ["Sure! What do you need?", "Of course, I’m here to help you!"],
    "i don't understand": ["No problem, I can explain again.", "That’s okay! Let’s try together!"],

    // --- 別れ ---
    "goodbye": ["See you next time!", "Goodbye, trainer!", "Take care!"]
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
