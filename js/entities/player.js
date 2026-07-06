export default class Player {

    static WIDTH = 40;
    static HEIGHT = 60;

    constructor(canvas) {

        this.canvas = canvas;

        this.width = Player.WIDTH;
        this.height = Player.HEIGHT;

        this.resetPosition();

    }

    resetPosition() {

        this.x = (this.canvas.width - this.width) / 2;
        this.y = this.canvas.height - this.height - 40;

    }

    update(delta) {

        // Issue #5で移動処理を実装

    }

    draw(ctx) {

        const x = this.x;
        const y = this.y;
        const w = this.width;
        const h = this.height;

        // =========================
        // エンジン噴射
        // =========================

        ctx.fillStyle = "#ff9800";

        ctx.beginPath();

        ctx.moveTo(x + w * 0.40, y + h);
        ctx.lineTo(x + w * 0.50, y + h + 14);
        ctx.lineTo(x + w * 0.60, y + h);

        ctx.fill();

        // =========================
        // 機体
        // =========================

        ctx.fillStyle = "#d9d9d9";

        ctx.beginPath();

        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x + w * 0.85, y + h * 0.75);
        ctx.lineTo(x + w * 0.65, y + h);
        ctx.lineTo(x + w * 0.35, y + h);
        ctx.lineTo(x + w * 0.15, y + h * 0.75);

        ctx.closePath();

        ctx.fill();

        // =========================
        // 左翼
        // =========================

        ctx.fillStyle = "#90caf9";

        ctx.beginPath();

        ctx.moveTo(x + w * 0.20, y + h * 0.55);
        ctx.lineTo(x - 8, y + h * 0.90);
        ctx.lineTo(x + w * 0.28, y + h * 0.82);

        ctx.closePath();

        ctx.fill();

        // =========================
        // 右翼
        // =========================

        ctx.beginPath();

        ctx.moveTo(x + w * 0.80, y + h * 0.55);
        ctx.lineTo(x + w + 8, y + h * 0.90);
        ctx.lineTo(x + w * 0.72, y + h * 0.82);

        ctx.closePath();

        ctx.fill();

        // =========================
        // キャノピー
        // =========================

        ctx.fillStyle = "#29b6f6";

        ctx.beginPath();

        ctx.ellipse(
            x + w / 2,
            y + h * 0.38,
            6,
            10,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}
