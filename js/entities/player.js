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
        // 🚀 ネオン宇宙船（復活版）
        // =========================

        ctx.save();

        // 光のぼかし（重要）
        ctx.shadowColor = "#00d9ff";
        ctx.shadowBlur = 12;

        // メイン船体（シャープ三角）
        ctx.fillStyle = "#00d9ff";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // =========================
        // コックピット（差し色）
        // =========================

        ctx.fillStyle = "#001b22";
        ctx.fillRect(
            this.x + this.width / 2 - 4,
            this.y + 18,
            8,
            14
        );

        // =========================
        // ブースター炎（アニメ感）
        // =========================

        const flame = 6 + Math.random() * 6;

        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2 - 6, this.y + this.height);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height + flame);
        ctx.lineTo(this.x + this.width / 2 + 6, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#ff6b00";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2 - 4, this.y + this.height);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height + flame * 0.6);
        ctx.lineTo(this.x + this.width / 2 + 4, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }

    resetPosition() {

        this.x = this.canvas.width / 2 - this.width / 2;
        this.y = this.canvas.height - this.height - 40;
    }
}
