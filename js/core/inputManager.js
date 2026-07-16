export default class InputManager {
    constructor(canvas, sticks = []) {
        this.canvas = canvas; this.left = false; this.right = false; this.up = false; this.down = false;
        this.touchActive = false; this.touchX = 0; this.touchY = 0; this.stickDirection = { left: false, right: false, up: false, down: false };
        window.addEventListener("keydown", event => this.setKey(event.key, true));
        window.addEventListener("keyup", event => this.setKey(event.key, false));
        canvas.addEventListener("touchstart", event => this.updateCanvasTouch(event), { passive: false });
        canvas.addEventListener("touchmove", event => this.updateCanvasTouch(event), { passive: false });
        canvas.addEventListener("touchend", () => { this.touchActive = false; });
        sticks.forEach(stick => this.bindStick(stick));
    }
    setKey(key, pressed) { const map = { ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right", ArrowUp: "up", w: "up", W: "up", ArrowDown: "down", s: "down", S: "down" }; if (map[key]) this[map[key]] = pressed; }
    updateCanvasTouch(event) { event.preventDefault(); const rect = this.canvas.getBoundingClientRect(); const touch = event.touches[0]; this.touchActive = true; this.touchX = touch.clientX - rect.left; this.touchY = touch.clientY - rect.top; }
    bindStick(stick) {
        const knob = stick.querySelector(".stickKnob"); let pointerId = null;
        const move = event => { if (event.pointerId !== pointerId) return; const rect = stick.getBoundingClientRect(); let dx = event.clientX - rect.left - rect.width / 2; let dy = event.clientY - rect.top - rect.height / 2; const distance = Math.hypot(dx, dy); const limit = rect.width * .29; if (distance > limit) { dx *= limit / distance; dy *= limit / distance; } knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`; this.stickDirection.left = dx < -12; this.stickDirection.right = dx > 12; this.stickDirection.up = dy < -12; this.stickDirection.down = dy > 12; };
        const release = event => { if (event.pointerId !== pointerId) return; pointerId = null; knob.style.transform = "translate(-50%, -50%)"; Object.keys(this.stickDirection).forEach(key => this.stickDirection[key] = false); };
        stick.addEventListener("pointerdown", event => { event.preventDefault(); pointerId = event.pointerId; stick.setPointerCapture(pointerId); move(event); }); stick.addEventListener("pointermove", move); stick.addEventListener("pointerup", release); stick.addEventListener("pointercancel", release);
    }
    get left() { return this._left || this.stickDirection?.left; } set left(value) { this._left = value; }
    get right() { return this._right || this.stickDirection?.right; } set right(value) { this._right = value; }
    get up() { return this._up || this.stickDirection?.up; } set up(value) { this._up = value; }
    get down() { return this._down || this.stickDirection?.down; } set down(value) { this._down = value; }
    get stickActive() { return Boolean(this.stickDirection?.left || this.stickDirection?.right || this.stickDirection?.up || this.stickDirection?.down); }
}
