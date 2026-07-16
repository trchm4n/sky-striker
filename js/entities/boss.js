export default class Boss {
    constructor(canvas, stage = 1) {
        this.canvas = canvas; this.width = 180; this.height = 92; this.x = canvas.width / 2 - this.width / 2; this.y = 94;
        this.maxHp = 3600 + stage * 900; this.hp = this.maxHp; this.alive = true; this.speed = 105 + stage * 12; this.direction = 1; this.attackTimer = 0; this.attackInterval = Math.max(.46, .9 - stage * .04); this.phase = 1; this.time = 0;
    }
    update(delta, player) {
        this.time += delta; this.x += this.speed * this.direction * delta;
        if (this.x <= 0 || this.x + this.width >= this.canvas.width) { this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x)); this.direction *= -1; }
        if (this.hp < this.maxHp * .48) { this.phase = 2; this.speed = 180; }
        this.attackTimer += delta; if (this.attackTimer < this.attackInterval) return [];
        this.attackTimer = 0; const centerX = this.x + this.width / 2; const originY = this.y + this.height - 5;
        if (this.phase === 1) return [{ x: centerX, y: originY, speed: 290 }];
        const aim = Math.atan2(player.y + player.height / 2 - originY, player.x + player.width / 2 - centerX);
        return [-.32, 0, .32].map(offset => ({ x: centerX, y: originY, speed: 310, angle: aim + offset }));
    }
    draw(ctx) {
        ctx.save(); ctx.translate(this.x, this.y); ctx.shadowBlur = 22; ctx.shadowColor = this.phase === 1 ? "#a84cff" : "#ff3159";
        ctx.fillStyle = this.phase === 1 ? "#7029bb" : "#c21942"; ctx.beginPath(); ctx.moveTo(this.width / 2, 0); ctx.lineTo(this.width, 38); ctx.lineTo(this.width - 18, this.height); ctx.lineTo(18, this.height); ctx.lineTo(0, 38); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#1c103a"; ctx.fillRect(22, 42, this.width - 44, 30); ctx.fillStyle = "#eaffff"; ctx.beginPath(); ctx.arc(this.width / 2, 51, 16, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = this.phase === 1 ? "#8b2fff" : "#ff294e"; ctx.beginPath(); ctx.arc(this.width / 2, 51, 8, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    hit(damage) { this.hp = Math.max(0, this.hp - damage); if (this.hp === 0) this.alive = false; }
    getHpRate() { return this.hp / this.maxHp; }
}
