"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
require("reflect-metadata");
/** VALIDATION MIDDLEWARE
 *      @param keys string[]
 */
function bodyValidators(keys) {
    return function (req, res, next) {
        // body check
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            // key check
            if (!req.body[key]) {
                res.status(422).send("Missing property " + key);
                return;
            }
        }
        next();
    };
}
/** FACTORY
 *      @params     routePrefix - example '/'
 *      @returns    decorate function
 * */
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        // iterate through class to discover keys (methods())
        for (var key in target.prototype) {
            // take key
            var routeHandler = target.prototype[key];
            /* EXTRACT METADATA */
            // extract path data
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            // extract method data (get, post, put ...etc)
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            // extract middleware
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) || [];
            // extract validators
            var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) || [];
            // run validator metadata through bodyValidators middleware
            var validator = bodyValidators(requiredBodyProps);
            // if path . . . associate path with router
            if (path) {
                // assiaciates metadata with given path
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [validator, routeHandler]));
            }
        }
    };
}
exports.controller = controller;
