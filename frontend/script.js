let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

document.getElementById("startBtn").onclick = startGame;

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    gameInterval = setInterval(spawnTarget, 800);
    timerInterval = setInterval(updateTimer, 1000);
}

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

// Send score to backend
function submitScore() {
    const name = prompt("Enter your name:");

    fetch("http://localhost:3000/score", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, score })
    }).then(loadLeaderboard);
}

// Load leaderboard
function loadLeaderboard() {
    fetch("http://localhost:3000/leaderboard")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("leaderboard");
            list.innerHTML = "";

            data.forEach(player => {
                const li = document.createElement("li");
                li.textContent = `${player.name}: ${player.score}`;
                list.appendChild(li);
            });
        });
}

// Load leaderboard on page load
loadLeaderboard();