export const speak = (text) => {
  if (!window.speechSynthesis) return;
  
  // Cancel any ongoing speech so it doesn't queue up and overlap awkwardly
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a natural sounding English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) || voices.find(v => v.lang.startsWith('en')) || voices[0];
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.rate = 1.0; // Normal speed
  utterance.pitch = 1.0; // Normal pitch
  
  window.speechSynthesis.speak(utterance);
};
