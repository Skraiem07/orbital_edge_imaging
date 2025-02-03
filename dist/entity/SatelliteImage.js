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
exports.SatelliteImage = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
let SatelliteImage = class SatelliteImage {
};
exports.SatelliteImage = SatelliteImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SatelliteImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SatelliteImage.prototype, "catalogID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], SatelliteImage.prototype, "acquisitionDateStart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], SatelliteImage.prototype, "acquisitionDateEnd", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], SatelliteImage.prototype, "offNadir", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], SatelliteImage.prototype, "resolution", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], SatelliteImage.prototype, "cloudCoverage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SatelliteImage.prototype, "sensor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SatelliteImage.prototype, "scanDirection", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], SatelliteImage.prototype, "satelliteElevation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SatelliteImage.prototype, "imageBands", void 0);
__decorate([
    (0, typeorm_1.Column)('geometry') // Requires PostGIS
    ,
    __metadata("design:type", Object)
], SatelliteImage.prototype, "geometry", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, order => order.satelliteImage),
    __metadata("design:type", Array)
], SatelliteImage.prototype, "orders", void 0);
exports.SatelliteImage = SatelliteImage = __decorate([
    (0, typeorm_1.Entity)()
], SatelliteImage);
exports.default = SatelliteImage;
