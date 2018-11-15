import { Request, Response, NextFunction } from 'express';

import * as winston from 'winston';
import { ExampleDelegate } from '../../delegate/example.delegate';
import { ApplicationConstants } from '../../constants/ApplicationConstants';
import * as moment from 'moment';
export class ExampleController {

    static exampleDelegate: ExampleDelegate = new ExampleDelegate();

    /**
     * Get all
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    public static async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            console.log(req.query)
            let date = req.query.dateTime.split('T');
            let startDate = moment(date[0]).unix();
            let endDate = moment(date[0]).add(1, 'days').unix();
            let time = moment(req.query.dateTime).unix();
            let sid = req.query.sid;
            let unitName = req.query.unitName;
            console.log(startDate, endDate);
            let result = await ExampleDelegate.getAll(startDate, endDate, time, sid, unitName);
            res.send({ result });
        } catch (err) {
            winston.error('Internal Server Error ::: ExampleController - getAll', err);
            res.send({
                'isSuccess': false,
                'message': 'Error IN Getting the Result',
                'Request Format': ' http://tigerjump.in/example?sid=09571f2c21bfe612dea082b1f59337f7&dateTime=2018-09-12T11:11:11&unitName=tn33ax3129',
                'err': err
            });
        }
    }

    public static async getUnitDetails(req: Request, res: Response, next: NextFunction): Promise<any> {

        try {
            if (req.query.userName === 'StJohnAmbulance') {
                let result = await ExampleDelegate.getAllTrakproUnits();
                res.send({ result });
            } else {
                res.send({
                    'isSuccess': false,
                    'message': 'Error IN  Getting the Result',
                });
            }
        } catch (err) {
            winston.error('Internal Server Error ::: ExampleController - getAll', err);
            res.send({
                'isSuccess': false,
                'message': 'Error IN Getting the Result',
                'Request Format': 'Contact Trakpro team',
                'err': err
            });
        }
    }
    //getAllTrakproUnits

}