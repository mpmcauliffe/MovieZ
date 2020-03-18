import { Request, Response, } from 'express'
import { controller, get, post, bodyValidator, } from './decorators'


/** DECORATOR 
 *      @params     routePrefix '/' or home
 *      this decorator parses class for other decorators to find paths
 */
@controller('/auth')
class LoginController {


    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send(`
            <div>
                <form method="post">
                    <div>
                        <label>Email</label>
                        <input name="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input name="password" type="password" />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        `)
    }

    // req takes an annotated type of RequestWithBody{I}
    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body
        
        // req.body properties uses type guard
        if (email === 'jimbo@bear.com' && password === '123456') {
            // mark session as logged in
            req.session = { loggedIn: true }
            // redirect
            res.redirect('/protected')
        } else {
            res.send('Invalid credentials.')
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined
        res.redirect('/')
    }
}
