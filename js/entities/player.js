export default class Player {


    constructor(
        canvas,
        input
    ) {


        this.canvas = canvas;

        this.input = input;



        this.width = 50;

        this.height = 60;



        this.x =
            canvas.width / 2 -
            this.width / 2;


        this.y =
            canvas.height - 120;



        this.speed = 350;



        // =====================
        // 攻撃強化
        // =====================

        this.powerLevel = 1;

        this.powerTimer = 0;



        // =====================
        // 無敵
        // =====================

        this.shieldTimer = 0;



        this.visible = true;


    }





    update(delta) {


        // =====================
        // 移動
        // =====================

        if (
            this.input.left
        ) {

            this.x -=
                this.speed *
                delta;

        }


        if (
            this.input.right
        ) {

            this.x +=
                this.speed *
                delta;

        }


        if (
            this.input.up
        ) {

            this.y -=
                this.speed *
                delta;

        }


        if (
            this.input.down
        ) {

            this.y +=
                this.speed *
                delta;

        }




        // =====================
        // スマホ追従
        // =====================

        if (
            this.input.touchActive
        ) {


            const targetX =
                this.input.touchX -
                this.width / 2;



            const targetY =
                this.input.touchY -
                this.height / 2;



            this.x +=
                (
                    targetX -
                    this.x
                )
                *
                8 *
                delta;



            this.y +=
                (
                    targetY -
                    this.y
                )
                *
                8 *
                delta;

        }





        // =====================
        // 画面制限
        // =====================

        this.x =
            Math.max(
                0,
                Math.min(
                    this.canvas.width -
                    this.width,

                    this.x
                )
            );


        this.y =
            Math.max(
                0,
                Math.min(
                    this.canvas.height -
                    this.height,

                    this.y
                )
            );





        // =====================
        // パワー時間
        // =====================

        if (
            this.powerTimer > 0
        ) {


            this.powerTimer -=
                delta;



            if (
                this.powerTimer <= 0
            ) {

                this.powerLevel = 1;

            }

        }





        // =====================
        // シールド時間
        // =====================

        if (
            this.shieldTimer > 0
        ) {


            this.shieldTimer -=
                delta;

        }

    }





    powerUp() {


        this.powerLevel = 2;


        this.powerTimer = 10;

    }





    activateShield() {


        this.shieldTimer = 10;

    }





    isShieldActive() {


        return (
            this.shieldTimer > 0
        );

    }





    getShootPositions() {


        const center =
            this.x +
            this.width / 2;



        const top =
            this.y;



        if (
            this.powerLevel === 2
        ) {


            return [

                {
                    x: center,
                    y: top
                },


                {
                    x: center - 18,
                    y: top + 10
                },


                {
                    x: center + 18,
                    y: top + 10
                }

            ];

        }



        return [

            {
                x: center,
                y: top
            }

        ];

    }





    draw(ctx) {


        ctx.save();



        ctx.translate(
            this.x,
            this.y
        );



        // =====================
        // シールド表示
        // =====================

        if (
            this.isShieldActive()
        ) {


            ctx.beginPath();


            ctx.arc(
                this.width / 2,
                this.height / 2,
                40,
                0,
                Math.PI * 2
            );


            ctx.strokeStyle =
                "#00ffff";


            ctx.lineWidth =
                3;


            ctx.stroke();

        }





        // =====================
        // 宇宙船
        // =====================

        ctx.fillStyle =
            "#00aaff";


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
        // ブースター
        // =====================

        ctx.fillStyle =
            "#ff8800";


        ctx.beginPath();


        ctx.moveTo(
            this.width / 2 - 10,
            this.height
        );


        ctx.lineTo(
            this.width / 2,
            this.height + 25
        );


        ctx.lineTo(
            this.width / 2 + 10,
            this.height
        );


        ctx.fill();



        ctx.restore();

    }





    resetPosition() {


        this.x =
            this.canvas.width / 2 -
            this.width / 2;


        this.y =
            this.canvas.height - 120;

    }

}
