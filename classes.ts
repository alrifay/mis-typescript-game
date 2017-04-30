/// <reference path="views.ts" />

/**
 * Created by mohamedkamal on 4/30/2017.
 */
enum boxType {
    plusOne,
    danger,
    increase,
    decrease
}

enum level {
    easy,
    medium,
    hard
}

class box {
    type: boxType;
    length: number;
    obj: any;//HTMLDivElement;

    constructor(type: boxType, length: number) {
        this.obj = document.createElement('div');
        this.length = length;
        this.type = type;
    }

    get Color() {
        if (this.type === boxType.danger) {
            return 'red';
        } else if (this.type === boxType.decrease) {
            return 'brown';
        } else if (this.type === boxType.increase) {
            return 'blue';
        } else {
            return 'green';
        }
    }
}

class user {
    name: string;
    difficult: level;
    highestScore: number;
    constructor(name: string, difficult: level, highestScore: number) {
        this.name = name;
        this.difficult = difficult;
        this.highestScore = highestScore;
    }
    Cookie() {
        document.cookie = JSON.stringify({ name: this.name, highestScore: this.highestScore, difficult: this.difficult });
    }
}

class game {
    score: number;
    speed: number;
    missed: number;
    size: number;
    player: user;
    boxes: box[];

    main() {
        this.player = this.getCookie();
        if (this.player) {
            // A-2
        } else {
            // A-1
        }
    }

    getCookie() {
        if (document.cookie) {
            let cookie = JSON.parse(document.cookie);
            let player = new user(cookie.name, cookie.difficult, cookie.highestScore);
            return player;
        }
        return null;
    }
}
