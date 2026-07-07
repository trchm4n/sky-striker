export default class Boss {


    constructor(canvas) {


        this.canvas = canvas;



        // =====================
        // 座標
        // =====================

        this.width = 180;

        this.height = 90;



        this.x =
            canvas.width / 2 -
            this.width / 2;



        this.y = 80;




        // =====================
        // HP
        // =====================

        this.maxHp = 5000;

        this.hp = this.maxHp;



        this.alive = true;




        // =====================
        // 移動
        // =====================

        this.speed = 120;


        this.direction = 1;



        // =====================
        // 攻撃
        // =====================

        this.attackTimer = 0;


        this.attackInterval = 1.0;



        this.phase = 1;



        this.time = 0;


    }





    update(delta) {


        this.time += delta;



        // =====================
        // 左右移動
        // =====================

        this.x +=
            this.speed *
            this.direction *
            delta;



        if (
            this.x <= 0 ||
            this.x + this.width >=
            this.canvas.width
        ) {


            this.direction *= -1;


        }





        // =====================
        // Phase変更
        // =====================

        if (
            this.hp <
            this.maxHp * 0.5
        ) {


            this.phase = 2;


            this.speed = 180;


        }



        // =====================
        // 攻撃タイマー
        // =====================

        this.attackTimer += delta;



        if (
            this.attackTimer >=
            this.attackInterval
        ) {


            this.attackTimer = 0;


            return true;

        }


        return false;


    }





    draw(ctx) {


        ctx.save();



        ctx.translate(
            this.x,
            this.y
        );



        // =====================
        // ボス本体
        // =====================

        ctx.fillStyle =
            this.phase === 1
            ? "#aa00ff"
            : "#ff0033";



        ctx.beginPath();



        ctx.moveTo(
            this.width / 2,
            0
        );


        ctx.lineTo(
            0,
            this.height
        );


        ctx.lineTo(
            this.width,
            this.height
        );


        ctx.closePath();



        ctx.fill();





        // =====================
        // コア
        // =====================

        ctx.fillStyle =
            "#ffff00";



        ctx.beginPath();


        ctx.arc(
            this.width / 2,
            this.height / 2,
            18,
            0,
            Math.PI * 2
        );


        ctx.fill();



        ctx.restore();


    }





    hit(damage) {


        this.hp -= damage;



        if (
            this.hp <= 0
        ) {


            this.hp = 0;

            this.alive = false;


        }


    }





    getHpRate() {


        return (
            this.hp /
            this.maxHp
        );


    }





    getShootPoint() {


        return {

            x:
                this.x +
                this.width / 2,


            y:
                this.y +
                this.height

        };


    }

}
