/// <reference path="views.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * classes
 */
var level;
(function (level) {
    level[level["easy"] = 0] = "easy";
    level[level["medium"] = 1] = "medium";
    level[level["hard"] = 2] = "hard";
})(level || (level = {}));
var box = (function () {
    function box(length, action) {
        var _this = this;
        this.position = 0;
        this.obj = document.createElement('div');
        this.obj.onclick = function () {
            action();
            _this.action(game.getInstanse());
        };
        this.length = length;
        this.obj.style.backgroundColor = this.Color;
        this.obj.style.position = 'absolute';
    }
    Object.defineProperty(box.prototype, "Color", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(box.prototype, "length", {
        set: function (length) {
            this.obj.style.width = length + "px";
            this.obj.style.height = length + "px";
        },
        enumerable: true,
        configurable: true
    });
    box.prototype.move = function () {
        var _this = this;
        this.id = setInterval(function () {
            if (_this.position >= (B1.getInstance().game.clientHeight - box.length)) {
                clearInterval(_this.id);
                _this.remove();
                if (_this instanceof greenBox) {
                    game.getInstanse().missed++;
                }
            }
            else {
                _this.position += game.getInstanse().moveSpace;
                _this.obj.style.top = _this.position + "px";
            }
        }, 10);
    };
    box.prototype.remove = function () {
        clearInterval(this.id);
        if (this.obj)
            this.obj.remove();
    };
    return box;
}());
var greenBox = (function (_super) {
    __extends(greenBox, _super);
    function greenBox() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(greenBox.prototype, "Color", {
        get: function () {
            return 'green';
        },
        enumerable: true,
        configurable: true
    });
    greenBox.prototype.action = function (game) {
        game.score += 1;
        this.remove();
    };
    return greenBox;
}(box));
var redBox = (function (_super) {
    __extends(redBox, _super);
    function redBox() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(redBox.prototype, "Color", {
        get: function () {
            return 'red';
        },
        enumerable: true,
        configurable: true
    });
    redBox.prototype.action = function (game) {
        game.endGame();
        this.remove();
    };
    return redBox;
}(box));
var brownBox = (function (_super) {
    __extends(brownBox, _super);
    function brownBox() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(brownBox.prototype, "Color", {
        get: function () {
            return 'brown';
        },
        enumerable: true,
        configurable: true
    });
    brownBox.prototype.action = function (game) {
        game.size -= game.rate;
        game.boxes.forEach(function (box) {
            box.length = game.size;
        });
        this.remove();
    };
    return brownBox;
}(box));
var blueBox = (function (_super) {
    __extends(blueBox, _super);
    function blueBox() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(blueBox.prototype, "Color", {
        get: function () {
            return 'blue';
        },
        enumerable: true,
        configurable: true
    });
    blueBox.prototype.action = function (game) {
        game.size += game.rate;
        game.boxes.forEach(function (box) {
            box.length = game.size;
        });
        this.remove();
    };
    return blueBox;
}(box));
var user = (function () {
    function user(name, difficult, highestScore) {
        this.name = name;
        this.difficult = difficult;
        this.highestScore = highestScore;
    }
    user.prototype.Cookie = function () {
        document.cookie = JSON.stringify({ name: this.name, highestScore: this.highestScore, difficult: this.difficult });
    };
    return user;
}());
var game = (function () {
    function game() {
    }
    game.getInstanse = function () {
        if (!game.Instanse) {
            game.Instanse = new game();
        }
        return game.Instanse;
    };
    game.prototype.main = function () {
        this.player = this.getCookie();
        if (this.player) {
            A2.getInstance(this.player).show();
        }
        else {
            A1.getInstance().show();
        }
    };
    game.prototype.start = function () {
        var _this = this;
        this.player = this.getCookie();
        this.rate = 10;
        this.size = 50;
        this.score = 0;
        this.miss = 0;
        this.moveSpace = 1;
        this.boxes = [];
        if (this.player.difficult == level.easy) {
            this.speed = 1200;
        }
        else if (this.player.difficult == level.medium) {
            this.speed = 1000;
        }
        else {
            this.speed = 600;
        }
        this.IntervalId = setInterval(function () { return _this.generateBox(); }, this.speed);
        this.moveSpaceInt = setInterval(function () {
            _this.moveSpace += 1;
        }, 15000);
    };
    /*initialize()
     {
         this.rate = 10;
         this.size = 50;
         this.score = 0;
         this.miss = 0;
         this.moveSpace = 1;
     }*/
    game.prototype.endGame = function () {
        clearInterval(this.IntervalId);
        clearInterval(this.moveSpaceInt);
        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes.pop().remove();
        }
        B1.getInstance().hide();
        if (this.score >= this.player.highestScore) {
            this.player.highestScore = this.score;
            document.cookie = JSON.stringify(this.player);
            C1.getInstance(this.player).show();
        }
        else
            C2.getInstance(this.player, this.score).show();
    };
    game.prototype.getCookie = function () {
        if (document.cookie) {
            var cookie = JSON.parse(document.cookie);
            var player = new user(cookie.name, cookie.difficult, cookie.highestScore);
            return player;
        }
        return null;
    };
    game.prototype.generateBox = function () {
        var randomNumber = Math.random();
        if (randomNumber >= 0.9) {
            this.generateRedBox();
        }
        else if (randomNumber >= 0.8) {
            this.generateBlueBox();
        }
        else if (randomNumber >= 0.7) {
            this.generateBrownBox();
        }
        else {
            this.generateGreenBox();
        }
        B1.getInstance().addBox(this.boxes[this.boxes.length - 1]);
    };
    game.prototype.generateGreenBox = function () {
        var _this = this;
        var box = new greenBox(this.size, function () {
            B1.getInstance().setScore(_this.score);
        });
        this.boxes.push(box);
    };
    game.prototype.generateBrownBox = function () {
        var box = new brownBox(this.size, function () { });
        this.boxes.push(box);
    };
    game.prototype.generateRedBox = function () {
        var box = new redBox(this.size, function () { });
        this.boxes.push(box);
    };
    game.prototype.generateBlueBox = function () {
        var box = new blueBox(this.size, function () { });
        this.boxes.push(box);
    };
    Object.defineProperty(game.prototype, "missed", {
        get: function () {
            return this.miss;
        },
        set: function (miss) {
            this.miss = miss;
            B1.getInstance().setMissed(this.miss);
            if (miss >= 3) {
                this.endGame();
            }
        },
        enumerable: true,
        configurable: true
    });
    return game;
}());
window.onload = function () {
    game.getInstanse().main();
};
