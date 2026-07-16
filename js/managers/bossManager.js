import Boss from "../entities/boss.js";
import EnemyBullet from "../entities/enemyBullet.js";

export default class BossManager {
    constructor(canvas) { this.canvas = canvas; this.reset(); }
    reset() { this.boss = null; this.warningTimer = 0; }
    spawn(stage) { this.boss = new Boss(this.canvas, stage); this.warningTimer = 2.4; }
    get active() { return Boolean(this.boss?.alive); }
    get warningActive() { return this.warningTimer > 0; }
    update(delta, player) { if (!this.boss?.alive) return []; if (this.warningTimer > 0) { this.warningTimer -= delta; return []; } return this.boss.update(delta, player).map(attack => new EnemyBullet(attack.x, attack.y, player, attack.speed, attack.angle)); }
    hit(bullet) { if (this.boss?.alive) { this.boss.hit(50); bullet.alive = false; } }
    consumeDefeated() { if (!this.boss || this.boss.alive) return null; const defeated = this.boss; this.boss = null; return defeated; }
}
