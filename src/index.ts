import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
//import { router } from './routes/loginRoutes'  ***deprecated
import { AppRouter } from './AppRouter'

import './controller/LoginController'
import './controller/RootController'


const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['sdfuSD&$jfa7a7FdaH74haa&qgf6EWDg64qr7gy'] }))
app.use(AppRouter.getInstance())


app.listen(process.env.PORT || 3000, () => console.log('up on http://localhost:3000'))
