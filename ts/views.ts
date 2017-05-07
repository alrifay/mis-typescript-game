/// <reference path="classes.ts" />
/**
 * views
 */
class view {
    view: HTMLDivElement;

    constructor(id: string) {
        this.view = <HTMLDivElement>document.getElementById(id);
    }

    hide() {
        this.view.style.display = 'none';
    }

    show() {
        this.view.style.display = 'block';
    }
}

class A1 extends view {
    private name: HTMLInputElement;
    private difficulty: HTMLSelectElement;
    private newStart: HTMLButtonElement;
    private errorMessage : HTMLDivElement;
    private static instance: A1;

    static getInstance(): A1 {
        if (!A1.instance) {
            A1.instance = new A1();
        }
        A1.instance.errorMessage.style.display = "none";
        A1.instance.name.value = "";
        A1.instance.difficulty.value = "0";
        return A1.instance;
    }

    private constructor() {
        super("A-1");
        this.name = <HTMLInputElement>document.getElementById('name');
        this.difficulty = <HTMLSelectElement>document.getElementById('difficulty');
        this.newStart = <HTMLButtonElement>document.getElementById('newStart');
        this.errorMessage = <HTMLDivElement> document.getElementById('errorMessage');
        this.newStart.onclick = () => this.newStartClick();
    }

    newStartClick() {
        if (/^([a-zA-Z][a-z A-Z]*)$/.test(this.name.value)) {
            let player = new user(this.name.value, parseInt(this.difficulty.value), 0);
            player.Cookie();
            this.hide();
            B1.getInstance().reset();
            B1.getInstance().show();
            game.getInstanse().start();
        } else {
            this.errorMessage.style.display = "block";
        }
    }

}

class A2 extends view {
    playerName: HTMLSpanElement;
    playerDifficulty: HTMLSpanElement;
    highestScore: HTMLSpanElement;
    forgetMe: HTMLButtonElement;
    startAgain: HTMLButtonElement;
    private static instance: A2;

    private constructor() {
        super("A-2");
        this.playerName = <HTMLSpanElement>document.getElementById("playerName");
        this.playerDifficulty = <HTMLSpanElement>document.getElementById("playerDifficulty");
        this.highestScore = <HTMLSpanElement>document.getElementById("highestScore");
        this.forgetMe = <HTMLButtonElement>document.getElementById("forgetMe");
        this.startAgain = <HTMLButtonElement>document.getElementById("startAgain");
        this.forgetMe.onclick = () => this.forgetMeClick();
        this.startAgain.onclick = () => this.startAgainClick();
    }

    public static getInstance(player: user) {
        if (!this.instance) {
            this.instance = new A2();
        }
        A2.instance.playerName.textContent = player.name;
        A2.instance.highestScore.textContent = player.highestScore + '';
        A2.instance.playerDifficulty.textContent = level[player.difficult];
        return this.instance;
    }

    forgetMeClick() {
        document.cookie = '';
        this.hide();
        A1.getInstance().show();
    }

    startAgainClick() {
        this.hide();
        B1.getInstance().reset();
        B1.getInstance().show();
        game.getInstanse().start();
    }

}

class B1 extends view {
    game: HTMLDivElement;
    score: HTMLSpanElement;
    missedBoxes: HTMLSpanElement;
    private static instance: B1;

    private constructor() {
        super("B-1");
        this.game = <HTMLDivElement>document.getElementById("game");
        this.score = <HTMLSpanElement>document.getElementById("score");
        this.missedBoxes = <HTMLSpanElement>document.getElementById("missedBoxes");
    }

    public addBox(box: box) {
        box.obj.style.left = Math.round(Math.random() * (this.game.clientWidth - game.getInstanse().size)) + "px";
        this.game.appendChild(box.obj);
        box.move();
    }

    public removeBox(box: box) {
        this.game.removeChild(box.obj);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new B1();
        }
        return B1.instance;
    }

    reset()
    {
        B1.instance.setScore(0);
        B1.instance.setMissed(0);
    }

    setScore(score: number) {
        this.score.textContent = score + '';
    }

    setMissed(missedBoxes: number) {
        this.missedBoxes.textContent = missedBoxes + '';
    }
}

class C1 extends view {
    player: HTMLSpanElement;
    highScore: HTMLSpanElement;
    playAgain: HTMLButtonElement;
    private static instance: C1;

    private constructor() {
        super("C-1");
        this.player = <HTMLSpanElement>document.getElementById("player");
        this.highScore = <HTMLSpanElement>document.getElementById("highScore");
        this.playAgain = <HTMLButtonElement>document.getElementById("playAgain");
        this.playAgain.onclick = () => this.playAgainClick();
    }

    public static getInstance(playerName: user) {
        if (!this.instance) {
            this.instance = new C1();
        }
        this.instance.player.textContent = playerName.name;
        this.instance.highScore.textContent = playerName.highestScore + '';
        return this.instance;
    }

    playAgainClick() {
        this.hide();
        A2.getInstance(game.getInstanse().player).show();
    }
}

class C2 extends view {
    loserName: HTMLSpanElement;
    currentScore: HTMLSpanElement;
    highScore: HTMLSpanElement;
    playagain: HTMLButtonElement;
    private static instance: C2;

    private constructor() {
        super("C-2");
        this.loserName = <HTMLSpanElement>document.getElementById("loserName");
        this.currentScore = <HTMLSpanElement>document.getElementById("current-Score");
        this.highScore = <HTMLSpanElement>document.getElementById("High-Score");
        this.playagain = <HTMLButtonElement>document.getElementById("play-again");
        this.playagain.onclick = () => this.playAgainClick();
    }

    public static getInstance(player: user, currentScore: number) {
        if (!this.instance) {
            this.instance = new C2();
        }
        this.instance.loserName.textContent = player.name;
        this.instance.currentScore.textContent = currentScore + '';
        this.instance.highScore.textContent = player.highestScore + '';
        return this.instance;
    }

    playAgainClick() {
        this.hide();
        A2.getInstance(game.getInstanse().player).show();
    }
}