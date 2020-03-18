"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
require("reflect-metadata");
/** FACTORY
 *      @params     method that is an HTTP request
 *                  path of string - example '/login'
 *      @returns    decorator function that defines a piece of metadata
 * */
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.get);
exports.put = routeBinder(Methods_1.Methods.put);
exports.post = routeBinder(Methods_1.Methods.post);
exports.del = routeBinder(Methods_1.Methods.del);
exports.patch = routeBinder(Methods_1.Methods.patch);
