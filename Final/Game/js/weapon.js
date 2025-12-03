export class Weapon {
    constructor() {
        this.cooldown = 0;
    }

    update() {
        if (this.cooldown > 0) this.cooldown--;

        if (document.pointerLockElement && this.cooldown === 0) {
            document.addEventListener("mousedown", () => {
                this.shoot();
            }, { once: true });
        }
    }

    shoot() {
        console.log("Bang!");
        this.cooldown = 10; // limit fire rate
    }
}
