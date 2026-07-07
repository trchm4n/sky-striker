export default class Particle {

    constructor(x, y) {

        this.x = x;
        this.y = y;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            180 +
            80;


        this.vx =
            Math.cos(angle) *
            speed;


        this.vy =
            Math.sin(angle) *
            speed;


        this.size =
            Math.random() *
            4 +
            2;


        this.life = 1;


        this.fade =
            Math.random() *
            1.5 +
            1;


        this.alive = true;

    }



    update(delta) {


        this.x +=
            this.vx *
            delta;


        this.y +=
            this.vy *
            delta;


        this.life -=
            delta *
            this.fade;


        if (this.life <= 0) {

            this.alive = false;

        }

    }



    draw(ctx) {


        ctx.save();


        ctx.globalAlpha =
            this.life;


        ctx.fillStyle =
            "#ffaa00";


        ctx.beginPath();


        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        ctx.fill();


        ctx.restore();

    }

}
