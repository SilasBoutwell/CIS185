export const Engine = {
    gl: null,

    init() {
        const canvas = document.getElementById("gameCanvas");
        this.gl = canvas.getContext("webgl");

        if (!this.gl) {
            alert("WebGL not supported");
            return;
        }

        this.resize();
        window.addEventListener("resize", () => this.resize());
    },

    resize() {
        const canvas = this.gl.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, canvas.width, canvas.height);
    },

    render() {
        const gl = this.gl;
        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
};
