export default class Player {
    constructor(canvas, input) { this.canvas = canvas; this.input = input; this.width = 56; this.height = 68; this.speed = 350; this.powerLevel = 1; this.powerTimer = 0; this.shieldTimer = 0; this.resetPosition(); }
    update(delta) {
        const magnitude = Math.hypot(this.input.stickVector.x, this.input.stickVector.y);
        const moveSpeed = this.input.stickActive ? 105 + magnitude * 245 : this.speed;
        this.x += (this.input.right ? 1 : 0) * moveSpeed * delta; this.x -= (this.input.left ? 1 : 0) * moveSpeed * delta; this.y += (this.input.down ? 1 : 0) * moveSpeed * delta; this.y -= (this.input.up ? 1 : 0) * moveSpeed * delta;
        if (this.input.touchActive && !this.input.stickActive) { const x = this.input.touchX - this.width / 2; const y = this.input.touchY - this.height / 2; this.x += (x - this.x) * 8 * delta; this.y += (y - this.y) * 8 * delta; }
        this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x)); this.y = Math.max(0, Math.min(this.canvas.height - this.height, this.y));
        if (this.powerTimer > 0 && (this.powerTimer -= delta) <= 0) this.powerLevel = 1; if (this.shieldTimer > 0) this.shieldTimer -= delta;
    }
    powerUp() { this.powerLevel = 2; this.powerTimer = 10; } activateShield() { this.shieldTimer = 10; } isShieldActive() { return this.shieldTimer > 0; }
    getShootPositions() { const x = this.x + this.width / 2; const y = this.y + 5; return this.powerLevel === 2 ? [{ x, y }, { x: x - 19, y: y + 12 }, { x: x + 19, y: y + 12 }] : [{ x, y }]; }
    draw(ctx) {
        const cx = this.width / 2; ctx.save(); ctx.translate(this.x, this.y);
        if (this.isShieldActive()) { ctx.beginPath(); ctx.arc(cx, 35, 44, 0, Math.PI * 2); ctx.strokeStyle = "rgba(91,245,255,.88)"; ctx.lineWidth = 2; ctx.shadowBlur = 17; ctx.shadowColor = "#38ddff"; ctx.stroke(); }
        ctx.shadowBlur = 20; ctx.shadowColor = "#31dfff";
        ctx.fillStyle = "#ff9e29"; ctx.beginPath(); ctx.moveTo(16, 59); ctx.lineTo(22, 59); ctx.lineTo(19, 84 + Math.random() * 7); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(34, 59); ctx.lineTo(40, 59); ctx.lineTo(37, 84 + Math.random() * 7); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#1778cf"; ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(51, 53); ctx.lineTo(42, 66); ctx.lineTo(cx, 56); ctx.lineTo(14, 66); ctx.lineTo(5, 53); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#55dffc"; ctx.beginPath(); ctx.moveTo(cx, 7); ctx.lineTo(35, 47); ctx.lineTo(cx, 40); ctx.lineTo(21, 47); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#dffcff"; ctx.beginPath(); ctx.moveTo(cx, 13); ctx.lineTo(30, 42); ctx.lineTo(cx, 37); ctx.lineTo(26, 42); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#0b294d"; ctx.fillRect(5, 51, 13, 7); ctx.fillRect(38, 51, 13, 7); ctx.fillStyle = "#62efff"; ctx.fillRect(7, 53, 10, 2); ctx.fillRect(39, 53, 10, 2);
        ctx.restore();
    }
    resetPosition() { this.x = this.canvas.width / 2 - this.width / 2; this.y = this.canvas.height - 125; }
}
