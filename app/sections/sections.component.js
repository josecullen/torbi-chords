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
var Section = (function () {
    function Section() {
        this.description = '';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Section.prototype, "description", void 0);
    Section = __decorate([
        core_1.Component({
            selector: 'section-song',
            template: "\n    \n    <div class=\"description-container\">\n        <div class=\"description\">\n            <h3 class=\"description-text\">{{description}}</h3>\n        </div>\n    </div>\n    <div class=\"lines-container\">\n        <ng-content></ng-content>\n    </div>\n  ",
            styles: ["\n    :host {\n        display: -webkit-flex; /* Safari */\n        -webkit-justify-content: space-around; /* Safari 6.1+ */\n        display: flex;\n        justify-content: space-around;\n        width: 100%\n        padding-top: 10px\n    } \n\n    .description-container{\n        width: 20%;\n        text-align: center;\n        padding-top: 7px;\n    }\n\n    .descrition{\n        width: 100%;\n    }\n\n    .description-text {\n        display: -webkit-inline-box;\n        padding: 5px;\n        border: 1px solid;\n        border-radius: 25px;\n        margin: 0px;\n    }\n\n    .lines-container {\n        display: block;\n        width: 100%;\n    }\n\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], Section);
    return Section;
}());
exports.Section = Section;
var Song = (function () {
    function Song() {
        this.name = '';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Song.prototype, "name", void 0);
    Song = __decorate([
        core_1.Component({
            selector: 'song',
            template: "\n    <div class=\"page\" size=\"A4\">\n        <h1>{{name}}</h1>\n        <ng-content></ng-content>\n        <div style=\"page-break-after:always;\"></div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Song);
    return Song;
}());
exports.Song = Song;
//# sourceMappingURL=sections.component.js.map