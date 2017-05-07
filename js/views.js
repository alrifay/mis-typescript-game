var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="classes.ts" />
/**
 * views
 */
var view = (function () {
    function view(id) {
        this.view = document.getElementById(id);
    }
    view.prototype.hide = function () {
        this.view.style.display = 'none';
    };
    view.prototype.show = function () {
        this.view.style.display = 'block';
    };
    return view;
}());
var A1 = (function (_super) {
    __extends(A1, _super);
    function A1() {
        var _this = _super.call(this, "A-1") || this;
        _this.name = document.getElementById('name');
        _this.difficulty = document.getElementById('difficulty');
        _this.newStart = document.getElementById('newStart');
        _this.errorMessage = document.getElementById('errorMessage');
        _this.newStart.onclick = function () { return _this.newStartClick(); };
        return _this;
    }
    A1.getInstance = function () {
        if (!A1.instance) {
            A1.instance = new A1();
        }
        A1.instance.errorMessage.style.display = "none";
        A1.instance.name.value = "";
        A1.instance.difficulty.value = "0";
        return A1.instance;
    };
    A1.prototype.newStartClick = function () {
        if (/^([a-zA-Z][a-z A-Z]*)$/.test(this.name.value)) {
            var player = new user(this.name.value, parseInt(this.difficulty.value), 0);
            player.Cookie();
            this.hide();
            B1.getInstance().reset();
            B1.getInstance().show();
            game.getInstanse().start();
        }
        else {
            this.errorMessage.style.display = "block";
        }
    };
    return A1;
}(view));
var A2 = (function (_super) {
    __extends(A2, _super);
    function A2() {
        var _this = _super.call(this, "A-2") || this;
        _this.playerName = document.getElementById("playerName");
        _this.playerDifficulty = document.getElementById("playerDifficulty");
        _this.highestScore = document.getElementById("highestScore");
        _this.forgetMe = document.getElementById("forgetMe");
        _this.startAgain = document.getElementById("startAgain");
        _this.forgetMe.onclick = function () { return _this.forgetMeClick(); };
        _this.startAgain.onclick = function () { return _this.startAgainClick(); };
        return _this;
    }
    A2.getInstance = function (player) {
        if (!this.instance) {
            this.instance = new A2();
        }
        A2.instance.playerName.textContent = player.name;
        A2.instance.highestScore.textContent = player.highestScore + '';
        A2.instance.playerDifficulty.textContent = level[player.difficult];
        return this.instance;
    };
    A2.prototype.forgetMeClick = function () {
        document.cookie = '';
        this.hide();
        A1.getInstance().show();
    };
    A2.prototype.startAgainClick = function () {
        this.hide();
        B1.getInstance().reset();
        B1.getInstance().show();
        game.getInstanse().start();
    };
    return A2;
}(view));
var B1 = (function (_super) {
    __extends(B1, _super);
    function B1() {
        var _this = _super.call(this, "B-1") || this;
        _this.game = document.getElementById("game");
        _this.score = document.getElementById("score");
        _this.missedBoxes = document.getElementById("missedBoxes");
        return _this;
    }
    B1.prototype.addBox = function (box) {
        box.obj.style.left = Math.round(Math.random() * (this.game.clientWidth - game.getInstanse().size)) + "px";
        this.game.appendChild(box.obj);
        box.move();
    };
    B1.prototype.removeBox = function (box) {
        this.game.removeChild(box.obj);
    };
    B1.getInstance = function () {
        if (!this.instance) {
            this.instance = new B1();
        }
        return B1.instance;
    };
    B1.prototype.reset = function () {
        B1.instance.setScore(-1);
        B1.instance.setMissed(0);
    };
    B1.prototype.setScore = function (score) {
        this.score.textContent = score + 1 + '';
    };
    B1.prototype.setMissed = function (missedBoxes) {
        this.missedBoxes.textContent = missedBoxes + '';
    };
    return B1;
}(view));
var C1 = (function (_super) {
    __extends(C1, _super);
    function C1() {
        var _this = _super.call(this, "C-1") || this;
        _this.player = document.getElementById("player");
        _this.highScore = document.getElementById("highScore");
        _this.playAgain = document.getElementById("playAgain");
        _this.playAgain.onclick = function () { return _this.playAgainClick(); };
        return _this;
    }
    C1.getInstance = function (playerName) {
        if (!this.instance) {
            this.instance = new C1();
        }
        this.instance.player.textContent = playerName.name;
        this.instance.highScore.textContent = playerName.highestScore + '';
        return this.instance;
    };
    C1.prototype.playAgainClick = function () {
        this.hide();
        A2.getInstance(game.getInstanse().player).show();
    };
    return C1;
}(view));
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        var _this = _super.call(this, "C-2") || this;
        _this.loserName = document.getElementById("loserName");
        _this.currentScore = document.getElementById("current-Score");
        _this.highScore = document.getElementById("High-Score");
        _this.playagain = document.getElementById("play-again");
        _this.playagain.onclick = function () { return _this.playAgainClick(); };
        return _this;
    }
    C2.getInstance = function (player, currentScore) {
        if (!this.instance) {
            this.instance = new C2();
        }
        this.instance.loserName.textContent = player.name;
        this.instance.currentScore.textContent = currentScore + '';
        this.instance.highScore.textContent = player.highestScore + '';
        return this.instance;
    };
    C2.prototype.playAgainClick = function () {
        this.hide();
        A2.getInstance(game.getInstanse().player).show();
    };
    return C2;
}(view));
