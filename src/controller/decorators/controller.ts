import { RequestHandler, Request, Response, NextFunction } from 'express'
import { AppRouter } from '../../AppRouter'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'
import 'reflect-metadata'


/** VALIDATION MIDDLEWARE
 *      @param keys string[]
 */
function bodyValidators(keys: string[]): RequestHandler {
    return function(req: Request, res: Response, next: NextFunction) {
        // body check
        if (!req.body) { 
            res.status(422).send('Invalid request') 
            return
        }

        for (let key of keys) {
            // key check
            if (!req.body[key]) { 
                res.status(422).send(`Missing property ${key}`) 
                return
            }
        }

        next()
    }
}


/** FACTORY
 *      @params     routePrefix - example '/' 
 *      @returns    decorate function      
 * */  
export function controller(routePrefix: string) {
    return function(target: Function) {
        const router = AppRouter.getInstance()

        // iterate through class to discover keys (methods())
        for (let key in target.prototype) {
            // take key
            const routeHandler = target.prototype[key]

            /* EXTRACT METADATA */
            // extract path data
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
            // extract method data (get, post, put ...etc)
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key)
            // extract middleware
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || []
            // extract validators
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []
            // run validator metadata through bodyValidators middleware
            const validator = bodyValidators(requiredBodyProps)

            // if path . . . associate path with router
            if (path) {
                // assiaciates metadata with given path
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
            }
        }
    }
}
