import Queue from "bull";
import redisConfig from "../config/redis.js"
import * as jobs from "../jobs/index.js"

export default {
  queues: Object.values(jobs).map(job=> ({
    bull: new Queue(job.key, { redis: redisConfig }),
    name: job.key,
    options: job.options,
    handle: job.handle
  })),
  add(name, data) {
    const queue = this.queues.find(queue=> queue.name === name)
    return queue.bull.add(data, queue.options)
  },
  process() {
    return this.queues.forEach(queue=> {
      queue.bull.process(queue.handle)

      queue.bull.on('failed', job=> {
        console.log(`Job with key ${queue.name} failed `)
        console.log(job.data)
      })
    })
  }
}