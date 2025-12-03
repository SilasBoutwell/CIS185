import { Engine } from "./engine.js";
import { Input } from "./input.js";
import { Player } from "./player.js";
import { World } from "./world.js";
import { Weapon } from "./weapon.js";
import { UI } from "./ui.js";

let player, weapon;

function loop() {
    player.update();
    weapon.update();
    World.update();

    Engine.render();
    World.render(Engine.gl);

    requestAnimationFrame(loop);
}

window.onload = () => {
    Engine.init();
    Input.init();
    UI.init();

    player = new Player();
    weapon = new Weapon();
    World.init();

    loop();
};
