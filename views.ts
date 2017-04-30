/// <reference path="classes.ts" />

/**
 * A1
 */
class A1 {
    private view: HTMLElement;
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
        this.view = document.getElementById('A-1');
        this.name = <HTMLInputElement>document.getElementById('name');
        this.difficulty = <HTMLSelectElement>document.getElementById('difficulty');
        this.newStart = <HTMLButtonElement>document.getElementById('newStart');
        this.newStart.onclick = () => this.newStartClick();
    }

    hide() {
        this.view.style.display = 'none';
    }

    show() {
        this.view.style.display = 'block';
    }

    newStartClick() {
        let player = new user(this.name.value, parseInt(this.difficulty.value), 0);
        player.Cookie();
    }

}

