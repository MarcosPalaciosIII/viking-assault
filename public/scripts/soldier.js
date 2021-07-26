class Soldier {
    constructor(hp, atk, def) {
        this.hp = hp ? hp : Math.floor(Math.random() * 51) + 50;
        this.atk = atk ? atk : Math.floor(Math.random() * 31) + 30;
        this.def = def ? def : Math.floor(Math.random() * 11) + 10;
        this.maxHp = this.hp;
    }

    receiveDamage(attack) {
        this.hp -= (attack - this.def) > 0 ? (attack - this.def) : 0;
        return attack - this.def > 0 ? (attack - this.def) : 0;
    }
}