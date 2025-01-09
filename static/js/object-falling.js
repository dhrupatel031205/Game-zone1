const gameC = document.getElementById("game-container5");
const startScreen = document.getElementById("start-screen");
const startbtn5 = document.getElementById("start-button5");
const basket = document.getElementById("basket");
const score5Element = document.getElementById("score5");
let score5 = 0;
let gameInterval;

// Move basket
gameC.addEventListener("mousemove", (event) => {
  const containerRect = gameC.getBoundingClientRect();
  const x = event.clientX - containerRect.left - basket.offsetWidth / 2;

  // Clamp the basket position within the container
  const clampedX = Math.max(0, Math.min(x, containerRect.width - basket.offsetWidth));
  basket.style.left = `${clampedX}px`;
});

// Create falling objects
function createFallingObject() {
  const object = document.createElement("div");
  object.classList.add("falling-object");
  object.style.left = `${Math.random() * (gameC.offsetWidth - 30)}px`;
  gameC.appendChild(object);

  const fallDuration = Math.random() * 2 + 3; // Random speed between 3s to 5s
  object.style.animationDuration = `${fallDuration}s`;

  const checkCollisionInterval = setInterval(() => {
    const objectRect = object.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
      objectRect.bottom >= basketRect.top &&
      objectRect.left < basketRect.right &&
      objectRect.right > basketRect.left
    ) {
      score5++;
      score5Element.textContent = score5;
      object.remove();
      clearInterval(checkCollisionInterval);
    }

    if (objectRect.top > window.innerHeight) {
      object.remove();
      clearInterval(checkCollisionInterval);
    }
  }, 50);

  object.addEventListener("animationend", () => {
    object.remove();
  });
}

// Start game
startbtn5.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameC.style.display = "block";
  score5 = 0;
  score5Element.textContent = score5;

  gameInterval = setInterval(createFallingObject, 1000);
});
