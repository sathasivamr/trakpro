"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var example_delegate_1 = require("../../delegate/example.delegate");
var moment = require("moment");
var ExampleController = (function () {
    function ExampleController() {
    }
    /**
     * Get all
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    ExampleController.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var date, startDate, endDate, time, sid, unitName, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(req.query);
                        date = req.query.dateTime.split('T');
                        startDate = moment(date[0]).unix();
                        endDate = moment(date[0]).add(1, 'days').unix();
                        time = moment(req.query.dateTime).unix();
                        sid = req.query.sid;
                        unitName = req.query.unitName;
                        console.log(startDate, endDate);
                        return [4 /*yield*/, example_delegate_1.ExampleDelegate.getAll(startDate, endDate, time, sid, unitName)];
                    case 1:
                        result = _a.sent();
                        res.send({ result: result });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        winston.error('Internal Server Error ::: ExampleController - getAll', err_1);
                        res.send({
                            'isSuccess': false,
                            'message': 'Error IN Getting the Result',
                            'Request Format': ' http://tigerjump.in/example?sid=09571f2c21bfe612dea082b1f59337f7&dateTime=2018-09-12T11:11:11&unitName=tn33ax3129',
                            'err': err_1
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExampleController.getUnitDetails = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(req.query.userName === 'StJohnAmbulance')) return [3 /*break*/, 2];
                        return [4 /*yield*/, example_delegate_1.ExampleDelegate.getAllTrakproUnits()];
                    case 1:
                        result = _a.sent();
                        res.send({ result: result });
                        return [3 /*break*/, 3];
                    case 2:
                        res.send({
                            'isSuccess': false,
                            'message': 'Error IN  Getting the Result',
                        });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        winston.error('Internal Server Error ::: ExampleController - getAll', err_2);
                        res.send({
                            'isSuccess': false,
                            'message': 'Error IN Getting the Result',
                            'Request Format': 'Contact Trakpro team',
                            'err': err_2
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ExampleController.exampleDelegate = new example_delegate_1.ExampleDelegate();
    return ExampleController;
}());
exports.ExampleController = ExampleController;
//# sourceMappingURL=example.controller.js.map