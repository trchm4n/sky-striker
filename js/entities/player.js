export default class Player {

    constructor(canvas, input) {

        this.canvas = canvas;
        this.input = input;

        this.width = 40;
        this.height = 60;

        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 40;

        this.speed = 400;

        // 🚀 スマホ用オフセット（指の上に機体を出す）
        this.touchOffsetY = 80;
        this.smooth = 0.15;
    }

    update(delta) {

        const speed = this.speed * delta;

        // =====================
        // キーボード
        // =====================
        if (this.input.left) this.x -= speed;
        if (this.input.right) this.x += speed;
        if (this.input.up) this.y -= speed;
        if (this.input.down) this.y += speed;

        // =====================
        // スマホ追従（ここが本体）
        // =====================
        if (this.input.touchActive) {

            const targetX = this.input.touchX - this.width / 2;
            const targetY = this.input.touchY - this.touchOffsetY;

            // スムーズ追従（ヌルヌル）
            this.x += (targetX - this.x) * this.smooth;
            this.y += (targetY - this.y) * this.smooth;

        }

        // =====================
        // 画面制限
        // =====================
        this.x = Math.max(0, Math.min(this.x, this.canvas.width - this.width));
        this.y = Math.max(0, Math.min(this.y, this.canvas.height - this.height));
    }

    draw(ctx) {

        ctx.fillStyle = "#00d9ff";

        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // コックピット
        ctx.fillStyle = "#001b22";
        ctx.fillRect(this.x + this.width / 2 - 5, this.y + 18, 10, 16);

        // サイドエンジン
        ctx.fillStyle = "#ff6b00";
        ctx.fillRect(this.x + 6, this.y + this.height - 8, 6, 12);
        ctx.fillRect(this.x + this.width - 12, this.y + this.height - 8, 6, 12);

        // ブースター
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
