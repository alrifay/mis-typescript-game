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
 * A1
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
        _this.newStart.onclick = function () { return _this.newStartClick(); };
        return _this;
    }
    A1.getInstance = function () {
        if (!A1.instance) {
            A1.instance = new A1();
        }
        return A1.instance;
    };
    A1.prototype.newStartClick = function () {
        var player = new user(this.name.value, parseInt(this.difficulty.value), 0);
        player.Cookie();
    };
    return A1;
}(view));
var A2 = (function (_super) {
    __extends(A2, _super);
    function A2() {
        var _this = _super.call(this, "A-2") || this;
        _this.playerName = document.getElementById("playerName");
        _this.playerDifficulty = document.getElementById("playerDifficulty");
        _this.forgetMe = document.getElementById("forgetMe");
        _this.startAgian = document.getElementById("startAgian");
        _this.forgetMe.onclick = function () { return _this.forgetMeClick(); };
        _this.startAgian.onclick = function () { return _this.startAgianClick(); };
        return _this;
    }
    A2.getInstance = function () {
        if (!this.instance) {
            this.instance = new A2();
        }
        return this.instance;
    };
    A2.prototype.forgetMeClick = function () {
        document.cookie = null;
        this.hide();
        A1.getInstance().show();
    };
    A2.prototype.startAgianClick = function () {
        this.hide();
    };
    return A2;
}(view));
var B1 = (function (_super) {
    __extends(B1, _super);
    function B1() {
        return _super.call(this, "B-1") || this;
    }
    return B1;
}(view));
