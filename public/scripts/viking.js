class Viking extends Soldier {
    constructor(hp, atk, def) {
        super(hp, atk, def);
        this.name = vikingNames[Math.floor(Math.random() * vikingNames.length)];
        this.image = `./public/images/vikings/viking${Math.ceil(Math.random() * 6)}.png`
    }

    addVikingToField(armyNode) {
        const soldierBox = document.createElement('div')
        soldierBox.classList.add('soldier-box');

        soldierBox.innerHTML = `
        <img src=${this.image} alt="soldier">
        <h3>${this.name}</h3>
        <div class='details'>
        <h4><img src="./public/images/resources/crossed-swords.png" alt="crossed swords"/>: ${this.atk}</h4>
        <h4><img src="./public/images/resources/shield.png" alt="shield">: ${this.def}</h4>
        </div>
        <progress value="${this.hp}" max="${this.maxHp}"></progress>
        `
        armyNode.appendChild(soldierBox);
    }
}