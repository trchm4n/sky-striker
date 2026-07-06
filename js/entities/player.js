export default class Player {

    constructor(canvas, input) {

        this.canvas = canvas;
        this.input = input;

        this.width = 40;
        this.height = 60;

        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;

        // 🚀 ブースター位置（ここが重要）
        // 下端からの距離（これを基準に指へ追従させる）
        this.boosterOffset = 8;

        this.speed = 400;

    }

    update(delta) {

        const speed = this.speed * delta;

        if (this.input.left) this.x -= speed;
        if (this.input.right) this.x += speed;
        if (this.input.up) this.y -= speed;
        if (this.input.down) this.y += speed;

        // 画面内制限
        this.x = Math.max(0, Math.min(this.x, this.canvas.width - this.width));
        this.y = Math.max(0, Math.min(this.y, this.canvas.height - this.height));
    }

    draw(ctx) {

        // 🚀 宇宙船（簡易形状）
        ctx.fillStyle = "#00d9ff";

        // 本体
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // ブースター（見える化）
        ctx.fillStyle = "#ffcc00";
        ctx.fillRect(
            this.x + this.width / 2 - 5,
            this.y + this.height - this.boosterOffset,
            10,
            10
        );
    }

    resetPosition() {
        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height - this.height - 40;
    }

}
