export default class ScoreManager {


    constructor() {

        this.key =
            "spaceShooterHighScore";

    }



    getHighScore() {

        const score =
            localStorage.getItem(
                this.key
            );


        return score
            ? Number(score)
            : 0;

    }



    saveScore(score) {


        const highScore =
            this.getHighScore();



        if (
            score > highScore
        ) {


            localStorage.setItem(
                this.key,
                score
            );


            return true;

        }


        return false;

    }

}
