const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        life: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randoNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randoNumber];
    console.log(state.view.squares);

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}

function addListernerHitBox() {

    state.view.squares.forEach((square) => {

        square.addEventListener("mousedown", () => {
            if (state.values.life < 1) {
                alert('game over!');
                location.reload();
            } else if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else {
                state.values.life--;
                state.view.life.textContent = 'X' + state.values.life;
            }
        })
    })
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! Sua pontuação foi: " + state.values.result);
        location.reload();
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function initialize() {
    // moveEnemy();
    addListernerHitBox();
}

initialize();

