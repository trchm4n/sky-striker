export default class Player {

    constructor(canvas, input) {

        this.canvas = canvas;
        this.input = input;

        this.width = 40;
        this.height = 60;

        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;

        this.speed = 400;

        // 🚀 ブースター位置
        this.boosterOffset = 8;
    }

    update(delta) {

        const speed = this.speed * delta;

        // キーボード操作
        if (this.input.left) this.x -= speed;
        if (this.input.right) this.x += speed;
        if (this.input.up) this.y -= speed;
        if (this.input.down) this.y += speed;

        // 画面制限
        this.x = Math.max(0, Math.min(this.x, this.canvas.width - this.width));
        this.y = Math.max(0, Math.min(this.y, this.canvas.height - this.height));
    }

    draw(ctx) {

        // =========================
        // 🚀 宇宙船デザイン復活
        // =========================

        // 本体（機首〜胴体）
        ctx.fillStyle = "#00d9ff";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y); // 上
        ctx.lineTo(this.x, this.y + this.height);     // 左下
        ctx.lineTo(this.x + this.width, this.y + this.height); // 右下
        ctx.closePath();
        ctx.fill();

        // コックピット
        ctx.fillStyle = "#002b36";
        ctx.fillRect(
            this.x + this.width / 2 - 5,
            this.y + 15,
            10,
            15
        );

        // 🚀 ブースター炎
        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2 - 6, this.y + this.height);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height + 12);
        ctx.lineTo(this.x + this.width / 2 + 6, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // サブエンジン
        ctx.fillStyle = "#ff6b00";
        ctx.fillRect(
            this.x + 6,
            this.y + this.height - 5,
            6,
            10
        );

        ctx.fillRect(
            this.x + this.width - 12,
            this.y + this.height - 5,
            6,
            10
        );
    }

    resetPosition() {

        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height - this.height - 40;
    }
}
