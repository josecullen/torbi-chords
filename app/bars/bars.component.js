"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//  <ng-content select="chords" *ngIf="type === 'repeat-end'"></ng-content>
var Bar = (function () {
    function Bar() {
        this.type = "common";
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Bar.prototype, "type", void 0);
    Bar = __decorate([
        core_1.Component({
            selector: 'bar',
            template: "\n    <span *ngIf=\"type === 'repeat-start'\"><strong>:</strong></span>\n    <span>&nbsp;</span>\n    <ng-content select=\"chords\"></ng-content>\n    <span *ngIf=\"type === 'repeat-end'\"><strong>:</strong></span>\n",
            styles: ["\n    :host {\n      width: 100%;\n      display: -webkit-flex; /* Safari */\n      -webkit-justify-content: space-around; /* Safari 6.1+ */\n      display: flex;\n      justify-content: space-around;\n      border-left: 1px solid black;\n    }\n    span {\n        padding-right: 2px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], Bar);
    return Bar;
}());
exports.Bar = Bar;
var BarNoBorder = (function () {
    function BarNoBorder() {
    }
    BarNoBorder = __decorate([
        core_1.Component({
            selector: 'bar-no-border',
            template: "\n    <ng-content select=\"chords\"></ng-content>\n",
            styles: ["\n    :host {\n      width: 100%;\n      display: -webkit-flex; /* Safari */\n      -webkit-justify-content: space-around; /* Safari 6.1+ */\n      display: flex;\n      justify-content: space-around;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], BarNoBorder);
    return BarNoBorder;
}());
exports.BarNoBorder = BarNoBorder;
var BarRepeatStart = (function () {
    function BarRepeatStart() {
    }
    BarRepeatStart = __decorate([
        core_1.Component({
            selector: 'bar-repeat-start',
            template: "\n    <span><strong>:</strong></span>\n    <ng-content select=\"chords\"></ng-content>\n    ",
            styles: ["\n    :host {\n      width: 100%;\n      display: -webkit-flex; /* Safari */\n        -webkit-justify-content: space-around; /* Safari 6.1+ */\n        display: flex;\n        justify-content: space-around;\n        border-left: 1px solid black;\n    }\n    span {\n        padding-right: 2px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], BarRepeatStart);
    return BarRepeatStart;
}());
exports.BarRepeatStart = BarRepeatStart;
var BarRepeatEnd = (function () {
    function BarRepeatEnd() {
    }
    BarRepeatEnd = __decorate([
        core_1.Component({
            selector: 'bar-repeat-end',
            template: "\n    <span>&nbsp;</span>\n    <ng-content select=\"chords\"></ng-content>\n    <span><strong>:</strong></span>\n\n    ",
            styles: ["\n    :host {\n      width: 100%;\n      display: -webkit-flex; /* Safari */\n      -webkit-justify-content: space-between; /* Safari 6.1+ */\n      display: flex;\n      justify-content: space-between;\n      border-left: 1px solid black;\n    }\n    span {\n        padding-right: 2px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], BarRepeatEnd);
    return BarRepeatEnd;
}());
exports.BarRepeatEnd = BarRepeatEnd;
var Condition = (function () {
    function Condition() {
        this.condition = '';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Condition.prototype, "condition", void 0);
    Condition = __decorate([
        core_1.Component({
            selector: 'condition',
            template: "\n  {{condition}}\n  ",
            styles: ["\n    :host {\n      width: 100%;\n      border-top-left-radius: 4px;\n      border-left: 1px solid black;\n      border-top: 1px solid black;\n      font-family: monospace;\n      display: flex;\n    }\n  \n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], Condition);
    return Condition;
}());
exports.Condition = Condition;
var LineBar = (function () {
    function LineBar() {
    }
    LineBar = __decorate([
        core_1.Component({
            selector: 'line-bar',
            template: "\n    <ng-content select=\"instructions\"></ng-content>\n    <ng-content select=\"bars\"></ng-content>\n  ",
            styles: ["\n    :host {\n        display: -webkit-flex; /* Safari */\n        -webkit-justify-content: space-around; /* Safari 6.1+ */\n        display: block;\n        justify-content: space-around;\n        padding-top: 10px\n    } \n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], LineBar);
    return LineBar;
}());
exports.LineBar = LineBar;
var Bars = (function () {
    function Bars() {
    }
    Bars = __decorate([
        core_1.Directive({
            selector: 'bars'
        }), 
        __metadata('design:paramtypes', [])
    ], Bars);
    return Bars;
}());
exports.Bars = Bars;
var Instructions = (function () {
    function Instructions() {
    }
    Instructions = __decorate([
        core_1.Directive({
            selector: 'instructions'
        }), 
        __metadata('design:paramtypes', [])
    ], Instructions);
    return Instructions;
}());
exports.Instructions = Instructions;
//# sourceMappingURL=bars.component.js.map