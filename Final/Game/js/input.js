export const Input = {
    keys: {},
    mouseDelta: { x: 0, y: 0 },

    init() {
        window.addEventListener("keydown", e => this.keys[e.key] = true);
        window.addEventListener("keyup", e => this.keys[e.key] = false);

        window.addEventListener("mousemove", e => {
            this.mouseDelta.x += e.movementX;
            this.mouseDelta.y += e.movementY;
        });

        document.body.addEventListener("click", () => {
            document.body.requestPointerLock();
        });
    },

    resetMouse() {
        this.mouseDelta.x = 0;
        this.mouseDelta.y = 0;
    }
};
