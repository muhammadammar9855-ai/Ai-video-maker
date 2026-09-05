// ⚠️ Apni Pixabay API key yahan daalo
const PIXABAY_API_KEY = "48967787-542b13060f7e2c0a71eca0f92";

const topicInput = document.getElementById("topicInput");
const generateBtn = document.getElementById("generateBtn");
const statusDiv = document.getElementById("status");
const slideshow = document.getElementById("slideshow");

let images = [];
let currentIndex = 0;
let slideInterval;

generateBtn.addEventListener("click", async () => {
  const topic = topicInput.value.trim();
  if (!topic) {
    statusDiv.textContent = "Pehle koi topic likho!";
    return;
  }

  statusDiv.textContent = "Images dhoondi ja rahi hain...";
  slideshow.innerHTML = "";
  clearInterval(slideInterval);

  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(topic)}&image_type=photo&per_page=15`
    );
    const data = await response.json();

    if (!data.hits || data.hits.length === 0) {
      statusDiv.textContent = "Koi images nahi mili, dusra topic try karo.";
      return;
    }

    images = data.hits.map(hit => hit.webformatURL);
    currentIndex = 0;

    images.forEach((imgUrl, i) => {
      const img = document.createElement("img");
      img.src = imgUrl;
      if (i === 0) img.classList.add("active");
      slideshow.appendChild(img);
    });

    statusDiv.textContent = `Video ban gaya! (${images.length} images ka slideshow)`;
    startSlideshow();

  } catch (error) {
    console.error(error);
    statusDiv.textContent = "Kuch ghalat hua, dobara koshish karo.";
  }
});

function startSlideshow() {
  const allImgs = slideshow.querySelectorAll("img");
  slideInterval = setInterval(() => {
    allImgs[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % allImgs.length;
    allImgs[currentIndex].classList.add("active");
  }, 2000);
48967787-542b13060f7e2c0a71eca0f92 
