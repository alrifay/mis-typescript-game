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


abstract class box {
    obj: any;//HTMLDivElement;


    constructor(length: number, action:any) {
        this.obj = document.createElement('div');
        this.obj.onclick=action;
        this.length=length;
        this.obj.style.backgroundColor=this.Color;
    }

    abstract get Color();
    abstract action(game: game);
    set length(length:number){
        this.obj.style.width=length+"px";
        this.obj.style.height=length+"px";
    }


}

class greenBox extends box {

    get Color() {
        return 'green';
    }

    action(game: game) {
        game.score += 1;
    }

}

class redBox extends box {

    get Color() {
        return 'red';
    }

    action(game: game) {
        game.endGame();
    }
}

class brownBox extends box {
    get Color() {
        return 'brown';
    }

    action(game: game) {
        game.size -= game.rate;
    }
}

class blueBox extends box {
    get Color() {
        return 'blue';
    }

    action(game: game) {
        game.size += game.rate;
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
        document.cookie = JSON.stringify({name: this.name, highestScore: this.highestScore, difficult: this.difficult});
    }
}

class game {
    score: number;
    speed: number;
    missed: number;
    size: number;
    player: user;
    boxes: box[];
    rate: number;

    main() {
        this.player = this.getCookie();
        if (this.player) {
            // A-2
        } else {
            // A-1
        }
    }

    generateBox()
    {
        let randomNumber:number =Math.random();
        if (randomNumber>=0.9) {
            this.generateRedBox();
        }else if(randomNumber>=0.8){
            this.generateBlueBox();
        }else if(randomNumber>=0.7){
            this.generateBrownBox();
        }else {
            this.generateGreenBox();
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

    endGame() {

    }

    generateGreenBox() {
        let box =new greenBox(50,()=>{
            console.log("green");
        });
        this.boxes.push(box);
    }

    generateBrownBox() {
        let box =new greenBox(50,()=>{
            console.log("brown");
        });
        this.boxes.push(box);
    }

    generateRedBox() {
        let box =new greenBox(50,()=>{
            console.log("red");
        });
        this.boxes.push(box);
    }
    generateBlueBox() {
        let box =new greenBox(50,()=>{
            console.log("blue");
        });
        this.boxes.push(box);
    }


}

new game().generateBox();