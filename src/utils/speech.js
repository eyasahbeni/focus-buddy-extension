let cachedVoices = [];
if (window.speechSynthesis) {
  // Kick off voice loading immediately
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export const speak = (text) => {
  if (!window.speechSynthesis) return;
  
  // Cancel any ongoing speech so it doesn't queue up and overlap awkwardly
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Target exactly one high-quality English voice model using our pre-loaded cache
  const preferredVoice = cachedVoices.find(v => v.name === 'Google US English') || cachedVoices.find(v => v.lang === 'en-US');
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.rate = 1.0; // Normal speed
  utterance.pitch = 1.0; // Normal pitch
  
  window.speechSynthesis.speak(utterance);
};
