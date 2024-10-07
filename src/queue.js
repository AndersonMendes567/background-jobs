import 'dotenv/config'
import queue from './lib/bull.js'

queue.process()

export default queue