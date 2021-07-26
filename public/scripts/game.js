class Game {
    constructor() {
        this.player = new Player(true);
        this.ai = new Player(false);
        this.playerTurn = null;
        this.playerArmy = document.getElementById('viking-army');
        this.aiArmy = document.getElementById('enemy-army');
        this.whosTurn = document.getElementById('player-turn');
        this.uiMessage = document.querySelector('#center-display h4');
        this.soldierPurchased = false;
    }

    start() {
        document.getElementById('start-game').classList.add('hide');
        document.getElementById('action-buttons').classList.remove('hide');
        document.getElementById('center-display').classList.remove('hide');
        this.whosTurn.classList.remove('hide');

        for(let i = 0; i < 4; i++) {
            this.player.addSoldier();
            this.ai.addSoldier();
        }

        this.updateBattleField();
        this.playerTurn = Math.floor(Math.random() * 6) % 2 === 0
        this.changeTurn();
    }

    attack() {
        const randomAiSoldier = this.ai.team[Math.floor(Math.random() * this.ai.team.length)]
        const randomPlayerSoldier = this.player.team[Math.floor(Math.random() * this.player.team.length)]

        if (this.playerTurn) {
            this.uiMessage.innerHTML = `${randomPlayerSoldier.name} has attacked and an enemy soldier has received ${randomAiSoldier.receiveDamage(randomPlayerSoldier.atk)} Damage`;
            if(randomAiSoldier.hp <= 0) {
                this.uiMessage.innerHTML = `${randomPlayerSoldier.name} has killed an enemy soldier in battle!`;
                this.player.enemyKilled();
                this.player.removeDeadSoldiers();
            }
            this.player.enemyAttacked();
            this.player.updateCoinDidsplay();
        } else {
            this.uiMessage.innerHTML = `${randomPlayerSoldier.name} was attacked by an enemy soldier has received ${randomPlayerSoldier.receiveDamage(randomAiSoldier.atk)} Damage`;
            if(randomPlayerSoldier.hp <= 0) {
                this.uiMessage.innerHTML = `${randomPlayerSoldier.name} has been killed by an enemy soldier in battle!`;
                this.ai.enemyKilled();
                this.ai.removeDeadSoldiers();
            }
            this.ai.enemyAttacked();
            this.ai.updateCoinDidsplay();
        }
        
        this.changeTurn();
    }

    buySoldier(buyHero) {
        if (this.playerTurn) {
            const originalTeamLength = this.player.team.length;
            buyHero ? this.player.addHero() : this.player.addSoldier();
            this.player.updateCoinDidsplay();
            this.soldierPurchased = this.player.team.length > originalTeamLength;
        } else {
            const originalTeamLength = this.ai.team.length;
            buyHero ? this.ai.addHero() : this.ai.addSoldier();
            this.ai.updateCoinDidsplay();
            this.soldierPurchased = this.ai.team.length > originalTeamLength;
        }
        if(this.soldierPurchased) {
            this.updateBattleField();
            this.changeTurn();
        }
    }

    changeTurn() {
        this.playerTurn = !this.playerTurn;
        this.soldierPurchased = false;
        this.whosTurn.childNodes[0].innerHTML = this.playerTurn ? 'Player' : 'Enemy';
        this.updateBattleField();
        this.gameOver();
        if (this.playerTurn && this.playerTurn !== null) {
            document.getElementById('action-buttons').classList.remove('invisible');
        } else if (!this.playerTurn && this.playerTurn !== null) {
            document.getElementById('action-buttons').classList.add('invisible');
            this.aiTurn()
        }
    }

    aiTurn() {
        const random = Math.floor(Math.random() * 6);
        const randomHero = Math.floor(Math.random() * 6);
        setTimeout(() => {
            if (this.ai.coin >= 25 && random % 2 === 0) {
                this.buySoldier(false);
            } else if (this.ai.coin >= 25 && random % 4 === 0) {
                this.buySoldier(true)
            } else {
                this.attack();
            }
        }, 2000);
    }

    updateBattleField() {
        this.playerArmy.innerHTML = '';
        this.aiArmy.innerHTML = '';
        
        this.player.addSoldiersToField(this.playerArmy)
        this.ai.addSoldiersToField(this.aiArmy)
        // this.gameOver();
    }
    
    gameOver() {
        if(this.player.team.length <= 0) {
            document.getElementById('start-game').classList.remove('hide');
            document.getElementById('action-buttons').classList.add('hide');
            this.uiMessage.innerHTML = `The Enemy Horde Has Deafeted You In Battle!`;
            this.resetValues();
        } else if(this.ai.team.length <= 0) {
            document.getElementById('start-game').classList.remove('hide');
            document.getElementById('action-buttons').classList.add('hide');
            this.uiMessage.innerHTML = `You Are Victorious In Your Battle Against The Invading Horde!`;
            this.resetValues();
        }
    }

    resetValues() {
        this.playerTurn = null;
        this.whosTurn.classList.add('hide');
    }
}