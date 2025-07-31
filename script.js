const textarea = document.querySelector("textarea"),
      voiceList = document.querySelector("select"),
      speechBtn = document.querySelector("#speak"),
      clearBtn = document.querySelector("#clear"),
      copyBtn = document.querySelector("#copy"),
      volumeControl = document.querySelector("#volume"),
      pitchControl = document.querySelector("#pitch"),
      rateControl = document.querySelector("#rate"),
      themeToggle = document.querySelector(".toggle-theme"),
      wrapper = document.querySelector(".wrapper");

let synth = speechSynthesis;

function populateVoices() {
  voiceList.innerHTML = "";
  const voices = synth.getVoices();
  voices.forEach(voice => {
    const isSelected = voice.name === "Google US English" ? "selected" : "";
    const option = `<option value="${voice.name}" ${isSelected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  });
}

synth.addEventListener("voiceschanged", populateVoices);
populateVoices();

function textToSpeech() {
  const text = textarea.value.trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const selectedVoice = voiceList.value;
  const voices = synth.getVoices();
  utterance.voice = voices.find(voice => voice.name === selectedVoice);

  utterance.volume = parseFloat(volumeControl.value);
  utterance.pitch = parseFloat(pitchControl.value);
  utterance.rate = parseFloat(rateControl.value);

  synth.cancel();
  synth.speak(utterance);
}

speechBtn.addEventListener("click", e => {
  e.preventDefault();
  if (!synth.speaking) {
    textToSpeech();
  }
});

clearBtn?.addEventListener("click", () => {
  textarea.value = "";
});

copyBtn?.addEventListener("click", () => {
  navigator.clipboard.writeText(textarea.value).then(() => {
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => copyBtn.innerHTML = '<i class="fas fa-copy"></i>', 1500);
  });
});

themeToggle?.addEventListener("click", () => {
  wrapper.classList.toggle("dark");
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});
