export default class Player {

    constructor(canvas, input) {

        this.canvas = canvas;
        this.input = input;

        this.width = 40;
        this.height = 60;

        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;

        this.speed = 400;
    }

    update(delta) {

        const speed = this.speed * delta;

        if (this.input.left) this.x -= speed;
        if (this.input.right) this.x += speed;
        if (this.input.up) this.y -= speed;
        if (this.input.down) this.y += speed;

        this.x = Math.max(0, Math.min(this.x, this.canvas.width - this.width));
        this.y = Math.max(0, Math.min(this.y, this.canvas.height - this.height));
    }

    draw(ctx) {

        // =========================
        // 🚀 “最初のかっこよかった版”復元
        // =========================

        // 本体（ネオン三角）
        ctx.fillStyle = "#00d9ff";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // コックピット（黒ガラス）
        ctx.fillStyle = "#001b22";
        ctx.fillRect(
            this.x + this.width / 2 - 5,
            this.y + 18,
            10,
            16
        );

        // 左エンジン
        ctx.fillStyle = "#ff6b00";
        ctx.fillRect(
            this.x + 6,
            this.y + this.height - 8,
            6,
            12
        );

        // 右エンジン
        ctx.fillRect(
            this.x + this.width - 12,
            this.y + this.height - 8,
            6,
            12
        );

        // ブースター炎（安定版）
        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2 - 6, this.y + this.height);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height + 10);
        ctx.lineTo(this.x + this.width / 2 + 6, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }

    resetPosition() {

        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height - this.height - 40;
    }
}
