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
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var Example = (function () {
    function Example() {
    }
    __decorate([
        class_validator_1.Length(1, 20),
        __metadata("design:type", String)
    ], Example.prototype, "docID", void 0);
    __decorate([
        class_validator_1.Length(1, 20),
        __metadata("design:type", String)
    ], Example.prototype, "docType", void 0);
    __decorate([
        class_validator_1.Length(1, 20),
        __metadata("design:type", String)
    ], Example.prototype, "firstName", void 0);
    __decorate([
        class_validator_1.Length(1, 20),
        __metadata("design:type", String)
    ], Example.prototype, "dateOfIssued", void 0);
    __decorate([
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], Example.prototype, "email", void 0);
    return Example;
}());
exports.Example = Example;
//# sourceMappingURL=Example.js.map