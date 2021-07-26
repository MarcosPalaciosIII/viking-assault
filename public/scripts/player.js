class Player {
    constructor(isPlayer) {
        this.team = [];
        this.coin = 100;
        this.isPlayer = isPlayer;
    }

    enemyKilled() {
        this.coin += 35;
    }

    enemyAttacked() {
        this.coin += 2;
    }

    addSoldier() {
        if (this.coin >= 25 && this.team.length < 15) {
            this.coin -= 25;
            this.team.push(this.isPlayer ? new Viking() : new Enemy());
        }
    }

    addHero() {
        if (this.coin >= 50 && this.team.length < 15) {
            this.coin -= 50;
            this.team.push(this.isPlayer ? new Viking(100, 60, 20) : new Enemy(100, 60, 20));
        }
    }

    addSoldiersToField(armyNode) {
        this.removeDeadSoldiers();
        this.team.forEach(soldier => {
            if(soldier.hp > 0) {
                this.isPlayer ? soldier.addVikingToField(armyNode) : soldier.addEnemyToField(armyNode);
            }
        })

        this.updateTeamDisplay();
    }

    removeDeadSoldiers() {
        this.team.forEach((soldier, i) => {
            if(soldier.hp <= 0) {
                this.team.splice(i, 1);
            }
        })
    }

    updateTeamDisplay() {
        document.querySelector(`#${this.isPlayer ? 'player-data' : 'ai-data'} h3.team-size span`).innerHTML = this.team.length;
    }

    updateCoinDidsplay() {
        document.querySelector(`#${this.isPlayer ? 'player-data' : 'ai-data'} h3.team-coin span`).innerHTML = this.coin;
    }
}