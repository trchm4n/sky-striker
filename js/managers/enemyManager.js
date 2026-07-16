import Enemy from "../entities/enemy.js";
import EnemyBullet from "../entities/enemyBullet.js";

export default class EnemyManager {
    constructor(canvas) { this.canvas = canvas; this.reset(1); }
    reset(stage) { this.stage = stage; this.enemies = []; this.killCount = 0; this.spawnTimer = 0; this.shotTimer = 0; this.spawnInterval = Math.max(.48, 1.05 - (stage - 1) * .16); }
    getType() { const options = this.stage === 1 ? ["normal"] : this.stage === 2 ? ["normal", "normal", "side"] : ["normal", "side", "zigzag", "rush"]; return options[Math.floor(Math.random() * options.length)]; }
    update(delta, player, bossActive) { const bullets = []; if (!bossActive && (this.spawnTimer += delta) >= this.spawnInterval) { this.spawnTimer = 0; this.enemies.push(new Enemy(18 + Math.random() * (this.canvas.width - 76), -50, this.getType(), this.canvas)); } if ((this.shotTimer += delta) >= Math.max(.55, 1 - this.stage * .05)) { this.shotTimer = 0; this.enemies.filter(enemy => player.y + player.height / 2 > enemy.y + enemy.height).forEach(enemy => bullets.push(new EnemyBullet(enemy.x + enemy.width / 2, enemy.y + enemy.height, player))); } this.enemies.forEach(enemy => enemy.update(delta)); this.enemies = this.enemies.filter(enemy => enemy.alive); return bullets; }
    registerKill() { this.killCount++; return this.killCount >= 24 + this.stage * 4; }
}
