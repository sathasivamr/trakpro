"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var example_router_1 = require("../api/example/example.router");
var Routes = (function () {
    /*--------  Constructor  --------*/
    function Routes(app) {
        // Set router
        this.router = express_1.Router();
        // Set app
        this.app = app;
        // Set all routes
        this.setAllRoutes();
    }
    /*--------  Methods  --------*/
    /**
     * Set all app routes
     */
    Routes.prototype.setAllRoutes = function () {
        /*--------  Set all custom routes here  --------*/
        // Your routes goes here
        this.app.use('/trakpro', example_router_1.default);
        /*--------  Main routes  --------*/
        // Set main route for any other route found
        this.setMainRoute();
    };
    /**
     * Set main route
     * this route will be used for all other routes not found before
     */
    Routes.prototype.setMainRoute = function () {
        // All other routes should redirect to the index.html
        this.app.route('/*').get(this.index);
    };
    /**
     * Main route
     */
    Routes.prototype.index = function (req, res, next) {
        res.json({
            message: 'May the express be with you!'
        });
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=routes.js.map