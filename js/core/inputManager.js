export default class InputManager {
    constructor(canvas, sticks = []) {
        this.canvas = canvas; this._left = false; this._right = false; this._up = false; this._down = false; this.touchActive = false; this.touchX = 0; this.touchY = 0; this.stickVector = { x: 0, y: 0 };
        window.addEventListener("keydown", event => this.setKey(event.key, true)); window.addEventListener("keyup", event => this.setKey(event.key, false));
        canvas.addEventListener("touchstart", event => this.updateCanvasTouch(event), { passive: false }); canvas.addEventListener("touchmove", event => this.updateCanvasTouch(event), { passive: false }); canvas.addEventListener("touchend", () => { this.touchActive = false; });
        sticks.forEach(stick => this.bindStick(stick));
    }
    setKey(key, pressed) { const map = { ArrowLeft: "_left", a: "_left", A: "_left", ArrowRight: "_right", d: "_right", D: "_right", ArrowUp: "_up", w: "_up", W: "_up", ArrowDown: "_down", s: "_down", S: "_down" }; if (map[key]) this[map[key]] = pressed; }
    updateCanvasTouch(event) { event.preventDefault(); const rect = this.canvas.getBoundingClientRect(); const touch = event.touches[0]; this.touchActive = true; this.touchX = (touch.clientX - rect.left) * this.canvas.width / rect.width; this.touchY = (touch.clientY - rect.top) * this.canvas.height / rect.height; }
    bindStick(stick) { const knob = stick.querySelector(".stickKnob"); let pointerId = null; const move = event => { if (event.pointerId !== pointerId) return; const rect = stick.getBoundingClientRect(); let dx = event.clientX - rect.left - rect.width / 2; let dy = event.clientY - rect.top - rect.height / 2; const distance = Math.hypot(dx, dy); const limit = rect.width * .29; if (distance > limit) { dx *= limit / distance; dy *= limit / distance; } knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`; this.stickVector.x = dx / limit; this.stickVector.y = dy / limit; }; const release = event => { if (event.pointerId !== pointerId) return; pointerId = null; knob.style.transform = "translate(-50%, -50%)"; this.stickVector.x = 0; this.stickVector.y = 0; }; stick.addEventListener("pointerdown", event => { event.preventDefault(); pointerId = event.pointerId; stick.setPointerCapture(pointerId); move(event); }); stick.addEventListener("pointermove", move); stick.addEventListener("pointerup", release); stick.addEventListener("pointercancel", release); }
    get movementX() { return this.stickActive ? this.stickVector.x : (this._right ? 1 : 0) - (this._left ? 1 : 0); }
    get movementY() { return this.stickActive ? this.stickVector.y : (this._down ? 1 : 0) - (this._up ? 1 : 0); }
    get stickActive() { return Math.hypot(this.stickVector.x, this.stickVector.y) > .03; }
    get left() { return this.movementX < -.03; } get right() { return this.movementX > .03; } get up() { return this.movementY < -.03; } get down() { return this.movementY > .03; }
}
