/**
 * Created by mohamedkamal on 4/30/2017.
 */
var boxType;
(function (boxType) {
    boxType[boxType["plusOne"] = 0] = "plusOne";
    boxType[boxType["danger"] = 1] = "danger";
    boxType[boxType["increase"] = 2] = "increase";
    boxType[boxType["decrease"] = 3] = "decrease";
})(boxType || (boxType = {}));
var level;
(function (level) {
    level[level["easy"] = 0] = "easy";
    level[level["medium"] = 1] = "medium";
    level[level["hard"] = 2] = "hard";
})(level || (level = {}));
var box = (function () {
    function box(type, length) {
        this.obj = document.createElement('div');
        this.length = length;
        this.type = type;
    }
    Object.defineProperty(box.prototype, "Color", {
        get: function () {
            if (this.type === boxType.danger) {
                return 'red';
            }
            else if (this.type === boxType.decrease) {
                return 'brown';
            }
            else if (this.type === boxType.increase) {
                return 'blue';
            }
            else {
                return 'green';
            }
        },
        enumerable: true,
        configurable: true
    });
    return box;
}());
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
    return game;
}());
function getCookie() {
    if (document.cookie) {
        var cookie = JSON.parse(document.cookie);
        var player = new user(cookie.name, cookie.difficult, cookie.highestScore);
        return player;
    }
    return null;
}
