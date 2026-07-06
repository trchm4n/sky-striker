export default class Bullet {

    constructor(x, y) {

        this.x = x - 2;
        this.y = y;

        this.width = 4;
        this.height = 10;

        this.speed = 500;

        this.alive = true;
    }

    update(delta) {

        this.y -= this.speed * delta;

        if (this.y < -20) {
            this.alive = false;
        }
    }

    draw(ctx) {

        ctx.fillStyle = "#ffff66";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
