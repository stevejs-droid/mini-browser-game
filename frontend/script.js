let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

document.getElementById("startBtn").onclick = startGame;

// Start game
function startGame() {
    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    gameInterval = setInterval(spawnTarget, 800);
    timerInterval = setInterval(updateTimer, 1000);
}

// Spawn target
function spawnTarget() {
    gameArea.innerHTML = "";

    const target = document.createElement("div");
    target.classList.add("target");

    target.style.top = Math.random() * 250 + "px";
    target.style.left = Math.random() * 250 + "px";

    target.onclick = () => {
        score++;
        scoreDisplay.textContent = score;
        target.remove();
    };

    gameArea.appendChild(target);
}

// Timer
function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        gameArea.innerHTML = "";
        submitScore();
    }
}

// ✅ Save score using localStorage
function submitScore() {
    const name = prompt("Enter your name:");

    if (!name) return;

    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push({ name, score });

    localStorage.setItem("scores", JSON.stringify(scores));

    loadLeaderboard();
}

// ✅ Load leaderboard
function loadLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    // Sort descending
    scores.sort((a, b) => b.score - a.score);

    const list = document.getElementById("leaderboard");
    list.innerHTML = "";

    scores.slice(0, 10).forEach((player, index) => {
        const li = document.createElement("li");

        // Add ranking number
        li.textContent = `${index + 1}. ${player.name}: ${player.score}`;

        list.appendChild(li);
    });
}

// Load leaderboard on page load
loadLeaderboard();
