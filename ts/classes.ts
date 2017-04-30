/// <reference path="views.ts" />

/**
 * Deleted by Mohamed Al-Rifay on 4/30/2017.
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


abstract class box {
    obj: HTMLDivElement;
    position: number = 0;
    id: number;
    constructor(length: number, action: any) {
        this.obj = document.createElement('div');
        this.obj.onclick = () => {
            action();
            this.action(game.getInstanse());
        };
        this.length = length;
        this.obj.style.backgroundColor = this.Color;
        this.obj.style.position = 'absolute';
    }

    abstract get Color();
    abstract action(game: game);
    set length(length: number) {
        this.obj.style.width = length + "px";
        this.obj.style.height = length + "px";
    }

    move() {
        this.id = setInterval(() => {
            if (this.position == 450) {
                clearInterval(this.id);
                this.remove();
                if (this instanceof greenBox) {
                    game.getInstanse().missed++;
                }
            }
            else {
                this.position += 1;
                this.obj.style.top = this.position + "px";
            }
        }, 10);
    }
    remove() {
        clearInterval(this.id);
        if(this.obj && this.obj.parentElement)
        this.obj.parentElement.removeChild(this.obj);
    }
}

class greenBox extends box {

    get Color() {
        return 'green';
    }

    action(game: game) {
        game.score += 1;
        this.remove();
    }

}

class redBox extends box {

    get Color() {
        return 'red';
    }

    action(game: game) {
        game.endGame();
        this.remove();
    }
}

class brownBox extends box {
    get Color() {
        return 'brown';
    }

    action(game: game) {
        game.size -= game.rate;
        game.boxes.forEach(box => {
            box.length = game.size;
        });
        this.remove();
    }
}

class blueBox extends box {
    get Color() {
        return 'blue';
    }

    action(game: game) {
        game.size += game.rate;
        game.boxes.forEach(box => {
            box.length = game.size;
        });
        this.remove();
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
    miss: number;
    size: number;
    player: user;
    boxes: box[];
    rate: number;
    IntervalId: number;
    private static Instanse: game;
    private constructor() {

    }
    static getInstanse() {
        if (!game.Instanse) {
            game.Instanse = new game();
        }
        return game.Instanse;
    }
    main() {
        this.player = this.getCookie();
        if (this.player) {
            console.info('player exist');
            A2.getInstance().show();
        } else {
            console.info('player does not exist');
            A1.getInstance().show();
        }
    }
    start() {
        this.player = this.getCookie();
        this.rate = 10;
        this.size = 50;
        this.score = 0;
        this.miss = 0;
        this.boxes = [];
        if (this.player.difficult == level.easy) {
            this.speed = 1200;
        } else if (this.player.difficult == level.medium) {
            this.speed = 1000;
        } else {
            this.speed = 600;
        }
        this.IntervalId = setInterval(() => this.generateBox(), this.speed);
    }

    endGame() {
        clearInterval(this.IntervalId);
        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes.pop().remove();
        }
        B1.getInstance().hide();
    }

    getCookie() {
        if (document.cookie) {
            let cookie = JSON.parse(document.cookie);
            let player = new user(cookie.name, cookie.difficult, cookie.highestScore);
            return player;
        }
        return null;
    }

    generateBox() {
        let randomNumber: number = Math.random();
        if (randomNumber >= 0.9) {
            this.generateRedBox();
        } else if (randomNumber >= 0.8) {
            this.generateBlueBox();
        } else if (randomNumber >= 0.7) {
            this.generateBrownBox();
        } else {
            this.generateGreenBox();
        }
        B1.getInstance().addBox(this.boxes[this.boxes.length - 1]);
    }


    generateGreenBox() {
        let box = new greenBox(this.size, () => {
            B1.getInstance().setScore(this.score);
        });
        this.boxes.push(box);
    }

    generateBrownBox() {
        let box = new brownBox(this.size, () => {
            console.log("brown");
        });
        this.boxes.push(box);
    }

    generateRedBox() {
        let box = new redBox(this.size, () => {
            console.log("red");
        });
        this.boxes.push(box);
    }
    generateBlueBox() {
        let box = new blueBox(this.size, () => {
            console.log("blue");
        });
        this.boxes.push(box);
    }

    set missed(miss) {
        this.miss = miss;
        if (miss >= 3) {
            this.endGame();
        }
    }
    get missed() {
        return this.miss;
    }

}
window.onload = () => {
    game.getInstanse().main();
};