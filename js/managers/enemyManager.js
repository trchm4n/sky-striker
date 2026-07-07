import Enemy from "../entities/enemy.js";
import EnemyBullet from "../entities/enemyBullet.js";

export default class EnemyManager {

    constructor(canvas) {

        this.canvas = canvas;

        this.enemies = [];
        this.enemyBullets = [];

        this.enemyTimer = 0;
        this.enemyShootTimer = 0;

        this.enemyInterval = 1.2;
        this.enemyShootInterval = 1.0;

    }

    reset() {

        this.enemies = [];
        this.enemyBullets = [];

        this.enemyTimer = 0;
        this.enemyShootTimer = 0;

    }

    getEnemyType() {

        const r = Math.random();

        if (r < 0.5) {
            return "normal";
        }

        if (r < 0.75) {
            return "side";
        }

        if (r < 0.9) {
            return "zigzag";
        }

        return "rush";

    }

    update(delta) {

        // =====================
        // 敵生成
        // =====================

        this.enemyTimer += delta;

        if (this.enemyTimer >= this.enemyInterval) {

            this.enemyTimer = 0;

            const x =
                Math.random() *
                (this.canvas.width - 40);

            this.enemies.push(

                new Enemy(
                    x,
                    -40,
                    this.getEnemyType()
                )

            );

        }

        // =====================
        // 敵弾発射
        // =====================

        this.enemyShootTimer += delta;

        if (this.enemyShootTimer >= this.enemyShootInterval) {

            this.enemyShootTimer = 0;

            this.enemies.forEach(enemy => {

                this.enemyBullets.push(

                    new EnemyBullet(

                        enemy.x +
                        enemy.width / 2,

                        enemy.y +
                        enemy.height

                    )

                );

            });

        }

        // =====================
        // 更新
        // =====================

        this.enemies.forEach(enemy => {

            enemy.update(delta);

        });

        this.enemyBullets.forEach(bullet => {

            bullet.update(delta);

        });

        // =====================
        // 削除
        // =====================

        this.enemies =
            this.enemies.filter(
                enemy => enemy.alive
            );

        this.enemyBullets =
            this.enemyBullets.filter(
                bullet => bullet.alive
            );

    }

    draw(ctx) {

        this.enemies.forEach(enemy => {

            enemy.draw(ctx);

        });

        this.enemyBullets.forEach(bullet => {

            bullet.draw(ctx);

        });

    }

}
