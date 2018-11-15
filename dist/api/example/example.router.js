"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var example_controller_1 = require("./example.controller");
var validation_1 = require("../../middlewares/validation");
var ExampleRouter = (function () {
    /*--------  Constructor  --------*/
    function ExampleRouter() {
        // Set router
        this.router = express_1.Router();
        this.init();
        this.router.use(validation_1.validationError);
    }
    /*--------  Methods  --------*/
    /**
     * Init all routes in this router
     */
    ExampleRouter.prototype.init = function () {
        this.router.get('/', example_controller_1.ExampleController.getAll);
        this.router.get('/getUnitDetails', example_controller_1.ExampleController.getUnitDetails);
    };
    return ExampleRouter;
}());
exports.ExampleRouter = ExampleRouter;
exports.default = new ExampleRouter().router;
//# sourceMappingURL=example.router.js.map