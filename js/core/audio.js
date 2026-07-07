export default class AudioManager {

    constructor() {

        this.enabled = true;


        // =====================
        // BGM
        // =====================

        this.bgm = new Audio(
            "assets/bgm.mp3"
        );

        this.bgm.loop = true;
        this.bgm.volume = 0.3;


        // =====================
        // SE
        // =====================

        this.shootSE = new Audio(
            "assets/se_shoot.mp3"
        );

        this.hitSE = new Audio(
            "assets/se_hit.mp3"
        );

        this.explosionSE = new Audio(
            "assets/se_explosion.mp3"
        );


        this.shootSE.volume = 0.4;
        this.hitSE.volume = 0.5;
        this.explosionSE.volume = 0.5;


        // =====================
        // 制御
        // =====================

        this.lastShootTime = 0;

    }


    play(audio) {

        if (!this.enabled) {
            return;
        }


        audio.currentTime = 0;


        const promise = audio.play();


        if (promise !== undefined) {

            promise.catch(() => {});

        }

    }



    playBGM() {

        if (!this.enabled) {
            return;
        }


        this.bgm.play()
            .catch(() => {});

    }



    stopBGM() {

        this.bgm.pause();

        this.bgm.currentTime = 0;

    }



    shoot() {

        const now = performance.now();


        // 連射音負荷軽減
        if (
            now - this.lastShootTime < 120
        ) {

            return;

        }


        this.lastShootTime = now;


        this.play(
            this.shootSE
        );

    }



    hit() {

        this.play(
            this.hitSE
        );

    }



    explosion() {

        this.play(
            this.explosionSE
        );

    }

}
