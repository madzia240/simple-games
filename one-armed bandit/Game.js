class Game {
    constructor(start) {

        this.stats = new Statistics();
        this.wallet = new Wallet(start);

        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = [...document.querySelectorAll('div.color')];
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanGames = document.querySelector('.score span.number');
        this.spanWins = document.querySelector('.score span.win');
        this.spanLosses = document.querySelector('.score span.loss');
        this.alert = document.querySelector('.alert');

        this.render()

    }

    render(colors = ['#2ee', '#2ee', '#2ee'], money = this.wallet.getWalletValue(), result = "", stats = [0, 0, 0], bid = 0, wonMoney = 0) {

        this.boards.forEach((board, i) => {
            board.style.backgroundColor = colors[i]
        })

        this.spanWallet.textContent = money;
        if (result) {
            result = `You won ${wonMoney}$! `;
        } else if (!result && result !== "") {
            result = `You loose ${bid}$! `
        }
        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];

    }

    startGame() {
        this.alert.innerHTML = '';
        if (this.inputBid.value < 1) {
            this.alert.innerHTML = `Bid is too small`;
            return;
        }
        const bid = Math.floor(this.inputBid.value);

        if (!this.wallet.checkCanPlay(bid)) {
            this.alert.innerHTML = `You don't have enough money`;
            return
        }

        this.wallet.changeWallet(bid, '-');

        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkWinner(colors);
        const wonMoney = Result.moneyWinInGame(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatistics(win, bid);

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney)

        if (this.wallet.checkLoose()) {
            this.alert.innerHTML = `You loose! Again?<br> <button class='yes'>yes</button><button class='no'>no</button>`;
            document.querySelector('.yes').addEventListener('click', () => location.reload())
            document.querySelector('.no').addEventListener('click', () => location.href = '../index.html')
        }

    }
}