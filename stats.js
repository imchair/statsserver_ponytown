let messageCounter = 1;

function openChat() {
  const chatButton = document.querySelector(".chat-open-button button");

  if (chatButton) {
    chatButton.click();
  }
}

function sendMessage(statsText) {
  const textareaElement = document.querySelector("textarea[aria-label='Chat message']");

  if (textareaElement) {
    openChat();

    setTimeout(function () {
      const statsTextWithoutFps = statsText.replace(/\d+\s?fps/, '');
      const numberedStatsText = messageCounter + " '" + statsTextWithoutFps + "'";
      messageCounter++;

      textareaElement.value = numberedStatsText;

      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        cancelable: true,
      });

      textareaElement.dispatchEvent(enterEvent);
      const sendButton = document.querySelector("ui-button[title='Send message (hold Shift to send without closing input)'] button");
      if (sendButton) {
        sendButton.click();
      }
    }, 100);
  }
}

function extractStatsText() {
  const statsElement = document.getElementById("stats");

  if (statsElement) {
    const statsText = statsElement.textContent;
    return statsText;
  }
  return "";
}

function updateAndSendMessage() {
  const statsText = extractStatsText();

  if (statsText) {
    sendMessage(statsText);
  }
}

setInterval(updateAndSendMessage, 6000);
