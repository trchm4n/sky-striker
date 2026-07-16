export default class Enemy {


    constructor(
        x,
        y,
        type = "normal"
    ) {


        this.x = x;

        this.y = y;


        this.type = type;



        this.width = 40;

        this.height = 40;



        this.alive = true;



        // =====================
        // AI設定
        // =====================

        this.speed = 120;



        this.baseX = x;


        this.time = 0;



        this.direction =
            Math.random() < 0.5
            ? -1
            : 1;



        switch(this.type) {


            case "side":

                this.speed = 100;

                break;



            case "zigzag":

                this.speed = 130;

                break;



            case "rush":

                this.speed = 220;

                break;



            default:

                this.speed = 120;

                break;

        }

    }





    update(delta) {


        this.time += delta;



        switch(this.type) {


            // =====================
            // 通常下降
            // =====================

            case "normal":


                this.y +=
                    this.speed *
                    delta;


                break;





            // =====================
            // 左右移動
            // =====================

            case "side":


                this.y +=
                    this.speed *
                    delta;


                this.x +=
                    this.direction *
                    100 *
                    delta;



                if (
                    this.x <= 0 ||
                    this.x + this.width >= window.innerWidth
                ) {

                    this.direction *= -1;

                }


                break;





            // =====================
            // ジグザグ
            // =====================

            case "zigzag":


                this.y +=
                    this.speed *
                    delta;



                this.x =
                    this.baseX +
                    Math.sin(
                        this.time * 5
                    ) *
                    100;


                break;





            // =====================
            // 突撃
            // =====================

            case "rush":


                this.y +=
                    this.speed *
                    delta;



                break;

        }





        if (
            this.y >
            window.innerHeight + 100
        ) {

            this.alive = false;

        }

    }





    draw(ctx) {


        ctx.save();



        ctx.translate(
            this.x,
            this.y
        );



        switch(this.type) {


            case "side":

                ctx.fillStyle =
                    "#ffcc00";

                break;



            case "zigzag":

                ctx.fillStyle =
                    "#ff00ff";

                break;



            case "rush":

                ctx.fillStyle =
                    "#ff3333";

                break;



            default:

                ctx.fillStyle =
                    "#00ff66";

                break;

        }



        ctx.shadowBlur = 14;
        ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath();
        ctx.moveTo(this.width / 2, this.height);
        ctx.lineTo(0, 8);
        ctx.lineTo(this.width / 2, 0);
        ctx.lineTo(this.width, 8);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(235,255,255,.82)";
        ctx.fillRect(this.width / 2 - 4, 11, 8, 13);



        ctx.restore();

    }

}
