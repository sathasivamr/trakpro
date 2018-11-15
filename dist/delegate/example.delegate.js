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
var request = require("request-promise-native");
var moment = require("moment");
var ExampleDelegate = (function () {
    function ExampleDelegate() {
    }
    ExampleDelegate.getAll = function (startDate, endDate, time, sid, unitName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getSID(startDate, endDate, time, sid, unitName)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                    case 2:
                        err_1 = _a.sent();
                        winston.error('Internal Server Error ::: ExampleDelegate - getAll', err_1);
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExampleDelegate.getSID = function (startDate, endDate, time, sid, unitName) {
        return __awaiter(this, void 0, void 0, function () {
            var unitDetails, reportId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllUnit(startDate, endDate, time, sid, unitName)];
                    case 1:
                        unitDetails = _a.sent();
                        return [4 /*yield*/, this.getResourceDetails(startDate, endDate, time, sid)];
                    case 2:
                        reportId = _a.sent();
                        return [4 /*yield*/, this.generateReport(startDate, endDate, time, sid, unitDetails, reportId)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ExampleDelegate.getResourceDetails = function (startDate, endDate, time, sid) {
        return __awaiter(this, void 0, void 0, function () {
            var resourceURL, options, result, obj, templateDetails, reportId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resourceURL = this.hostUrl + "svc=core/search_items&sid=" + sid + "&params={\"spec\":{\"itemsType\":\"avl_resource\",\n            \"propName\":\"sys_name\",\"propValueMask\":\"*\",\"sortType\":\"\",\"propType\":\"\"},\"force\":1,\"flags\":4611686018427387903,\"from\":0,\"to\":0}";
                        options = {
                            uri: resourceURL,
                        };
                        return [4 /*yield*/, request.get(options)];
                    case 1:
                        result = _a.sent();
                        result = JSON.parse(result);
                        obj = result.items[1].rep;
                        templateDetails = Object.keys(obj).map(function (key) { return obj[key]; });
                        console.log(templateDetails);
                        templateDetails.forEach(function (element) {
                            if (element.n.replace(/\s/g, '').toLowerCase() === 'kpnbus') {
                                reportId = element.id;
                            }
                        });
                        return [2 /*return*/, reportId];
                }
            });
        });
    };
    ExampleDelegate.getAllUnit = function (startDate, endDate, time, sid, unitName) {
        return __awaiter(this, void 0, void 0, function () {
            var getunit, options, result, unitId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getunit = this.hostUrl + "svc=core/search_items&sid=" + sid + "&params={\"spec\":{\"itemsType\":\"avl_unit\",\n      \"propName\":\"sys_name\",\"propValueMask\":\"*\",\"sortType\":\"\",\"propType\":\"\"},\"force\":1,\"flags\":4611686018427387903,\"from\":0,\"to\":0}";
                        console.log(getunit);
                        options = {
                            uri: getunit,
                        };
                        return [4 /*yield*/, request.get(options)];
                    case 1:
                        result = _a.sent();
                        result = JSON.parse(result);
                        result.items.forEach(function (element) {
                            var unitNameFromWialon = element.nm.replace(/\s/g, '').toLowerCase();
                            if (unitName === unitNameFromWialon) {
                                unitId = element.id;
                            }
                            console.log(unitNameFromWialon);
                        });
                        return [2 /*return*/, unitId];
                }
            });
        });
    };
    ExampleDelegate.generateReport = function (startDate, endDate, time, sid, unitID, reportId) {
        return __awaiter(this, void 0, void 0, function () {
            var clearReportURI, options, header, reportHeader, reportTable, result, _a, _b, timeIndex, cordinatesIndex, isFirstTime, orginal, global, resultSet, _i, result_1, element, result_2, x, y, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('generateReport');
                        clearReportURI = this.hostUrl + 'svc=report/cleanup_result&sid=' +
                            sid + '&params={"params":[{"svc":"report/cleanup_result","params":{}},{"svc":"report/cleanup_result","params":{}},{"svc":"report/get_report_data","params":{"itemId": ' + 15286109 + ' ,"col":["' + reportId + '"],"flags":0}}],"flags":0}';
                        options = {
                            uri: clearReportURI,
                        };
                        return [4 /*yield*/, request.get(options)];
                    case 1:
                        header = _e.sent();
                        reportHeader = this.hostUrl + 'svc=report/exec_report&params={"reportResourceId": ' + 15286109 + ' , "reportTemplateId": ' + reportId + ',"reportObjectId":' + unitID + ' ,"reportObjectSecId":0,"interval":{"from": ' + startDate + ' ,"to": ' + endDate + ' ,"flags":16777216},"reportObjectIdList":[]}&sid=' + sid;
                        options = {
                            uri: reportHeader,
                        };
                        return [4 /*yield*/, request.get(options)];
                    case 2:
                        header = _e.sent();
                        header = JSON.parse(header);
                        reportTable = this.hostUrl + 'svc=report/select_result_rows&sid=' + sid + '&params={"tableIndex":0,"config":{"type":"range","data":{"from":0,"to":' + header.reportResult.tables[0].rows + ',"level":1}}}';
                        options = {
                            uri: reportTable,
                        };
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, request.get(options)];
                    case 3:
                        result = _b.apply(_a, [_e.sent()]);
                        timeIndex = header.reportResult.tables[0].header.indexOf('Time');
                        cordinatesIndex = header.reportResult.tables[0].header.indexOf('Coordinates');
                        isFirstTime = true;
                        orginal = time;
                        global = 0;
                        for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                            element = result_1[_i];
                            result_2 = element.c[timeIndex].v;
                            x = element.c[cordinatesIndex].x;
                            y = element.c[cordinatesIndex].y;
                            if (isFirstTime) {
                                isFirstTime = false;
                                global = Math.abs(orginal - result_2);
                            }
                            else {
                                if (Math.abs(orginal - result_2) < global) {
                                    global = Math.abs(orginal - result_2);
                                    resultSet = {
                                        location: y + ',' + x,
                                        dateTime: moment.unix(result_2).format('DD-MMM-YY HH:mm:ss')
                                    };
                                }
                                else {
                                    break;
                                }
                            }
                        }
                        console.log(global);
                        options = {
                            uri: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + resultSet.location + '&key=AIzaSyDDLbSaPQuAQbKS3Ixk7Cb9AR9l5DMfcfY',
                        };
                        _d = (_c = JSON).parse;
                        return [4 /*yield*/, request.get(options)];
                    case 4:
                        //let curentValue = this.messageTable[msgRowIndex].c[this.getMsgIndex(this.neededInfo.msgIndex, 'Time')].v
                        result = _d.apply(_c, [_e.sent()]);
                        resultSet.location = result.plus_code.compound_code.substr(result.plus_code.compound_code.indexOf(' ') + 1);
                        //const getunit: any = this.hostUrl + `svc=core/duplicate&sid=` + res + '&params={\"operateAs\": \"\"  ,\"continueCurrentSession\":' + true + ',\"checkService\":\ "\"  }';
                        return [2 /*return*/, resultSet];
                }
            });
        });
    };
    ExampleDelegate.getAllTrakproUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sid, unitDetails, resultString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllTrakproSid()];
                    case 1:
                        sid = _a.sent();
                        console.log('meessge', sid);
                        if (!sid) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getAllTrakproUnit(sid)];
                    case 2:
                        unitDetails = _a.sent();
                        return [4 /*yield*/, this.parseUnits(JSON.parse(unitDetails))];
                    case 3:
                        resultString = _a.sent();
                        return [2 /*return*/, { 'isSuccess': true, 'responseBody': resultString }];
                    case 4: return [2 /*return*/, { 'isSuccess': false, 'responseBody': 'error while getting the data' }];
                }
            });
        });
    };
    ExampleDelegate.parseUnits = function (unitDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var arr_1;
            return __generator(this, function (_a) {
                try {
                    arr_1 = [];
                    unitDetails.items.forEach(function (unit) {
                        var unitDet = {
                            unitName: unit.nm ? unit.nm : '',
                            postion: {
                                lat: unit.pos ? unit.pos.y : '',
                                lan: unit.pos ? unit.pos.x : '',
                                time: unit.pos ? unit.pos.t : '',
                            }
                        };
                        arr_1.push(unitDet);
                    });
                    return [2 /*return*/, arr_1];
                }
                catch (err) {
                    console.log(err);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    ExampleDelegate.getAllTrakproUnit = function (sid) {
        return __awaiter(this, void 0, void 0, function () {
            var getunit, options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getunit = this.hostUrl + "svc=core/search_items&sid=" + sid + "&params={\"spec\":{\"itemsType\":\"avl_unit\",\"propName\":\"sys_name\",\"propValueMask\":\"*\",\"sortType\":\"\",\"propType\":\"\"},\"force\":1,\"flags\":4611686018427387903,\"from\":0,\"to\":0}";
                        options = {
                            uri: getunit,
                        };
                        return [4 /*yield*/, request.get(options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ExampleDelegate.getAllTrakproSid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, siteURL, options, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        jwt = '"' + '5ebd7bbaccee9523e52aee369fae623eD4FB15843AC963225FCD777DEDDE20F2C8BE4740' + '"';
                        siteURL = this.hostUrl + "svc=token/login&params={\"token\":" + jwt + "}";
                        options = {
                            uri: siteURL,
                        };
                        return [4 /*yield*/, request.post(options)];
                    case 1:
                        result = _a.sent();
                        console.log('meessge', result);
                        return [2 /*return*/, JSON.parse(result).eid];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExampleDelegate.hostUrl = 'https://hst-api.wialon.com/wialon/ajax.html?';
    return ExampleDelegate;
}());
exports.ExampleDelegate = ExampleDelegate;
//# sourceMappingURL=example.delegate.js.map