import { RequestHandler, } from 'express'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import 'reflect-metadata'


/** RULE
 *      for PropertyDescriptor
 */
interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler
}

/** FACTORY 
 *      @params     method that is an HTTP request
 *                  path of string - example '/login'
 *      @returns    decorator function that defines a piece of metadata 
 * */
function routeBinder(method: string) { 
    return function(path: string) {
        return function(target: any, key: string, desc: RouteHandlerDescriptor) {
            Reflect.defineMetadata(MetadataKeys.path, path, target, key)
            Reflect.defineMetadata(MetadataKeys.method, method, target, key)
        }
    }
}


export const get    = routeBinder(Methods.get)
export const put    = routeBinder(Methods.put)
export const post   = routeBinder(Methods.post)
export const del    = routeBinder(Methods.del)
export const patch  = routeBinder(Methods.patch)
