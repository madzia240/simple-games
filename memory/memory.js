let colors = ['red', 'red', 'blue', 'blue', 'green', 'green', 'pink', 'pink', 'purple', 'purple', 'grey', 'grey', 'yellow', 'yellow', 'orange', 'orange', 'brown', 'brown'];
let cards = [...document.querySelectorAll('div')];
const startBtn = document.querySelector('.start');
let scoreTime = document.querySelector('.score');
let yourScore = document.querySelector('.yourScore')


let startTime = 0;
let gameTime = 0;
let activeCard = '';
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;

scoreTime.textContent = `High Score: ${localStorage.getItem('highscore')}s`;

const clickCard = function () {
    activeCard = this;
    if (activeCard == activeCards[0]) {
        return;
    }
    activeCard.classList.remove('hidden');
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach(card => {
            card.removeEventListener('click', clickCard);
            activeCards[1] = activeCard;
        })
    }
    setTimeout(() => {
        if (activeCards[0].className === activeCards[1].className) {
            gameResult++;
            cards = cards.filter(card => !card.classList.contains('off'));
            activeCards.forEach(card => {
                card.classList.add('off')
                if (gameResult == gamePairs) {
                    let endTime = new Date().getTime();
                    let totalTime = (endTime - startTime) / 1000;

                    yourScore.classList.add('active');
                    if (localStorage.getItem('highscore')) {
                        if (totalTime < localStorage.getItem('highscore')) {
                            localStorage.setItem('highscore', totalTime);
                            yourScore.textContent = `New High Score: ${totalTime}s`;
                        }

                    } else {
                        localStorage.setItem('highscore', totalTime);
                    }
                    yourScore.textContent = `Your Score: ${totalTime}s`;
                    scoreTime.textContent = `High Score: ${localStorage.getItem('highscore')}s`;
                    startBtn.textContent = 'Again?';
                    startBtn.addEventListener('click', () => {
                        location.reload();
                    })
                };
            })
        } else {
            activeCards.forEach(card => {
                card.classList.add('hidden')
            })
        }
        activeCard = '';
        activeCards.length = 0;
        cards.forEach(card => card.addEventListener('click', clickCard));
    }, 300)
};
const init = () => {
    startTime = new Date().getTime();
    cards.forEach((card) => {
        const position = Math.floor(Math.random() * colors.length);
        card.classList.add(colors[position]);
        colors.splice(position, 1);
    });

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add('hidden');
            card.addEventListener('click', clickCard)
        })
    }, 2000);
}

startBtn.addEventListener('click', init);