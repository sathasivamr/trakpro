

import * as winston from 'winston';
import * as request from 'request-promise-native';
import * as moment from 'moment';

var CryptoJS = require('crypto-js');




export class ExampleDelegate {

    public static hostUrl = 'https://hst-api.wialon.com/wialon/ajax.html?';
    public static async getAll(startDate: any, endDate: any, time: any, sid: any, unitName: any): Promise<any> {
        // Get data
        try {
            let result = await this.getSID(startDate, endDate, time, sid, unitName);
            return Promise.resolve(result);
        } catch (err) {
            winston.error('Internal Server Error ::: ExampleDelegate - getAll', err);
            return Promise.reject(err);
        }
    }

    public static async  getSID(startDate: any, endDate: any, time: any, sid: any, unitName: any): Promise<any> {
        let unitDetails = await this.getAllUnit(startDate, endDate, time, sid, unitName);
        let reportId = await this.getResourceDetails(startDate, endDate, time, sid);
        let result = await this.generateReport(startDate, endDate, time, sid, unitDetails, reportId);
        return result;
    }

    public static async   getResourceDetails(startDate: any, endDate: any, time: any, sid: any) {
        const resourceURL: any = this.hostUrl + `svc=core/search_items&sid=` + sid + `&params={"spec":{"itemsType":"avl_resource",
            "propName":"sys_name","propValueMask":"*","sortType":"","propType":""},"force":1,"flags":4611686018427387903,"from":0,"to":0}`;
        var options = {
            uri: resourceURL,
        };
        let result = await request.get(options);
        result = JSON.parse(result);

        const obj = result.items[1].rep;
        let templateDetails = Object.keys(obj).map(function (key: any) { return obj[key]; });
        console.log(templateDetails);
        let reportId;
        templateDetails.forEach(element => {
            if (element.n.replace(/\s/g, '').toLowerCase() === 'kpnbus') {
                reportId = element.id;
            }
        });
        return reportId;
    }

    public static async  getAllUnit(startDate: any, endDate: any, time: any, sid: any, unitName: any) {
        const getunit: any = this.hostUrl + `svc=core/search_items&sid=` + sid + `&params={"spec":{"itemsType":"avl_unit",
      "propName":"sys_name","propValueMask":"*","sortType":"","propType":""},"force":1,"flags":4611686018427387903,"from":0,"to":0}`;
        console.log(getunit);
        var options = {
            uri: getunit,
        };
        let result = await request.get(options);
        result = JSON.parse(result);

        let unitId;
        result.items.forEach(element => {
            let unitNameFromWialon: string = element.nm.replace(/\s/g, '').toLowerCase();
            if (unitName === unitNameFromWialon) {
                unitId = element.id;
            }
            console.log(unitNameFromWialon);
        });
        return unitId;
    }

