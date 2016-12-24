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
var HalfNote = (function () {
    function HalfNote() {
        this.note = '';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], HalfNote.prototype, "note", void 0);
    HalfNote = __decorate([
        core_1.Component({
            selector: 'half-note',
            template: "<quarter-note [note]=\"note\">\n    <quarter-note [note]=\"'&nbsp; &nbsp;'\">\n  ",
            styles: ["\n    :host {\n        display: table-cell;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], HalfNote);
    return HalfNote;
}());
exports.HalfNote = HalfNote;
var QuarterNote = (function () {
    function QuarterNote() {
        this.note = '';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], QuarterNote.prototype, "note", void 0);
    QuarterNote = __decorate([
        core_1.Component({
            selector: 'quarter-note',
            template: "{{note}}",
            styles: ["\n    :host {\n        display: table-cell;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], QuarterNote);
    return QuarterNote;
}());
exports.QuarterNote = QuarterNote;
var Chords = (function () {
    function Chords() {
    }
    Chords = __decorate([
        core_1.Directive({
            selector: 'chords'
        }), 
        __metadata('design:paramtypes', [])
    ], Chords);
    return Chords;
}());
exports.Chords = Chords;
//# sourceMappingURL=notes.component.js.map