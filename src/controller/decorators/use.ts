import { RequestHandler } from 'express'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import 'reflect-metadata'


/** FACTORY
 * 
 */
export function use(middleware: RequestHandler) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || []

        Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key)
    }
}
