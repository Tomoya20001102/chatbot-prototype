// メッセージ送信処理
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.toLowerCase(); // 小文字に変換
  input.value = ""; // 入力欄をクリア

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user">You: ${message}</div>`;

  // 固定応答
  let response = "";
  if (message === "hello") {
    response = "Hi! Nice to meet you!";
  } else if (message === "how are you") {
    response = "I’m fine, thank you!";
  } else if (message === "goodbye") {
    response = "See you next time!";
  } else {
    response = "Sorry, I don’t understand.";
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
