export default function createSpeachRecognition (lang) {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    return recognition;
    }