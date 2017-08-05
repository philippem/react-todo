
import {join} from 'path'
import express from 'express'
import session from 'express-session'
import fileStore from 'session-file-store'
import {json} from 'body-parser'
import flash from 'connect-flash'

import errors from './middleware/errors'
import api from './api'
import router from './router.jsx'

process.on('unhandledRejection', r => console.log('unhandledRejection', r))

process.on('uncaughtException', r => console.log('unhandledException', r))

const SessionStore = fileStore(session)

const app = express()

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(join(__dirname, '../client')))
app.use(json())
app.use(session({
  store: new SessionStore({
    path: `${process.env.DATA_PATH}/session`
  }),
  secret: 'magically',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())
app.use('/api', api)
app.use(router)
app.use(errors)

export default app
