export default class AudioManager {

    constructor() {

        this.enabled = true;

        this.context = null;

        this.buffers = {};

        this.bgmSource = null;

        this.loaded = false;


        this.files = {

            bgm: "assets/bgm.mp3",

            shoot: "assets/se_shoot.mp3",

            hit: "assets/se_hit.mp3",

            explosion: "assets/se_explosion.mp3"

        };


        this.loadPromise = this.loadSounds();

    }



    // =====================
    // AudioContext初期化
    // =====================

    initContext() {

        if (this.context) {
            return;
        }


        this.context =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }



    // =====================
    // 音ロード
    // =====================

    async loadSounds() {

        this.initContext();


        for (const key in this.files) {

            const response =
                await fetch(this.files[key]);


            const arrayBuffer =
                await response.arrayBuffer();


            const audioBuffer =
                await this.context.decodeAudioData(
                    arrayBuffer
                );


            this.buffers[key] =
                audioBuffer;

        }


        this.loaded = true;

    }



    // =====================
    // 再生準備
    // =====================

    async ready() {

        await this.loadPromise;


        if (
            this.context.state === "suspended"
        ) {

            await this.context.resume();

        }

    }



    // =====================
    // SE再生
    // =====================

    playSE(name) {


        if (
            !this.enabled ||
            !this.loaded
        ) {

            return;

        }


        const source =
            this.context.createBufferSource();


        source.buffer =
            this.buffers[name];


        source.connect(
            this.context.destination
        );


        source.start(0);

    }



    // =====================
    // BGM
    // =====================

    async playBGM() {


        if (!this.enabled) {
            return;
        }


        await this.ready();


        if (this.bgmSource) {

            return;

        }


        this.bgmSource =
            this.context.createBufferSource();


        this.bgmSource.buffer =
            this.buffers.bgm;


        this.bgmSource.loop = true;


        this.bgmSource.connect(
            this.context.destination
        );


        this.bgmSource.start(0);

    }



    stopBGM() {


        if (this.bgmSource) {

            this.bgmSource.stop();

            this.bgmSource.disconnect();

            this.bgmSource = null;

        }

    }



    // =====================
    // ゲーム側呼び出し
    // =====================

    shoot() {

        this.playSE(
            "shoot"
        );

    }



    hit() {

        this.playSE(
            "hit"
        );

    }



    explosion() {

        this.playSE(
            "explosion"
        );

    }

    async item() {

        if (!this.enabled) return;

        this.initContext();

        if (this.context.state === "suspended") await this.context.resume();

        const oscillator = this.context.createOscillator();
        const gain = this.context.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(660, this.context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1320, this.context.currentTime + .12);
        gain.gain.setValueAtTime(.12, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001, this.context.currentTime + .18);

        oscillator.connect(gain);
        gain.connect(this.context.destination);
        oscillator.start();
        oscillator.stop(this.context.currentTime + .18);

    }

}
