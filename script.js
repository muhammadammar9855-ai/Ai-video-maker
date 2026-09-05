const PIXABAY_API_KEY = "48967787-542b13060f7e2c0a71eca0f92";

const topicInput = document.getElementById("topicInput");
const generateBtn = document.getElementById("generateBtn");
const statusDiv = document.getElementById("status");
const slideshow = document.getElementById("slideshow");

let videos = [];
let currentIndex = 0;

generateBtn.addEventListener("click", async () => {
  const topic = topicInput.value.trim();
  if (!topic) {
    statusDiv.textContent = "Pehle koi topic likho!";
    return;
  }

  statusDiv.textContent = "Videos dhoondi ja rahi hain...";
  slideshow.innerHTML = "";
  videos = [];
  currentIndex = 0;

  try {
    const response = await fetch(
      `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(topic)}&per_page=10`
    );
    const data = await response.json();

    if (!data.hits || data.hits.length === 0) {
      statusDiv.textContent = "Koi videos nahi mile, dusra topic try karo.";
      return;
    }

    videos = data.hits.map(hit => hit.videos.medium.url);

    const videoTag = document.createElement("video");
    videoTag.id = "mainVideo";
    videoTag.style.width = "100%";
    videoTag.style.height = "100%";
    videoTag.style.objectFit = "cover";
    videoTag.muted = false;
    videoTag.autoplay = true;
    slideshow.appendChild(videoTag);

    statusDiv.textContent = `Video ban gaya! (${videos.length} clips mil gaye)`;

    // Voice-over script banao
    const script = `Ye video ${topic} ke baare mein hai. Umeed hai aapko ye pasand aayega.`;
    speakText(script);

    playVideosInSequence(videoTag);

  } catch (error) {
    console.error(error);
    statusDiv.textContent = "Kuch ghalat hua, dobara koshish karo.";
  }
});

function playVideosInSequence(videoTag) {
  videoTag.src = videos[currentIndex];
  videoTag.play();

  videoTag.onended = () => {
    currentIndex = (currentIndex + 1) % videos.length;
    videoTag.src = videos[currentIndex];
    videoTag.play();
  };
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    console.warn("Is browser mein voice-over support nahi hai.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ur-PK";
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}
