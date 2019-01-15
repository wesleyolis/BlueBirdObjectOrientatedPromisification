"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
function Promisify(propA, propB) {
    if (propB === void 0) { propB = undefined; }
    if (propB === undefined) {
        if (propA.length == 1) {
            return Bluebird.promisify(propA)();
        }
        else {
            return Bluebird.promisify(propA);
        }
    }
    else if (propA[propB]) {
        if (propA[propB].length == 1) {
            return Bluebird.promisify(propA[propB], { context: propA })();
        }
        else {
            return Bluebird.promisify(propA[propB], { context: propA });
        }
    }
    else {
        throw Error("Error key [" + propB + "] not found on object");
    }
}
exports.Promisify = Promisify;
function PromisifyReturn(propA, propB) {
    if (propB === void 0) { propB = undefined; }
    function generatePromise(func, object) {
        var self = object;
        var orignalArgsWithCallBackLength = func.length;
        return function (execute) {
            var executeResult = undefined;
            var lastArg = arguments.length - 1;
            if (orignalArgsWithCallBackLength == arguments.length && lastArg > -1) {
                executeResult = arguments[lastArg];
                lastArg--;
            }
            var args = [];
            for (var i = 0; i <= lastArg; i++)
                args.push(arguments[i]);
            return new Bluebird(function (resolve, reject) {
                try {
                    var result = undefined;
                    args.push(function (err, result) {
                        if (err)
                            reject(Error(err));
                        else
                            resolve(result);
                    });
                    result = func.call.apply(func, [self].concat(args));
                    if (executeResult)
                        executeResult['executeResult'] = result;
                }
                catch (e) {
                    reject(e);
                }
            });
        };
    }
    if (propB === undefined) {
        return generatePromise(propA, undefined);
    }
    else if (propA[propB]) {
        return generatePromise(propA[propB], propA);
    }
    else
        throw Error("Error key [" + propB + "] not found on object");
}
exports.PromisifyReturn = PromisifyReturn;
