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
    highestScore: number;
}

class game {
    score: number;
    speed: number;
}

function hassan(){
    
}