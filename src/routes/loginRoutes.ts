/** THIS FILE HAS BEEN DEPRECATED 
 *  use /scr/controller/LoginController
 *  and /src/controller/RootController
*/

import { Router, Request, Response, NextFunction } from 'express'


/** INTERFACE SOLUTION
 *      ***The Request type definition file states the req.body annotation is `body: any`.
 *              This is an assumption that makes the type definition somewhat useless. We are
 *              addressing the problem with the following interface.
 */
interface RequestWithBody extends Request {
    // req.body now takes key value pairs. Keys are of type `string` and 
    // values can be `string` or `undefined`
    body: { [key: string]: string | undefined }
}

const router = Router()


export { router }
