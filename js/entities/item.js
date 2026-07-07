export default class Item {


    constructor(
        x,
        y,
        type
    ) {


        this.x = x;

        this.y = y;


        this.type = type;



        this.width = 32;

        this.height = 32;



        this.speed = 120;


        this.alive = true;



        this.angle = 0;



        this.lifeTime = 10;



        // =====================
        // 表示設定
        // =====================

        switch(this.type) {


            case "heal":

                this.text = "❤️";

                break;



            case "power":

                this.text = "🔥";

                break;



            case "shield":

                this.text = "⭐";

                break;



            default:

                this.text = "?";

                break;

        }

    }





    update(delta) {


        this.y +=
            this.speed *
            delta;



        this.angle +=
            delta * 5;



        this.lifeTime -= delta;



        if (
            this.lifeTime <= 0
        ) {

            this.alive = false;

        }



        if (
            this.y >
            window.innerHeight + 50
        ) {

            this.alive = false;

        }

    }





    draw(ctx) {


        ctx.save();



        ctx.translate(
            this.x +
            this.width / 2,

            this.y +
            this.height / 2
        );



        ctx.rotate(
            this.angle
        );



        ctx.font =
            "28px Arial";



        ctx.textAlign =
            "center";



        ctx.textBaseline =
            "middle";



        ctx.fillText(
            this.text,
            0,
            0
        );



        ctx.restore();

    }

}
