export default class AudioManager {

    constructor() {

        this.enabled = true;

        // BGM
        this.bgm = new Audio("assets/bgm.mp3");
        this.bgm.loop = true;
        this.bgm.volume = 0.4;

        // SE
        this.shootSE = new Audio("assets/se_shoot.mp3");
        this.hitSE = new Audio("assets/se_hit.mp3");
        this.explosionSE = new Audio("assets/se_explosion.mp3");

        this.shootSE.volume = 0.5;
        this.hitSE.volume = 0.5;
        this.explosionSE.volume = 0.6;
    }

    playBGM() {

        if (!this.enabled) return;

        this.bgm.currentTime = 0;
        this.bgm.play().catch(() => {});
    }

    stopBGM() {

        this.bgm.pause();
        this.bgm.currentTime = 0;
    }

    shoot() {

        if (!this.enabled) return;

        this.shootSE.currentTime = 0;
        this.shootSE.play().catch(() => {});
    }

    hit() {

        if (!this.enabled) return;

        this.hitSE.currentTime = 0;
        this.hitSE.play().catch(() => {});
    }

    explosion() {

        if (!this.enabled) return;

        this.explosionSE.currentTime = 0;
        this.explosionSE.play().catch(() => {});
    }
}
