import Particle from "../entities/particle.js";


export default class Explosion {


    constructor(x, y, scale = 1) {

        this.particles = [];


        for (
            let i = 0;
            i < 25 * scale;
            i++
        ) {

            this.particles.push(
                new Particle(
                    x,
                    y
                )
            );

        }


        this.alive = true;

    }



    update(delta) {


        this.particles.forEach(
            p => p.update(delta)
        );


        this.particles =
            this.particles.filter(
                p => p.alive
            );


        if (
            this.particles.length === 0
        ) {

            this.alive = false;

        }

    }



    draw(ctx) {


        this.particles.forEach(
            p => p.draw(ctx)
        );

    }

}
