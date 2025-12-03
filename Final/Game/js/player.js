import { Input } from "./input.js";

export class Player {
    constructor() {
        this.x = 0;
        this.y = 1.7;
        this.z = 0;

        this.rotX = 0;
        this.rotY = 0;
        this.speed = 0.1;
    }

    update() {
        // mouse look
        this.rotY -= Input.mouseDelta.x * 0.002;
        this.rotX -= Input.mouseDelta.y * 0.002;
        Input.resetMouse();

        // clamp vertical look
        this.rotX = Math.max(-1.4, Math.min(1.4, this.rotX));

        // forward/back
        let dir = 0;
        if (Input.keys["w"]) dir = 1;
        if (Input.keys["s"]) dir = -1;

        this.x += Math.sin(this.rotY) * dir * this.speed;
        this.z += Math.cos(this.rotY) * dir * this.speed;

        // strafe
        let strafe = 0;
        if (Input.keys["a"]) strafe = -1;
        if (Input.keys["d"]) strafe = 1;

        this.x += Math.sin(this.rotY + Math.PI/2) * strafe * this.speed;
        this.z += Math.cos(this.rotY + Math.PI/2) * strafe * this.speed;
    }
}
