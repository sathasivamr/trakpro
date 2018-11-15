"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
// This function returns a middleware which validates that the
// request's JSON body conforms to the passed-in type.
function validate(type) {
    var validator = new class_validator_1.Validator();
    return function (req, res, next) {
        var input = class_transformer_1.plainToClass(type, req.body);
        var errors = validator.validateSync(input);
        if (errors.length > 0) {
            next(errors);
        }
        else {
            req.body = input;
            next();
        }
    };
}
exports.validate = validate;
// This middleware handles the case where our validation
// middleware says the request failed validation. We return
// those errors to the client here.
exports.validationError = function (err, request, response, next) {
    if (err instanceof Array && err[0] instanceof class_validator_1.ValidationError) {
        response.status(400).json({ errors: err }).end();
    }
    else {
        next(err);
    }
};
//# sourceMappingURL=validation.js.map