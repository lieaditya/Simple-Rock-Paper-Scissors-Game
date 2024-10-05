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

function playGame(playerMove, computerMove, losingCondition) {
    let result;
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
    document.querySelector('.js-moves').innerHTML =
        `You
                <img class="move-icon" src="images/${playerMove}-emoji.png">
                <img class="move-icon" src="images/${computerMove}-emoji.png">
                Computer`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}