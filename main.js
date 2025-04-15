const langs = [
    { code: "en", name: "English" },
    { code: "uz", name: "Uzbek" },
    { code: "ru", name: "Russian" },
    { code: "af", name: "Afrikaans" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "ja", name: "Japanese" },
    { code: "tr", name: "Turkish" },
    { code: "ko", name: "Korean" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" }
];

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

langs.forEach(lang => {
    sourceLang.innerHTML += `<option value="${lang.code}">${lang.name}</option>`;
    targetLang.innerHTML += `<option value="${lang.code}">${lang.name}</option>`;
});

sourceLang.value = "en";
targetLang.value = "uz";

function speak(id) {
    const text = document.getElementById(id).value;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.getElementById(id === 'inputText' ? 'sourceLang' : 'targetLang').value;
    speechSynthesis.speak(utterance);
}

async function translateText() {
    const text = document.getElementById("inputText").value;
    const from = document.getElementById("sourceLang").value;
    const to = document.getElementById("targetLang").value;

    if (!text.trim()) {
        alert("Iltimos, matn kiriting.");
        return;
    }

    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
        const data = await res.json();
        document.getElementById("outputText").value = data.responseData.translatedText;
    } catch (error) {
        alert("Tarjimada xatolik yuz berdi.");
        console.error(error);
    }
}