export default class EnemyBullet {
    constructor(x, y, target = null, speed = 260, angle = null) {
        this.x = x - 4; this.y = y; this.width = 8; this.height = 14; this.speed = speed; this.alive = true; this.canvas = target?.canvas || null;
        const targetAngle = target ? Math.atan2(target.y + target.height / 2 - y, target.x + target.width / 2 - x) : Math.PI / 2;
        const direction = angle ?? targetAngle;
        this.vx = Math.cos(direction) * this.speed; this.vy = Math.sin(direction) * this.speed;
    }
    update(delta) { this.x += this.vx * delta; this.y += this.vy * delta; const width = this.canvas?.width || window.innerWidth; const height = this.canvas?.height || window.innerHeight; if (this.y > height + 60 || this.y < -60 || this.x < -60 || this.x > width + 60) this.alive = false; }
    draw(ctx) { ctx.save(); ctx.translate(this.x + this.width / 2, this.y + this.height / 2); ctx.rotate(Math.atan2(this.vy, this.vx) + Math.PI / 2); ctx.shadowBlur = 12; ctx.shadowColor = "#ff3f80"; ctx.fillStyle = "#ff5c9c"; ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); ctx.restore(); }
}
