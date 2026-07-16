export default class Bullet {
    constructor(x, y) { this.x = x - 3; this.y = y - 8; this.width = 6; this.height = 19; this.speed = 620; this.alive = true; }
    update(delta) { this.y -= this.speed * delta; if (this.y < -30) this.alive = false; }
    draw(ctx) { ctx.save(); ctx.shadowBlur = 14; ctx.shadowColor = "#77f8ff"; ctx.fillStyle = "#e8ffff"; ctx.fillRect(this.x, this.y, this.width, this.height); ctx.fillStyle = "#41dfff"; ctx.fillRect(this.x + 1, this.y + 3, this.width - 2, this.height - 5); ctx.restore(); }
}
