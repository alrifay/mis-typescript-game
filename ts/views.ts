/// <reference path="classes.ts" />
/**
 * A1
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
    private static instance: A1;

    static getInstance(): A1 {
        if (!A1.instance) {
            A1.instance = new A1();
        }
        return A1.instance;
    }

    private constructor() {
        super("A-1");
        this.name = <HTMLInputElement>document.getElementById('name');
        this.difficulty = <HTMLSelectElement>document.getElementById('difficulty');
        this.newStart = <HTMLButtonElement>document.getElementById('newStart');
        this.newStart.onclick = () => this.newStartClick();
    }

    newStartClick() {
        let player = new user(this.name.value, parseInt(this.difficulty.value), 0);
        player.Cookie();
        this.hide();
        B1.getInstance().show();
        game.getInstanse().start();
    }

}

class A2 extends view {
    playerName: HTMLSpanElement;
    playerDifficulty: HTMLSpanElement;
    forgetMe: HTMLButtonElement;
    startAgian: HTMLButtonElement;
    private static instance: A2;

    private constructor() {
        super("A-2");
        this.playerName = <HTMLSpanElement>document.getElementById("playerName");
        this.playerDifficulty = <HTMLSpanElement>document.getElementById("playerDifficulty");
        this.forgetMe = <HTMLButtonElement>document.getElementById("forgetMe");
        this.startAgian = <HTMLButtonElement>document.getElementById("startAgian");
        this.forgetMe.onclick = () => this.forgetMeClick();
        this.startAgian.onclick = () => this.startAgianClick();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new A2();
        }
        return this.instance;
    }

    forgetMeClick() {
        document.cookie = '';
        this.hide();
        A1.getInstance().show();
    }

    startAgianClick() {
        this.hide();
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
        console.info('kamal');
        box.obj.style.left = Math.round(Math.random() * 450) + "px";
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
        return this.instance;
    }
    setScore(score: number) {
        this.score.textContent = score + '';
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

    public static getInstance() {
        if (!this.instance) {
            this.instance = new C1();
        }
        return this.instance;
    }

    playAgainClick() {
        this.hide();
        location.reload();
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

    public static getInstance() {
        if (!this.instance) {
            this.instance = new C2();
        }
        return this.instance;
    }

    playAgainClick() {
        this.hide();
        location.reload();
    }
}