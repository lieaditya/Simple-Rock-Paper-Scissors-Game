let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

updateScoreElement();

function getComputerMove() {
    const randomNumber = Math.random();
    let computerMove;

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock', 'paper');
    })

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper', 'scissors');
    })

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors', 'rock');
    })

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock', 'paper');
    } else if (event.key === 'p') {
        playGame('paper', 'scissors');
    } else if (event.key === 's') {
         playGame('scissors', 'rock');
    }
});

function playGame(playerMove, losingCondition) {
    const computerMove = getComputerMove();
    let result = '';

    if (computerMove === playerMove) {
        result = 'Tie';
        score.ties++;
    } else if (computerMove === losingCondition) {
        result = 'You lose';
        score.losses++;
    } else {
        result = 'You win';
        score.wins++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `
        You
        <img class="move-icon" src="images/${playerMove}-emoji.png">
        <img class="move-icon" src="images/${computerMove}-emoji.png">
        Computer
    `;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            let losingCondition;
            const playerMove = getComputerMove(); 
            if (playerMove === 'rock') {
                losingCondition = 'paper';
            } else if (playerMove === 'scissors') {
                losingCondition = 'rock';
            } else {
                losingCondition = 'scissors';
            }
            playGame(playerMove, losingCondition);
            console.log(`${playerMove} and ${losingCondition}`);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}