    public static async  generateReport(startDate: any, endDate: any, time: any, sid: any, unitID: any, reportId: any) {
        console.log('generateReport');
        const clearReportURI = this.hostUrl + 'svc=report/cleanup_result&sid=' +
            sid + '&params={"params":[{"svc":"report/cleanup_result","params":{}},{"svc":"report/cleanup_result","params":{}},{"svc":"report/get_report_data","params":{"itemId": ' + 15286109 + ' ,"col":["' + reportId + '"],"flags":0}}],"flags":0}';
        var options = {
            uri: clearReportURI,
        };
        let header = await request.get(options);
        const reportHeader = this.hostUrl + 'svc=report/exec_report&params={"reportResourceId": ' + 15286109 + ' , "reportTemplateId": ' + reportId + ',"reportObjectId":' + unitID + ' ,"reportObjectSecId":0,"interval":{"from": ' + startDate + ' ,"to": ' + endDate + ' ,"flags":16777216},"reportObjectIdList":[]}&sid=' + sid;
        options = {
            uri: reportHeader,
        };
        header = await request.get(options);
        header = JSON.parse(header);

        const reportTable: any = this.hostUrl + 'svc=report/select_result_rows&sid=' + sid + '&params={"tableIndex":0,"config":{"type":"range","data":{"from":0,"to":' + header.reportResult.tables[0].rows + ',"level":1}}}'

        options = {
            uri: reportTable,
        };
        //let curentValue = this.messageTable[msgRowIndex].c[this.getMsgIndex(this.neededInfo.msgIndex, 'Time')].v
        let result = JSON.parse(await request.get(options));

        let timeIndex = header.reportResult.tables[0].header.indexOf('Time');
        let cordinatesIndex = header.reportResult.tables[0].header.indexOf('Coordinates');
        let isFirstTime = true
        let orginal = time;
        let global = 0;


        let resultSet: any;
        for (let element of result) {
            let result = element.c[timeIndex].v;
            let x = element.c[cordinatesIndex].x;
            let y = element.c[cordinatesIndex].y;
            if (isFirstTime) {
                isFirstTime = false;
                global = Math.abs(orginal - result);
            } else {
                if (Math.abs(orginal - result) < global) {
                    global = Math.abs(orginal - result);
                    resultSet = {
                        location: y + ',' + x,
                        dateTime: moment.unix(result).format('DD-MMM-YY HH:mm:ss')
                    };
                } else {
                    break;
                }
            }
        }
        console.log(global);
        options = {
            uri: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + resultSet.location + '&key=AIzaSyDDLbSaPQuAQbKS3Ixk7Cb9AR9l5DMfcfY',
        };
        //let curentValue = this.messageTable[msgRowIndex].c[this.getMsgIndex(this.neededInfo.msgIndex, 'Time')].v
        result = JSON.parse(await request.get(options));
        resultSet.location = result.plus_code.compound_code.substr(result.plus_code.compound_code.indexOf(' ') + 1);
        //const getunit: any = this.hostUrl + `svc=core/duplicate&sid=` + res + '&params={\"operateAs\": \"\"  ,\"continueCurrentSession\":' + true + ',\"checkService\":\ "\"  }';
        return resultSet;
    }



    public static async getAllTrakproUnits() {

        try {
            // var text = '1321U1542298869U2863-StJohnAmbulance';
            // var key = CryptoJS.enc.Base64.parse('#base64Key#');
            // var iv = CryptoJS.enc.Base64.parse('#base64IV#');
            // var encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
            // console.log('string'+ encrypted.toString());
            // var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
            // console.log(decrypted.toString(CryptoJS.enc.Utf8));


            let sid = await this.getAllTrakproSid();
            if (sid) {
                let unitDetails = await this.getAllTrakproUnit(sid);
                let resultString = await this.parseUnits(JSON.parse(unitDetails));
                return { 'isSuccess': true, 'responseBody': resultString };
            } else {
                return { 'isSuccess': false, 'responseBody': 'error while getting the data' };
            }
        } catch (err) {
            console.log(err);
        }
    }

    public static async parseUnits(unitDetails: any) {
        try {
            let arr = [];
            unitDetails.items.forEach((unit) => {
                let unitDet = {
                    unitName: unit.nm ? unit.nm : '',
                    postion: {
                        lat: unit.pos ? unit.pos.y : '',
                        lan: unit.pos ? unit.pos.x : '',
                        time: unit.pos ? unit.pos.t : '',
                    }
                };
                arr.push(unitDet);
            });
            return arr;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public static async  getAllTrakproUnit(sid: any) {
        const getunit: any = this.hostUrl + `svc=core/search_items&sid=` + sid + `&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"*","sortType":"","propType":""},"force":1,"flags":4611686018427387903,"from":0,"to":0}`;
        var options = {
            uri: getunit,
        };
        let result = await request.get(options);
        return result;
    }
    public static async getAllTrakproSid() {
        try {
            const jwt = '"' + '5ebd7bbaccee9523e52aee369fae623eD4FB15843AC963225FCD777DEDDE20F2C8BE4740' + '"';
            const siteURL: any = this.hostUrl + "svc=token/login&params={\"token\":" + jwt + "}";
            var options = {
                uri: siteURL,
            };
            let result = await request.post(options);
            return JSON.parse(result).eid;
        } catch (err) {
            return false;
        }
    }

}