class Enemy extends Soldier {
    constructor(hp, atk, def) {
        super(hp, atk, def);
        this.image = `./public/images/saxons/saxon${Math.ceil(Math.random() * 4)}.png`
    }

    addEnemyToField(armyNode) {
        const soldierBox = document.createElement('div')
        soldierBox.classList.add('soldier-box');

        soldierBox.innerHTML = `
        <img src=${this.image} alt="soldier">
        <div class='details'>
        <h4><img src="/public/images/resources/crossed-swords.png" alt="crossed swords"/>: ${this.atk}</h4>
        <h4><img src="/public/images/resources/shield.png" alt="shield">: ${this.def}</h4>
        </div>
        <progress value="${this.hp}" max="${this.maxHp}"></progress>
        `
        armyNode.appendChild(soldierBox);
    }
}