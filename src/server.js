import 'dotenv/config'
import express from 'express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter.js'
import { ExpressAdapter } from '@bull-board/express'
import { createUserController } from './controllers/user.controller.js'
import queue from './queue.js'

const appPort = process.env.PORT

const app = express()
const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/ui')

createBullBoard({
  queues: queue.queues.map(queue=> new BullAdapter(queue.bull)),
  serverAdapter,
});

app.use('/ui', serverAdapter.getRouter());

app.post('/user', createUserController)

app.listen(appPort, ()=> {
  console.log('Server listen on http://localhost:' + appPort)
})