export const speak = (text) => {
  if (!window.speechSynthesis) return;
  
  // Cancel any ongoing speech so it doesn't queue up and overlap awkwardly
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Target exactly one high-quality English voice model
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.name === 'Google US English') || voices.find(v => v.lang === 'en-US');
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.rate = 1.0; // Normal speed
  utterance.pitch = 1.0; // Normal pitch
  
  window.speechSynthesis.speak(utterance);
};
