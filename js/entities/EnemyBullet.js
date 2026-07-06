export default class EnemyBullet {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width = 4;
        this.height = 10;

        this.speed = 250;

        this.alive = true;
    }

    update(delta) {

        this.y += this.speed * delta;

        if (this.y > window.innerHeight + 50) {
            this.alive = false;
        }
    }

    draw(ctx) {

        ctx.fillStyle = "#ff4dff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
