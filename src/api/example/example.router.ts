import { Router, Request, Response, NextFunction } from 'express';
import { ExampleController } from './example.controller';
import { Example } from '../../models/Example';
import { validate, validationError } from '../../middlewares/validation';

export class ExampleRouter {

    public router: Router;

    /*--------  Constructor  --------*/

    constructor() {
        // Set router
        this.router = Router();
        this.init();
        this.router.use(validationError);
    }
    /*--------  Methods  --------*/
    /**
     * Init all routes in this router
     */
    init() {
        this.router.get('/', ExampleController.getAll);
        this.router.get('/getUnitDetails', ExampleController.getUnitDetails);
    }
}

export default new ExampleRouter().router;
