/// <reference path="classes.ts" />
/**
 * A1
 */
class view {
    view: HTMLDivElement;

    constructor(id: string) {
        this.view = <HTMLDivElement> document.getElementById(id);
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
        this.playerName = <HTMLSpanElement> document.getElementById("playerName");
        this.playerDifficulty = <HTMLSpanElement> document.getElementById("playerDifficulty");
        this.forgetMe = <HTMLButtonElement> document.getElementById("forgetMe");
        this.startAgian = <HTMLButtonElement> document.getElementById("startAgian");
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
        document.cookie = null;
        this.hide();
        A1.getInstance().show();
    }

    startAgianClick() {
        this.hide();
    }

}

class B1 extends view {
    game : HTMLDivElement;
    score : HTMLSpanElement;
    missedBoxes : HTMLSpanElement;
    private static instance : B1;
    private constructor(){
        super("B-1");
    }
}